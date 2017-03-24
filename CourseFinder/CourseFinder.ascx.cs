using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Telerik.Web.UI;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;
using Telerik.Sitefinity.DynamicModules.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;
using Telerik.OpenAccess;

public partial class Custom_CourseFinder_CourseFinder : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            InitPageDataBind();
        }

        BuildSearchCommand();
    }

    #region data memebers
    private string searchbaseurl = "/CourseSearch";
    public string SearchBaseUrl
    {
        get { return searchbaseurl; }
        set { searchbaseurl = value; }
    }
    #endregion

    #region utilities

    protected Dictionary<string, Guid> BuildTaxonDicts(string taxon_name)
    {
        TaxonomyManager taxonomyManager = TaxonomyManager.GetManager();
        var taxa = taxonomyManager.GetTaxa<FlatTaxon>()
            .Where(t => t.Taxonomy.Name == taxon_name)
            .OrderBy(t => t.Taxonomy.Name)
            .ToDictionary(a => a.Title.ToString(), a => a.Id);

        return taxa;
    }

    protected IQueryable<DynamicContent> GetCourseList()
    {
        var providerName = String.Empty;
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
        Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");

        var myFilteredCollection = dynamicModuleManager.GetDataItems(courseType)
            .Where(c => c.Status == Telerik.Sitefinity.GenericContent.Model.ContentLifecycleStatus.Live);
        return myFilteredCollection;
    }

    #endregion

    #region page events

    protected void InitPageDataBind()
    {
        SetDataSource("subject-areas");
        SetDataSource("qualifications");
        SetDataSource("levels");
        SetDataSource("lengths-of-study");
    }

    protected void SetDataSource(string item)
    {
        switch (item)
        {
            case "subject-areas":
                this.combobox_area.DataSource = BuildTaxonDicts("subject-areas");
                this.combobox_area.DataBind();
                break;

            case "qualifications":
                this.combobox_qualification.DataSource = BuildTaxonDicts("qualifications");
                this.combobox_qualification.DataBind();
                break;

            case "levels":
                this.combobox_level.DataSource = BuildTaxonDicts("levels");
                this.combobox_level.DataBind();
                break;

            case "lengths-of-study":
                this.combobox_length.DataSource = BuildTaxonDicts("lengths-of-study");
                this.combobox_length.DataBind();
                break;
        }
    }

    protected void BuildSearchCommand()
    {

        StringBuilder strbuilder = new StringBuilder(searchbaseurl);
        strbuilder.Append("?");
        if (!combobox_area.SelectedValue.IsNullOrEmpty())
        {
            strbuilder.Append("sa=" + combobox_area.SelectedValue);
        }
        else
        {
            strbuilder.Append("sa=all");
        }

        if (!combobox_qualification.SelectedValue.IsNullOrEmpty())
        {
            strbuilder.Append("&q=" + combobox_qualification.SelectedValue);
        }
        else
        {
            strbuilder.Append("&q=all");
        }

        if (!combobox_level.SelectedValue.IsNullOrEmpty())
        {
            strbuilder.Append("&lev=" + combobox_level.SelectedValue);
        }
        else
        {
            strbuilder.Append("&lev=all");
        }

        if (!combobox_length.SelectedValue.IsNullOrEmpty())
        {
            strbuilder.Append("&len=" + combobox_length.SelectedValue);
        }
        else
        {
            strbuilder.Append("&len=all");
        }

        this.HyperlinkSearchButton.NavigateUrl = strbuilder.ToString();



    }

    #endregion

    #region combobox events

    protected void combobox_area_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        if (e.Value != null)
        {
            // Get guid of selected area
            Guid area_guid = new Guid(e.Value);

            // Resolve course type
            var providerName = String.Empty;
            DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
            Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");

            // fill dropdowns prefilter
            SetDataSource("qualifications");
            SetDataSource("levels");

            // get courses for area
            var filteredCourseList = GetCourseList().Where(t => t.GetValue<TrackedList<Guid>>("subjectareas").Contains(area_guid));

            // get distinct qualifications
            var qualids = filteredCourseList
                .Select(s => s.GetValue<TrackedList<Guid>>("qualifications").FirstOrDefault())
                .Distinct()
                .ToList<Guid>();

            #region update the dropdowns
            // remove items not in list
            foreach (RadComboBoxItem item in this.combobox_qualification.Items)
            {
                if (!qualids.Contains(new Guid(item.Value)))
                {
                    item.Visible = false;
                }
            }

            // get distinct leveks
            var levelids = filteredCourseList
                .Select(s => s.GetValue<TrackedList<Guid>>("levels").FirstOrDefault())
                .Distinct()
                .ToList<Guid>();

            // remove items not in list
            foreach (RadComboBoxItem item in this.combobox_level.Items)
            {
                if (!levelids.Contains(new Guid(item.Value)))
                {
                    item.Visible = false;
                }
            }

            #endregion
            
            this.combobox_qualification.Text = "";
            this.combobox_qualification.ClearSelection();
            this.combobox_level.Text = "";
            this.combobox_level.ClearSelection();
            this.combobox_length.Text = "";
            this.combobox_length.ClearSelection();
            this.combobox_length.Enabled = false;
            BuildSearchCommand();
        }
    }

    protected void combobox_qualification_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        if (e.Value != null && this.combobox_area.SelectedValue != null)
        {
            // selection guids
            Guid area_guid;
            Guid qual_guid = new Guid(e.Value);

            // resolve type
            var providerName = String.Empty;
            DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
            Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");

            // fill dropdowns prefilter
            SetDataSource("levels");

            IQueryable<DynamicContent> filteredCourseList;

            // if area has been previously selected
            if (!this.combobox_area.SelectedValue.IsNullOrEmpty())
            {
                try
                {
                    area_guid = new Guid(this.combobox_area.SelectedValue);
                }
                catch (FormatException fex)
                {
                    return;
                }

                filteredCourseList = GetCourseList()
                    .Where(t => t.GetValue<TrackedList<Guid>>("subjectareas").Contains(area_guid))
                    .Where(b => b.GetValue<TrackedList<Guid>>("qualifications").Contains(qual_guid));
            }
            // if area has not been previously selected
            else
            {
                filteredCourseList = GetCourseList()
                    .Where(b => b.GetValue<TrackedList<Guid>>("qualifications").Contains(qual_guid));
            }

            // get distinct leveks
            var levelids = filteredCourseList
                .Select(s => s.GetValue<TrackedList<Guid>>("levels").FirstOrDefault())
                .Distinct()
                .ToList<Guid>();

            #region update the dropdowns
            // remove items not in list
            foreach (RadComboBoxItem item in this.combobox_level.Items)
            {
                if (!levelids.Contains(new Guid(item.Value)))
                {
                    item.Visible = false;
                }
            }

            #endregion
            
            this.combobox_length.Text = "";
            this.combobox_length.ClearSelection();
            this.combobox_length.Enabled = false;
            this.combobox_level.Text = "";
            this.combobox_level.ClearSelection();
            BuildSearchCommand();
        }

    }

    protected void combobox_level_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        if (e.Value != null && this.combobox_area.SelectedValue != null && this.combobox_qualification.SelectedValue != null)
        {
            // selection guids
            Guid level_guid = new Guid(e.Value);
            Guid area_guid;
            Guid qual_guid;

            var providerName = String.Empty;
            DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
            Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");

            SetDataSource("lengths-of-study");


            IQueryable<DynamicContent> filteredCourseList;


            // if area and qualifications dropdowns have been previously filled
            if (!this.combobox_area.SelectedValue.IsNullOrEmpty() && !this.combobox_qualification.SelectedValue.IsNullOrEmpty())
            {
                try
                {
                    area_guid = new Guid(this.combobox_area.SelectedValue);
                    qual_guid = new Guid(this.combobox_qualification.SelectedValue);
                }
                catch (FormatException fex)
                {
                    return;
                }

                filteredCourseList = GetCourseList()
                    .Where(t => t.GetValue<TrackedList<Guid>>("subjectareas").Contains(area_guid))
                    .Where(b => b.GetValue<TrackedList<Guid>>("qualifications").Contains(qual_guid))
                    .Where(c => c.GetValue<TrackedList<Guid>>("levels").Contains(level_guid));
            }
            // if only qualifications dropdown have been previously filled
            else if (!this.combobox_qualification.SelectedValue.IsNullOrEmpty())
            {
                try
                {
                    qual_guid = new Guid(this.combobox_qualification.SelectedValue);
                }
                catch (FormatException fex)
                {
                    return;
                }

                filteredCourseList = GetCourseList()
                    .Where(b => b.GetValue<TrackedList<Guid>>("qualifications").Contains(qual_guid))
                    .Where(c => c.GetValue<TrackedList<Guid>>("levels").Contains(level_guid));
            }
            // if only area dropdown have been previously filled
            else if (!this.combobox_area.SelectedValue.IsNullOrEmpty())
            {
                try
                {
                    area_guid = new Guid(this.combobox_area.SelectedValue);
                }
                catch (FormatException fex)
                {
                    return;
                }

                filteredCourseList = GetCourseList()
                    .Where(t => t.GetValue<TrackedList<Guid>>("subjectareas").Contains(area_guid))
                    .Where(c => c.GetValue<TrackedList<Guid>>("levels").Contains(level_guid));
            }

            // if no other dropdowns have been previously filled
            else
            {
                filteredCourseList = GetCourseList()
                    .Where(c => c.GetValue<TrackedList<Guid>>("levels").Contains(level_guid));
            }

            // get distinct lengths
            var lengthsids = filteredCourseList
                .Select(s => s.GetValue<TrackedList<Guid>>("lengthsofstudy").FirstOrDefault())
                .Distinct()
                .ToList<Guid>();

            #region update the dropdowns
            if (e.Text.ToLower() == "undergraduate degree" || e.Text.ToLower() == "postgraduate degree")
            {
                // remove items not in list
                foreach (RadComboBoxItem item in this.combobox_length.Items)
                {
                    if (!lengthsids.Contains(new Guid(item.Value)))
                    {
                        item.Visible = false;
                    }
                }


                this.combobox_length.Enabled = true;
                
                this.combobox_length.Text = "";
                this.combobox_length.ClearSelection();
                 

            #endregion
            }

            BuildSearchCommand();
        }


    }
    #endregion



    protected void combobox_length_SelectedIndexChanged(object sender, RadComboBoxSelectedIndexChangedEventArgs e)
    {
        BuildSearchCommand();
    }
}