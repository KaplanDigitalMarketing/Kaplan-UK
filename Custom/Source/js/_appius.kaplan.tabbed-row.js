var appius = appius || {};

appius.tabbedRow = (function($) {
    "use strict";
    var module = {};

    var TRANSITION_SPEED = 400;

    $(function() {
      var inEditMode = $('body').hasClass('.sfPageEditor');
      if (inEditMode) return false;
      $('.tabbed-row [role="tablist"]').each(initTablist);
    });

    function initTablist(index, tablist) {
      var $tablist = $(tablist);
      var $tabs = $tablist.find('[role="tab"]');
      $tabs.each(initTab);
      $tablist.on('click', '[aria-controls]', activateTab);
    }

    function initTab(index, tab) {
      var $tab = $(tab);
      var $tabPanel = $tab.next();
      var isEmpty = $tabPanel.children('.sf_colsIn').children().length == 0;

      if (isEmpty)
        return false;

      var id = getUniqueId();

      $tab
        .attr('aria-controls', '#' + id)
        .find('.tabbed-row__tab-inner')
        .append('<a role="button" class="tabbed-row__button">View more</a>');
      $tabPanel
        .attr('aria-expanded', 'false')
        .attr('id', id);
    }

    function activateTab() {
      var $tab = $(this);
      var $tabpanel = $tab.next();
      var $tablist = $tab.closest('[role="tablist"]');
      var $activeTab = $tablist.find('[role="tab"][aria-selected="true"]');
      var $activeTabpanel = $tablist.find('[role="tabpanel"][aria-expanded="true"]');

      if ($tab.attr('aria-selected') == 'true') {
        $tab.removeAttr('aria-selected');
        $tabpanel
          .attr('aria-expanded', 'false')
          .slideUp(TRANSITION_SPEED);
        return false;
      }

      var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (viewportWidth < 992) {
        $activeTabpanel.hide();
        scrollTo($tab); // To avoid rogue scrolling on mobile
        $activeTabpanel.show();
      }

      $activeTab.removeAttr('aria-selected');
      $tab.attr('aria-selected', 'true');

      $activeTabpanel
        .attr('aria-expanded', 'false')
        .slideUp();
      $tabpanel
        .attr('aria-expanded', 'true')
        .slideDown(TRANSITION_SPEED);

      // Embedded Wufoo form support
      var $embeddedForms = $tabpanel.find('[id^="wufoo-"]');
      if ($embeddedForms.length > 0) {
        $embeddedForms.each(function() {
          var $form = $(this);
          var id = $form.attr('id').replace('wufoo-', '');
          window[id].display();
        });
      }
    }

    function scrollTo($elem) {
      $('html, body').animate({
        scrollTop: $elem.offset().top - 12
      }, TRANSITION_SPEED);
    }

    function getUniqueId() {
      var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      return guid;
    }

    return module;
})(jQuery);
