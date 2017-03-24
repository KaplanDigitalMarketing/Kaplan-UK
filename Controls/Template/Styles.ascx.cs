using System;
using System.Web.UI.WebControls;

public partial class TemplateStyles : System.Web.UI.UserControl
{
    public string MainStylesheetPath { get; set; }

    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        if (this.Page != null)
        {
            this.Page.PreRenderComplete += Page_PreRenderComplete;
        }
    }

    void Page_PreRenderComplete(object sender, EventArgs e)
    {
        Literal litStyles = new Literal();
        litStyles.Text = string.Format("<link href=\"{0}\" rel=\"Stylesheet\" />", !string.IsNullOrEmpty(MainStylesheetPath) ? MainStylesheetPath : "/Custom/Build/css/styles.min.css");
        
        if (this.Page.Header != null)
        {
            this.Page.Header.Controls.Add(litStyles);
        }
    }
}