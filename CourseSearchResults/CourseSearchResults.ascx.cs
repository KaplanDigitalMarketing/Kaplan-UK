using System;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Web.Caching;
using System.Web.UI;
using System.Linq;
using System.Web.UI.WebControls;

using Telerik.OpenAccess;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.Abstractions;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;
using Telerik.Sitefinity.DynamicModules.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;


public partial class Custom_CourseSearchResults_CourseSearchResults : System.Web.UI.UserControl
{
    private string DefaultSeachTerm = "all";  
    private IQueryable<DynamicContent> courseList ;


    protected void Page_Load(object sender, EventArgs e)
    {

        if (courseList == null)
        {   
            courseList = GetAllLiveCourses();
        }
            
        if (!Page.IsPostBack)
        {
            InterpretSearch(courseList);
        }
    }



    protected void UpdateButton_Click(object sender, ImageClickEventArgs e)
    {
        NameValueCollection searchParams = BuildSearchParams();

        IQueryable<DynamicContent> resultset; 

        // if we have course list locally, use it
        if (courseList != null)
        {
            resultset = RetrieveCourseThroughFiltering(searchParams, courseList);
        }
        else
        {
            courseList = GetAllLiveCourses();
            resultset = RetrieveCourseThroughFiltering(searchParams, courseList);
        }
        
        if (resultset != null)
        {
            this.repeater.DataSource = resultset.OrderBy(d => d.GetValue<string>("Title"));
            this.repeater.DataBind();
            BuildSearchFilter(resultset, searchParams);
        }
        else
        {
            this.ErrorPanel.Visible = true;
            this.repeater.Visible = false;
        }



    }

    protected void InterpretSearch(IQueryable<DynamicContent> courseList)
    {
        if (this.Request.QueryString != null)
        {
            NameValueCollection searchParams = new NameValueCollection(this.Request.QueryString);
            searchParams.Add("course", "all");
            searchParams.Add("bus", "all");

            if (searchParams.AllKeys.Contains("sa") && searchParams.AllKeys.Contains("q")
                && searchParams.AllKeys.Contains("lev") && searchParams.AllKeys.Contains("len")
                && searchParams.AllKeys.Contains("course") && searchParams.AllKeys.Contains("bus"))
            {
                IQueryable<DynamicContent> resultSet = RetrieveCourseThroughFiltering(searchParams, courseList);

                if (resultSet != null)
                {
                    this.repeater.DataSource = resultSet.OrderBy(d => d.GetValue<string>("Title"));
                    this.repeater.DataBind();

                    BuildSearchFilter(resultSet);
                }
                else
                {
                    this.EmptyPanel.Visible = true;
                    this.repeater.Visible = false;
                }
            }
            else
            {
                this.ErrorPanel.Visible = true;
                this.repeater.Visible = false;
            }
        }
        else
        {
            this.ErrorPanel.Visible = true;
            this.repeater.Visible = false;
        }
    }

    protected IQueryable<DynamicContent> RetrieveCourseThroughFiltering(NameValueCollection searchParams, IQueryable<DynamicContent> myFilteredCollection)
    {
        // Guid for search parameter lookups
        Guid saGuid, qGuid, levGuid, lenGuid;

        try
        {
            if (searchParams["sa"] != DefaultSeachTerm)
            {
                try
                {
                    saGuid = new Guid(searchParams["sa"].ToString());
                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                    return null;
                }
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<TrackedList<Guid>>("subjectareas").Contains(saGuid));
            }

            if (searchParams["q"] != DefaultSeachTerm)
            {
                try
                {
                    qGuid = new Guid(searchParams["q"].ToString());
                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                    return null;
                }
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<TrackedList<Guid>>("qualifications").Contains(qGuid));
            }

            if (searchParams["lev"] != DefaultSeachTerm)
            {
                try
                {
                    levGuid = new Guid(searchParams["lev"].ToString());
                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                    return null;
                }
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<TrackedList<Guid>>("levels").Contains(levGuid));
            }

            if (searchParams["len"] != DefaultSeachTerm)
            {
                try
                {
                    lenGuid = new Guid(searchParams["len"].ToString());
                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                    return null;
                }
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<TrackedList<Guid>>("lengthsofstudy").Contains(lenGuid));
            }
            if (searchParams["course"] != DefaultSeachTerm && searchParams["course"] != null)
            {
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<string>("Title").Contains(searchParams["course"]));
            }
            if (searchParams["bus"] != DefaultSeachTerm && searchParams["bus"] != null)
            {
                myFilteredCollection = myFilteredCollection.Where(d => d.GetValue<string[]>("BusinessUnit").Contains(searchParams["bus"]));
            }

            return myFilteredCollection;
        }

        catch (Exception ex)
        {
            Log.Write("Custom: Course search - " + ex.Message.ToString());
            return null;
        }
    }

    protected void BuildSearchFilter(IQueryable<DynamicContent> list, NameValueCollection searchParams = null)    {
        if (list != null)
        {
            TaxonomyManager taxonomyManager = TaxonomyManager.GetManager();
            #region Business Unit Dropdown
            this.combobox_business.DataSource = list.Select(s => s.GetValue<string[]>("BusinessUnit").FirstOrDefault())
                    .Select(a => a.ToString())
                    .Distinct()
                    .ToDictionary(a => a.ToString(), a => a.ToString());
            this.combobox_business.DataBind();

            if (this.combobox_business.Items.Count == 1)
            {
                this.combobox_business.Items[0].Selected = true;
            }
            else if (searchParams == null)
            {
                this.combobox_business.Text = "";
                this.combobox_business.ClearSelection();
            }
            #endregion

            #region Subject Areas Dropdown

            this.combobox_area.DataSource = list.Select(s => s.GetValue<TrackedList<Guid>>("subjectareas").FirstOrDefault())
                .Select(i => i.ToString())
                .Distinct()
                .ToDictionary(a => taxonomyManager.GetTaxon(new Guid(a.ToString())).Title, a => new Guid(a.ToString()));
            this.combobox_area.DataBind();
            if (this.combobox_area.Items.Count == 1)
            {
                this.combobox_area.Items[0].Selected = true;
            }
            else if (searchParams != null && searchParams["sa"] != DefaultSeachTerm)
            {
                try
                {
                    Guid saGuid = new Guid(searchParams["sa"].ToString());  // convert to guid to ensure valid
                    this.combobox_area.Items.Where(i => i.Value == saGuid.ToString()).FirstOrDefault().Selected = true;

                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                }
            }
            else if (searchParams == null)
            {
                this.combobox_area.Text = "";
                this.combobox_area.ClearSelection();
            }

            #endregion

            #region Course Dropdown

            this.combobox_course.DataSource = list.Select(s => s.GetValue<string>("Title"))
                    .Distinct()
                    .ToDictionary(a => a.ToString(), a => a.ToString());
            this.combobox_course.DataBind();
            if (this.combobox_course.Items.Count == 1)
            {
                this.combobox_course.Items[0].Selected = true;
            }
            else if (searchParams == null)
            {
                this.combobox_course.Text = "";
                this.combobox_course.ClearSelection();
            }
            #endregion

            #region Levels Dropdown

            this.combobox_level.DataSource = list.Select(s => s.GetValue<TrackedList<Guid>>("levels").FirstOrDefault())
                .Select(i => i.ToString())
                .Distinct()
                .ToDictionary(a => taxonomyManager.GetTaxon(new Guid(a.ToString())).Title, a => new Guid(a.ToString()));
            this.combobox_level.DataBind();
            if (this.combobox_level.Items.Count == 1)
            {
                this.combobox_level.Items[0].Selected = true;
            }
            else if (searchParams != null && searchParams["lev"] != DefaultSeachTerm)
            {
                try
                {
                    Guid levGuid = new Guid(searchParams["lev"].ToString());  // convert to guid to ensure valid
                    this.combobox_level.Items.Where(i => i.Value == levGuid.ToString()).FirstOrDefault().Selected = true;

                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                }
            }
            else if (searchParams == null)
            {
                this.combobox_level.Text = "";
                this.combobox_level.ClearSelection();
            }
            #endregion

            #region Qualifications Dropdown

            this.combobox_qualification.DataSource = list.Select(s => s.GetValue<TrackedList<Guid>>("qualifications").FirstOrDefault())
                .Select(i => i.ToString())
                .Distinct()
                .ToDictionary(a => taxonomyManager.GetTaxon(new Guid(a.ToString())).Title, a => new Guid(a.ToString()));
            this.combobox_qualification.DataBind();
            if (this.combobox_qualification.Items.Count == 1)
            {
                this.combobox_qualification.Items[0].Selected = true;
            }
            else if (searchParams != null && searchParams["q"] != DefaultSeachTerm)
            {
                try
                {
                    Guid qGuid = new Guid(searchParams["q"].ToString());  // convert to guid to ensure valid
                    this.combobox_qualification.Items.Where(i => i.Value == qGuid.ToString()).FirstOrDefault().Selected = true;

                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                }
            }
            else if (searchParams == null)
            {
                this.combobox_qualification.Text = "";
                this.combobox_qualification.ClearSelection();
            }
            #endregion

            #region Length of Study Dropdown8

            this.combobox_length.DataSource = list.Select(s => s.GetValue<TrackedList<Guid>>("lengthsofstudy").FirstOrDefault())
                .Select(i => i.ToString())
                .Distinct()
                .ToDictionary(a => taxonomyManager.GetTaxon(new Guid(a.ToString())).Title, a => new Guid(a.ToString()));
            this.combobox_length.DataBind();
            if (this.combobox_length.Items.Count == 1)
            {
                this.combobox_length.Items[0].Selected = true;
            }
            else if (searchParams != null && searchParams["len"] != DefaultSeachTerm)
            {
                try
                {
                    Guid lenGuid = new Guid(searchParams["len"].ToString());  // convert to guid to ensure valid
                    this.combobox_length.Items.Where(i => i.Value == lenGuid.ToString()).FirstOrDefault().Selected = true;

                }
                catch (FormatException fex)
                {
                    Log.Write("Custom: Course search - " + fex.Message.ToString());
                }
            }
            else if (searchParams == null)
            {
                this.combobox_length.Text = "";
                this.combobox_length.ClearSelection();
            }
            #endregion


        }
    }

    protected NameValueCollection BuildSearchParams()
    {
        NameValueCollection searchParams = new NameValueCollection();

        if (!this.combobox_area.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                Guid saGuid = new Guid(this.combobox_area.SelectedValue);
                searchParams.Add("sa", saGuid.ToString());
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("sa", "all");
        }

        if (!this.combobox_qualification.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                Guid qGuid = new Guid(this.combobox_qualification.SelectedValue);
                searchParams.Add("q", qGuid.ToString());
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("q", "all");
        }

        if (!this.combobox_level.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                Guid levGuid = new Guid(this.combobox_level.SelectedValue);
                searchParams.Add("lev", levGuid.ToString());
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("lev", "all");
        }

        if (!this.combobox_length.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                Guid lenGuid = new Guid(combobox_length.SelectedValue);
                searchParams.Add("len", lenGuid.ToString());
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("len", "all");
        }

        if (!this.combobox_business.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                searchParams.Add("bus", this.combobox_business.SelectedValue);
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("bus", "all");
        }

        if (!this.combobox_course.SelectedValue.IsNullOrEmpty())
        {
            try
            {
                searchParams.Add("course", this.combobox_course.SelectedValue);
            }
            catch (FormatException fex)
            {
                Log.Write("Custom: Course search - " + fex.Message.ToString());
            }
        }
        else
        {
            searchParams.Add("course", "all");
        }


        return searchParams;
    }


    #region Utility Methods

    protected Dictionary<string, Guid> BuildTaxonDicts(string taxon_name)
    {
        TaxonomyManager taxonomyManager = TaxonomyManager.GetManager();
        var taxa = taxonomyManager.GetTaxa<FlatTaxon>()
            .Where(t => t.Taxonomy.Name == taxon_name)
            .OrderBy(o => o.Ordinal)
            .ToDictionary(a => a.Title.ToString(), a => a.Id);
        return taxa;
    }

    protected IQueryable<DynamicContent> GetAllLiveCourses()
    {
        var providerName = String.Empty;
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
        Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");
        return dynamicModuleManager.GetDataItems(courseType).Where(c => c.Status == Telerik.Sitefinity.GenericContent.Model.ContentLifecycleStatus.Live);
    }

    #endregion

    #region Databind Events
    protected void Repeater_ItemDataBound(Object Sender, RepeaterItemEventArgs e)
    {
        // This event is raised for the header, the footer, separators, and items.
        DynamicContent courseitem = e.Item.DataItem as DynamicContent;
        TaxonomyManager taxonomyManager = TaxonomyManager.GetManager();
        // Execute the following logic for Items and Alternating Items.
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            var busunits = courseitem.GetValue<string[]>("BusinessUnit");
            var specifications = courseitem.GetValue<string[]>("Specification");
            var levels = courseitem.GetValue<TrackedList<Guid>>("levels");
            var lengths = courseitem.GetValue<TrackedList<Guid>>("lengthsofstudy");

            var level = taxonomyManager.GetTaxon(levels[0]).Title;
            var length = taxonomyManager.GetTaxon(lengths[0]).Title;

            ((Label)e.Item.FindControl("lbl_title")).Text = courseitem.GetValue<string>("Title");
            ((Label)e.Item.FindControl("lbl_level")).Text = level.ToString();
            ((Label)e.Item.FindControl("lbl_businessUnit")).Text = busunits[0].ToString();
            ((Label)e.Item.FindControl("lbl_specification")).Text = specifications[0].ToString();
            ((Label)e.Item.FindControl("lbl_lengthsofstudy")).Text = length.ToString();
            ((HyperLink)e.Item.FindControl("hyperlink_info")).NavigateUrl = courseitem.GetValue<string>("SpecificUrl").Trim();
        }
    }
    #endregion

    #region Action Events

    protected void combobox_business_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);
    }

    protected void combobox_area_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);
    }

    protected void combobox_qualification_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);

    }

    protected void combobox_length_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);
    }

    protected void combobox_course_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);
    }

    protected void combobox_level_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        NameValueCollection searchValues = new NameValueCollection();
        IQueryable<DynamicContent> filteredList;
        searchValues = BuildSearchParams();
        filteredList = RetrieveCourseThroughFiltering(searchValues, courseList);
        BuildSearchFilter(filteredList, searchValues);
    }

    protected void ResetButton_Click(object sender, EventArgs e)
    {
        if (courseList != null)
        {
            BuildSearchFilter(courseList);
        }
        else
        {
            courseList = GetAllLiveCourses();
            BuildSearchFilter(courseList);
        }
    }

    #endregion
}