using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml;
using Telerik.Sitefinity;
using Telerik.Sitefinity.Modules.Pages;
using Telerik.Sitefinity.Pages.Model;
using Telerik.Sitefinity.Services;


public partial class Custom_SiteMapGenerator_SiteMapGenerator : System.Web.UI.UserControl
{
    private string RootSiteURL = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!SystemManager.IsDesignMode || SystemManager.IsPreviewMode)
        {
            // If site root ends with '/', cut it off
            if (this.RootSiteURL.EndsWith("/"))
            {
                this.RootSiteURL = this.RootSiteURL.Substring(0, (this.RootSiteURL.Length - 1));
            }

            // Find all published
            List<PageNode> list = App.WorkWith()
                                     .Pages()
                                     .LocatedIn(Telerik.Sitefinity.Fluent.Pages.PageLocation.Frontend)
                                     .Where(p => p.ApprovalWorkflowState.Value == "Published")
                                     .Get()
                                     .ToList<PageNode>();

            // Generate the XML from the page node list
            string _xml = this.GenerateXML(list);

            // Write the XML back in the response with headers
            this.Page.Response.Clear();
            this.Page.Response.ContentType = "text/xml";
            this.Page.Response.Charset = "utf-8";
            this.Page.Response.AddHeader("Content-Length", _xml.Length.ToString());
            this.Page.Response.Write(_xml);
            this.Page.Response.Flush();
            this.Page.Response.End();
        }
    }

    public string GenerateXML(List<PageNode> list)
    {
        // Memory stream for output file
        MemoryStream mstream = new MemoryStream();

        // UTF8 Encoding for sitemap protocol & indenting
        XmlTextWriter twriter = new XmlTextWriter(mstream, new System.Text.UTF8Encoding(false));
        twriter.Formatting = System.Xml.Formatting.Indented;

        // Begin start file write
        twriter.WriteStartDocument();
        twriter.WriteStartElement("urlset", "http://www.sitemaps.org/schemas/sitemap/0.9");

        foreach (PageNode _pn in list)
        {
            // if url found for node create element
            string pageurl = _pn.GetUrl();

            if (!string.IsNullOrEmpty(pageurl))
            {
                pageurl = pageurl.Replace("~", this.RootSiteURL);
                twriter.WriteStartElement("url");
                twriter.WriteStartElement("loc");
                twriter.WriteValue(pageurl);
                twriter.WriteEndElement();
                twriter.WriteStartElement("lastmod");
                twriter.WriteValue(_pn.LastModified.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss+00:00"));
                twriter.WriteEndElement();
                twriter.WriteEndElement();
            }
        }

        // Write close element
        twriter.WriteEndElement();
        twriter.Flush();

        // Return the encoded string
        return System.Text.Encoding.UTF8.GetString(mstream.ToArray());
    }

    // Public property for setting the website root - Important
    public string WebSiteRootURL
    {
        get
        {
            return this.RootSiteURL;
        }
        set
        {
            this.RootSiteURL = value;
        }
    }
}