<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CourseSearchResults.ascx.cs"
    Inherits="Custom_CourseSearchResults_CourseSearchResults" %>

<script type="text/javascript" src="http://kaplan.co.uk/Javascript/sorttable.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var prm = Sys.WebForms.PageRequestManager.getInstance();
        prm.add_endRequest(OnEndRequest);
    });

    function StyleRows() {
        $("tbody.tmain tr:even").addClass("even");
        $("tbody.tmain tr:odd").addClass("odd");
    }

    function OnEndRequest(sender,args)
    {
        if (document.getElementById("resulttable") != null) {
            sorttable.makeSortable(document.getElementById("resulttable"));
        }
    }

</script>


<div class="courselistfilter">
    <div id="cf_wrapper" class="cf_wrapper">

        <div class="cf_header">
            <h2>
                Refine<br />
                search</h2>
        </div>

        <div class="cf_combobox">
            <asp:ScriptManager ID="sm1" runat="server" ></asp:ScriptManager>
            <asp:UpdateProgress ID="UpdateProgress1" runat="server">
                <ProgressTemplate>
                    <div class="updatepanel" >
                        <asp:Image runat="server" ID="loadingimg" ImageUrl="~/images/default-source/base-template/loading.gif" />
                    </div>
                </ProgressTemplate>
            </asp:UpdateProgress>
            <asp:UpdatePanel ID="updatepanel1" runat="server">
                <ContentTemplate>
                    <ul>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_business" DataTextField="Key" Width="300"
                                DataValueField="Value" EmptyMessage="Select a Kaplan business" 
                                Skin="Office2010Silver" AutoPostBack="true"
                                onselectedindexchanged="combobox_business_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_area" DataTextField="Key" Width="300"
                                DataValueField="Value" EmptyMessage="Select a subject area" 
                                Skin="Office2010Silver"  AutoPostBack="true"
                                onselectedindexchanged="combobox_area_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_course" DataTextField="Key" Width="300"
                                DataValueField="Value" EmptyMessage="Select a course" 
                                Skin="Office2010Silver" AutoPostBack="true"
                                onselectedindexchanged="combobox_course_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_level" DataTextField="Key" Width="260"
                                DataValueField="Value" EmptyMessage="Select level of study" 
                                Skin="Office2010Silver"   AutoPostBack="true"
                                onselectedindexchanged="combobox_level_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_qualification" DataTextField="Key"
                                Width="260" DataValueField="Value" EmptyMessage="Select a qualification" 
                                Skin="Office2010Silver"   AutoPostBack="true"
                                onselectedindexchanged="combobox_qualification_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                        <li>
                            <telerik:RadComboBox runat="server" ID="combobox_length" DataTextField="Key" Width="260"
                                DataValueField="Value" EmptyMessage="Select length of study" 
                                Skin="Office2010Silver"   AutoPostBack="true"
                                onselectedindexchanged="combobox_length_SelectedIndexChanged">
                            </telerik:RadComboBox>
                        </li>
                    </ul>
                </ContentTemplate>
            </asp:UpdatePanel>

        </div>
        <div class="cf_searchrow">
            <div class="cf_searchrow_right">
                <asp:ImageButton ID="UpdateButton" runat="server" class="cf_searchrow_btn_lnk" ImageUrl="~/images/default-source/base-template/button_updateresults.jpg"
                    OnClick="UpdateButton_Click"  />
            </div>
            <asp:UpdatePanel ID="updatepanel2" runat="server">
                <ContentTemplate>
                    <div class="cf_searchrow_right">
                        <asp:ImageButton ID="ResetButton" runat="server" class="cf_searchrow_btn_lnk" ImageUrl="~/images/default-source/base-template/button_resetresults.jpg"
                            OnClick="ResetButton_Click" />
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
    <div class="courselisting">
        <asp:Panel ID="ErrorPanel" runat="server" Visible="false">
            <h2>
                There has been an error with your search...</h2>
            <p>
                (invalid arguements)</p>
        </asp:Panel>
        <asp:Panel ID="EmptyPanel" runat="server" Visible="false">
            <h2>
                Sorry, there has been no results for your search...</h2>
            <p>
                Please reset the filter above to perform another search</p>
        </asp:Panel>
        <asp:UpdatePanel ID="SearchResults" runat="server"> 
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="UpdateButton" EventName="Click" />
        </Triggers>
        <ContentTemplate>
            <asp:Repeater ID="repeater" runat="server" OnItemDataBound="Repeater_ItemDataBound" >
                <HeaderTemplate>
                    <table id="resulttable" class="sortable">
                        <thead>
                            <tr>
                                <th >
                                    Course
                                </th>
                                <th>
                                    Level of study
                                </th>
                                <th>
                                    Specification
                                </th>
                                <th>
                                    Length of study
                                </th>
                                <th>
                                    Kaplan business
                                </th>
                                <th>
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody class="tmain">
                </HeaderTemplate>
                <ItemTemplate>
                        <tr class='<%#(Container.ItemIndex % 2 == 0) ? "odd" : "even" %>'>
                            <td>
                                <asp:Label runat="server" ID="lbl_title" CssClass="courselisting_bold"></asp:Label>
                            </td>
                            <td>
                                <asp:Label runat="server" ID="lbl_level"></asp:Label>
                            </td>
                            <td>
                                <asp:Label runat="server" ID="lbl_specification"></asp:Label>
                            </td>
                            <td>
                                <asp:Label runat="server" ID="lbl_lengthsofstudy"></asp:Label>
                            </td>
                            <td>
                                <asp:Label runat="server" ID="lbl_businessUnit"></asp:Label>
                            </td>
                            <td cssclass="moreinfo">
                                <asp:HyperLink ID="hyperlink_info" Target="_blank" runat="server"><span class="moreinfo_text">More info</span><span class="moreinfo_arrow">></span></asp:HyperLink>
                            </td>                      
                        </tr>
                </ItemTemplate>
                <FooterTemplate>
                    </tbody> </table>
                </FooterTemplate>
            </asp:Repeater>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
</div>
