<%@ Control Language="C#" AutoEventWireup="true" CodeFile="AreaDropdown.ascx.cs" Inherits="Custom_AreaDropdown_AreaDropdown" %>


<div id="AreaDD"  >
    <telerik:RadComboBox runat="server" ID="area_dd" 
        EnableScreenBoundaryDetection="false" Width="192"
        DataValueField="Value" EmptyMessage="Jump to new subject" 
        AutoPostBack="true"  ExpandDirection="Down" Skin="Metro" 
        onselectedindexchanged="area_dd_SelectedIndexChanged">
    </telerik:RadComboBox>
</div>

