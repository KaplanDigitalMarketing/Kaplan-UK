using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Lists.Model;
using Telerik.Sitefinity.Modules.Lists;
using Telerik.Sitefinity.Workflow;

public partial class Custom_AreaDropdown_AreaDropdown : System.Web.UI.UserControl
{
    private string SAListTitle = "Areas and Landing Pages";

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            GetDatasource();
        }
    }

    protected void GetDatasource()
    {
        if(!SAListTitle.IsNullOrEmpty())
        {
            ListsManager lm = ListsManager.GetManager();
            List list = lm.GetLists().Where(l => l.Title == SAListTitle).FirstOrDefault();


            area_dd.DataSource = list.ListItems.Where(l => l.Status == ContentLifecycleStatus.Live);
            area_dd.DataValueField = "Content";
            area_dd.DataTextField = "Title";
            area_dd.DataBind();
               
        }
    }
    protected void area_dd_SelectedIndexChanged(object sender, Telerik.Web.UI.RadComboBoxSelectedIndexChangedEventArgs e)
    {
        if (e.Value != null)
        {
            Response.Redirect(e.Value.ToString());

        }
    }
}