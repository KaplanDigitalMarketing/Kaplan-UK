<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CourseListing.ascx.cs" Inherits="Custom_CourseListing_CourseListing" %>

<script type="text/javascript" src="/Javascript/sorttable.js"></script>

<div class="courselisting">
    <asp:Repeater ID="repeater" runat="server" OnItemDataBound="Repeater_ItemDataBound">
        <HeaderTemplate>
            <table class="sortable table">
                <thead>
                    <tr>
                        <th id="tfirst">Course</th>
                        <th>Level of study</th>
                        <th>Specification</th>
                        <th>Length of study</th>
                        <th>Kaplan business</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="tmain">
        </HeaderTemplate>
        <ItemTemplate>
            <tr class="even">
                <td>
                    <asp:HyperLink ID="hyperlink_detail" Target="_blank" runat="server"><asp:Label runat="server" ID="lbl_title"  CssClass="courselisting_bold"></asp:Label></asp:HyperLink>
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
                <td class="moreinfo">
                    <asp:HyperLink ID="hyperlink_info" Target="_blank" runat="server" CssClass="cta-btn more-info">More info <span class="glyphicon glyphicon-chevron-right"></span></asp:HyperLink>
                </td>
            </tr>
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr class="odd">
                <td>
                    <asp:HyperLink ID="hyperlink_detail" Target="_blank" runat="server"><asp:Label runat="server" ID="lbl_title"  CssClass="courselisting_bold"></asp:Label></asp:HyperLink>
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
                <td class="moreinfo">
                    <asp:HyperLink ID="hyperlink_info" Target="_blank" runat="server" CssClass="cta-btn more-info">More info <span class="glyphicon glyphicon-chevron-right"></span></asp:HyperLink>
                </td>
            </tr>
        </AlternatingItemTemplate>
        <FooterTemplate>
            </tbody> </table>
        </FooterTemplate>
    </asp:Repeater>
</div>
