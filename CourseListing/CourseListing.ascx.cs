using System;
using System.Linq;
using System.Web.UI.WebControls;

using Telerik.OpenAccess;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.DynamicModules.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class Custom_CourseListing_CourseListing : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        repeater.DataSource = RetrieveCourseThroughFiltering();
        repeater.DataBind();
    }

    public IQueryable<DynamicContent> RetrieveCourseThroughFiltering()
    {
        var providerName = String.Empty;
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager(providerName);
        Type courseType = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.Courses.Course");

        TaxonomyManager taxonomyManager = TaxonomyManager.GetManager();
        var subjectarea_tax = taxonomyManager.GetTaxa<FlatTaxon>()
            .Where(t => t.Taxonomy.Name == "subject-areas")
            .Where(a => a.Title == subject_area)
            .FirstOrDefault();

        if (subjectarea_tax != null)
        {
            var myFilteredCollection = dynamicModuleManager.GetDataItems(courseType)
                .Where(c => c.Status == Telerik.Sitefinity.GenericContent.Model.ContentLifecycleStatus.Live)
                .Where(d => d.GetValue<TrackedList<Guid>>("subjectareas").Contains(subjectarea_tax.Id))
                .OrderBy(d => d.GetValue<string>("Title"));
            
            return myFilteredCollection;
        }
        else
        {
            return null;
        }
        
    }

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
            ((HyperLink)e.Item.FindControl("hyperlink_detail")).NavigateUrl = courseitem.GetValue<string>("SpecificUrl").Trim();
        }
    }

    private string subject_area = "Accounting and finance";
    public string SubjectArea
    {
        get { return subject_area; }
        set { subject_area = value; }
    }
}