<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CourseFinder.ascx.cs"
    Inherits="Custom_CourseFinder_CourseFinder" %>
<div id="cf_wrapper" class="cf_wrapper">
<asp:ScriptManager ID="sm1" runat="server" ></asp:ScriptManager>
    <asp:UpdateProgress ID="UpdateProgress1" runat="server">
        <ProgressTemplate>
            <div class="updatepanel" >
                <asp:Image runat="server" ID="loadingimg" ImageUrl="~/images/default-source/base-template/loading.gif" />
            </div>
        </ProgressTemplate>
    </asp:UpdateProgress>

    <div class="cf_header">
        <h2>
            Course Finder</h2>
    </div>
    <div class="cf_instruct">
        <p>
            Select your course preference from the menu options below:</p>
    </div>
    
    <asp:UpdatePanel ID="updatepanel1" runat="server">
        <ContentTemplate>
            <div class="cf_combobox">
                <ul>
                    <li>
                        <telerik:RadComboBox runat="server" ID="combobox_area" DataTextField="Key" Width="270"
                            EnableScreenBoundaryDetection="false" DataValueField="Value" EmptyMessage="Select subject area"
                            AutoPostBack="true" ExpandDirection="Down" OnSelectedIndexChanged="combobox_area_SelectedIndexChanged"
                            Skin="Office2010Silver">
                        </telerik:RadComboBox>
                    </li>
                    <li>
                        <telerik:RadComboBox runat="server" ID="combobox_qualification" DataTextField="Key"
                            ExpandDirection="Down" EnableScreenBoundaryDetection="false" Width="270" DataValueField="Value"
                            EmptyMessage="Select qualification" AutoPostBack="true" Skin="Office2010Silver"
                            OnSelectedIndexChanged="combobox_qualification_SelectedIndexChanged">
                        </telerik:RadComboBox>
                    </li>
                    <li>
                        <telerik:RadComboBox runat="server" ID="combobox_level" DataTextField="Key" Width="270"
                            DataValueField="Value" EmptyMessage="Select level of study" AutoPostBack="true"
                            ExpandDirection="Down" EnableScreenBoundaryDetection="false" Skin="Office2010Silver"
                            OnSelectedIndexChanged="combobox_level_SelectedIndexChanged">
                        </telerik:RadComboBox>
                    </li>
                    <li>
                        <telerik:RadComboBox runat="server" ID="combobox_length" DataTextField="Key" Enabled="false"
                            ExpandDirection="Down" EnableScreenBoundaryDetection="false" Width="270" DataValueField="Value"
                            EmptyMessage="Select length of study" Skin="Office2010Silver" 
                            onselectedindexchanged="combobox_length_SelectedIndexChanged">
                        </telerik:RadComboBox>
                    </li>
                </ul>
            </div>
                <div class="cf_searchrow">
        <div class="cf_searchrow_right">
            <asp:HyperLink ID="HyperlinkSearchButton" runat="server" CssClass="cf_searchrow_btn_lnk" >
                <asp:Image ID="server" runat="server" ImageUrl="~/images/default-source/base-template/button_widget_serach.png" />
            </asp:HyperLink>
        </div>
    </div>
        </ContentTemplate>
    </asp:UpdatePanel>

</div>
