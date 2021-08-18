/*!

  Radancy Pattern Library: TabCordion

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  // forEach Polyfill for IE11.

  if (window.NodeList && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = Array.prototype.forEach;

  }

  // Display which TabCordion is in use via console:

  console.log('%c TabCordion v1.3 (Beta) in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, and Strings.

  var tabCordionClass = ".tab-accordion";
  var tabCordionActiveClass = ".active";
  var tabCordionButtonClass = ".tab-accordion__button";
  var tabCordionPanelClass = ".tab-accordion__panel";
  var tabCordionDynamicClass = ".tab-accordion__dynamic";
  var tabCordionActiveState = tabCordionActiveClass.replace(".", "");
  var tabCordionDynamicState = tabCordionDynamicClass.replace(".", "");
  var tabCordionExpandedState = "expanded";
  var tabCordionReturnState = "tab-accordion__return";
  var tabCordionDataActive = "data-tab-active";
  var tabCordionDataActiveChanged = "data-tab-active-changed";
  var tabCordionDataBreakpoint = "data-tab-breakpoint";
  var tabCoprdionDataDisableURL = "data-tab-disable-url";
  var tabCordionDataVertical = "data-tab-vertical";
  var tabCordionReturnText = "Return to Navigation";

  // Grab the hash (fragment) from the URL.

  var URLFragment = window.location.hash.substr(1);

  // Get all TabCordions on the page...

  var tabCordions = document.querySelectorAll(tabCordionClass);

  // Create an array to store each TabCordions breakpoint in,
  // which we will loop through later...

  var tabListBreakPoints = [];

  // loop through each TabCordion...

  tabCordions.forEach(function(tabCordion){

    // Get each TabCordion breakpoint...

    var tabBreakPoint = tabCordion.getAttribute(tabCordionDataBreakpoint);

    // Store each breakpoint in array (above) for later use by matchMedia.

    tabListBreakPoints.push(window.matchMedia(tabBreakPoint));

  });

  // TabAccordion Toggle

  function toggleTabCordion(thisButton, thisButtonIndex) {

    // Normally, we would use ARIA as a CSS hook, but since we are
    // dealing with adding and removeing aria-expanded and aria-selected,
    // it is easier to include/target a class.

    var activeState = thisButton.parentNode.parentNode.querySelectorAll(tabCordionActiveClass);

    if (!thisButton.classList.contains(tabCordionActiveState)) {

      activeState.forEach(function(activeButton){

        activeButton.classList.remove(tabCordionActiveState);
        activeButton.nextElementSibling.classList.remove(tabCordionExpandedState);

        if (activeButton.hasAttribute("aria-expanded")) {

          activeButton.setAttribute("aria-expanded", "false");

        }

        if (activeButton.hasAttribute("aria-selected")) {

          activeButton.setAttribute("aria-selected", "false");

        }

      });

      if (thisButton.hasAttribute("aria-expanded")) {

        thisButton.setAttribute("aria-expanded", "true");

      }

      if (thisButton.hasAttribute("aria-selected")) {

        thisButton.setAttribute("aria-selected", "true");

      }

      thisButton.classList.add(tabCordionActiveState);
      thisButton.nextElementSibling.classList.add(tabCordionExpandedState);

      // TODO: Have mobile panels be closed by default or when toggled on.
      // As it is now, panels will behave the same across smaller
      // and larger viewports.

    }

    var tabVertical = thisButton.parentNode.parentNode.getAttribute(tabCordionDataVertical);
    var tabListActive = thisButton.parentNode.parentNode.getAttribute(tabCordionDataActive);

    // Callback

    if (thisButton.classList.contains(tabCordionActiveState)) {

      var tabPanelCallback = thisButton.parentNode.parentNode.getAttribute("data-tab-callback");

      if(tabPanelCallback !== null) {

        tabTargetDynamic = thisButton.getAttribute("id").replace("tab-button-", "");

        customCallback(tabTargetDynamic, tabPanelCallback);

      }

    }

    if(tabVertical !== null) {

      var thisButtonID = thisButton.getAttribute("id");
      var thisPanelID = thisButtonID.replace("tab-button-", "tab-panel-");
      var tabSelected = document.getElementById(thisPanelID);
      var tabTarget = tabSelected.parentNode.parentNode.querySelector(tabCordionDynamicClass);

      tabTarget.setAttribute("aria-labelledby", thisButtonID);
      // tabTarget.classList.remove(tabCordionExpandedState);
      tabTarget.innerHTML = tabSelected.innerHTML;
      tabTarget.setAttribute("tabindex", -1);

      // Fix: NVDA is reading previous content, delaying focus slightly appears to help.

      setTimeout(function(){

        tabTarget.focus({ preventScroll: true });

        // Fix: Add class here on delay so we can animate content if needed.

        // tabTarget.classList.add(tabCordionExpandedState);

      }, 100);

      // Return to Navigation
      // TODO: Break this out into own function.

      var tabReturntoNav = document.createElement("a");
      tabReturntoNav.setAttribute("href", "#" + thisButtonID);
      tabReturntoNav.classList.add(tabCordionReturnState);
      tabReturntoNav.innerHTML = tabCordionReturnText;
      tabReturntoNav.addEventListener("click", function () {

        returnToTabNavigation(this, event);

      });

      tabTarget.appendChild(tabReturntoNav);

    }

    // Append fragment to URL if data-tab-disable-url not present.
    // TODO: Investagte possible performance issue with History API.

    var tabDisableURL = thisButton.parentNode.parentNode.getAttribute(tabCoprdionDataDisableURL);
    var selectedPanelID = thisButton.nextElementSibling.getAttribute("id");
    var targetPanel = document.getElementById(selectedPanelID)

    targetPanel.scrollIntoView({

      block: "nearest"

    });

    if(tabDisableURL === null) {

      history.replaceState(null, null, "#" + selectedPanelID);

    }

    // Change data-tab-active. This allows us to retain the selection on viewport resize.

    if(tabListActive !== null) {

      thisButton.parentNode.parentNode.setAttribute(tabCordionDataActive, thisButtonIndex);
      thisButton.parentNode.parentNode.setAttribute(tabCordionDataActiveChanged, "");

    }

  }

  function returnToTabNavigation(thisButton, e) {

    var tabTargetButtonId = thisButton.getAttribute("href").replace("#", "");
    var tabTargetButton = document.getElementById(tabTargetButtonId);
    tabTargetButton.focus();

    e.preventDefault();

  }

  function viewPortChange() {

    // Loop through each TabCordion

     tabCordions.forEach(function(tabCordion, i){

        var tabListButton = tabCordion.querySelectorAll(tabCordionButtonClass);
        var tabListButton = tabCordion.querySelectorAll(tabCordionButtonClass);
        var tabListPanel = tabCordion.querySelectorAll(tabCordionPanelClass);
        var tabVertical = tabCordion.getAttribute(tabCordionDataVertical);
        var tabListActive = tabCordion.getAttribute(tabCordionDataActive);
        var tabListCount = i + 1;

        // Give each TabCordion a unique ID...

        tabCordion.setAttribute("id", "tab-accordion-" + tabListCount);

        // If TabCordion missing data-tab-active, add one with a value of 1
        // This is the default state. One panel must always be open.

        if(tabListActive === null) {

          tabCordion.setAttribute(tabCordionDataActive, "1");

        }

        // Check if URL has fragment with "tab-panel" in it.

        if(URLFragment.indexOf("tab-panel") > -1) {

          var tabFragment = URLFragment.split(/-/g).slice(2);
          var tabCordionSelected = parseInt(tabFragment[0]);
          var tabCordionPanelSelected = tabFragment[1];

          // If TabCordion index matches the selcted TabCordion,
          // then load selected content.

          if (tabListCount === tabCordionSelected) {

            var tabCordionTarget = document.getElementById("tab-accordion-" + tabCordionSelected.toString());

            // Selected tabcordion to target.

            if(!tabCordion.hasAttribute(tabCordionDataActiveChanged)) {

              tabCordionTarget.setAttribute(tabCordionDataActive, tabCordionPanelSelected);

            }

          }

        }

        // Now get selected active state for all other tabcordions and
        // when no page fragment is detected.

        var tabPanelSelected = tabCordion.getAttribute(tabCordionDataActive);

        tabListPanel.forEach(function(panel, j){

          var tabListItemCount = j + 1;

          panel.setAttribute("id", "tab-panel-" + tabListCount + "-" + tabListItemCount);
          panel.setAttribute("data-tab-panel-id", tabListCount + "-" + tabListItemCount);

        });

        // Attach events and attributes to all tab buttons and panels.

        tabListButton.forEach(function(button, j){

          var tabListItemCount = j + 1;

          if(Number(tabListItemCount) === Number(tabPanelSelected)) {

            button.classList.add(tabCordionActiveState);
            button.nextElementSibling.classList.add(tabCordionExpandedState);

          }

          button.setAttribute("id", "tab-button-" + tabListCount + "-" + tabListItemCount);
          button.addEventListener("click", function () {

            var index = j + 1;

            toggleTabCordion(this, index);

          });


        });

        // Add dynamic panel for vertical layouts.

        if(tabVertical !== null) {

          // Create Dynamic Tab Panel.

          var tabDynamicPanel = document.createElement("div");

          // Set Attributes.

          tabDynamicPanel.classList.add(tabCordionDynamicState);
          tabDynamicPanel.setAttribute("role", "tabpanel");

          // Only load dynamic panel once on load and on resize.

          var tabNewPanel = tabCordion.querySelector(tabCordionDynamicClass);

            if (!tabNewPanel) {

              tabCordion.appendChild(tabDynamicPanel);

            }

        }

        // Begin looping though breakpoints and altering DOM as each of
        // those viewports are resized/loaded.

        if (tabListBreakPoints[i].matches) {

          // Our Tab UI.

          tabCordion.setAttribute("role", "tablist");

          // Our Tab UI buttons.

          tabListButton.forEach(function(button, j){

            var tabListItemCount = j + 1;

            button.setAttribute("aria-selected", "false");
            button.setAttribute("role", "tab");
            button.setAttribute("aria-controls", "tab-panel-" + tabListCount + "-" + tabListItemCount);
            button.removeAttribute("aria-expanded");

            if(Number(tabListItemCount) === Number(tabPanelSelected)) {

              button.setAttribute("aria-selected", "true");

            }

            //TODO: Add key direction support.

          });

          // Our Tab UI panels.

          tabListPanel.forEach(function(panel, j){

            var tabListItemCount = j + 1;

            panel.setAttribute("aria-labelledby", "tab-button-" + tabListCount + "-" + tabListItemCount);
            panel.setAttribute("role", "tabpanel");

            // Our dynamic Tab UI panels, when TabCordion
            // is in "vertical" mode.

            if(tabVertical !== null) {

              if(Number(tabListItemCount) === Number(tabPanelSelected)) {

                var thisPanelID = panel.getAttribute("id");
                var tabSelected = document.getElementById(thisPanelID);
                var thisButtonID = tabSelected.previousElementSibling.getAttribute("id");
                var tabTarget = tabSelected.parentNode.parentNode.querySelector(tabCordionDynamicClass);
                var tabItemCount = tabTarget.previousElementSibling.childElementCount / 2 + 1;

                tabTarget.setAttribute("data-tab-panel-id", tabListCount + "-" + tabItemCount);
                tabTarget.setAttribute("aria-labelledby", thisButtonID);
                tabTarget.innerHTML = tabSelected.innerHTML;
                //tabTarget.classList.add(tabCordionExpandedState);

                // Fix: Page cannot jump to fragment created on the fly,
                // so we need jump to it programtically, via scrollIntoView.
                // See https://caniuse.com/?search=scrollIntoView

                if(URLFragment.indexOf("tab-panel") > -1) {

                  tabToScroll = document.getElementById(thisPanelID);
                  tabToScroll.scrollIntoView();

                }

                // Return to Navigation.

                var tabReturntoNav = document.createElement("a");
                tabReturntoNav.setAttribute("href", "#" + thisButtonID);
                tabReturntoNav.classList.add(tabCordionReturnState);
                tabReturntoNav.innerHTML = tabCordionReturnText;

                tabReturntoNav.addEventListener("click", function () {

                 returnToTabNavigation(this, event);

                });

                tabTarget.appendChild(tabReturntoNav);

              }

            }

          });

        } else {

          // Our Accordion UI.

          tabCordion.removeAttribute("role");

          // Our Accordion UI buttons.

          tabListButton.forEach(function(button, j){

            var tabListItemCount = j + 1;

            button.setAttribute("id", "tab-button-" + tabListCount + "-" + tabListItemCount);
            button.setAttribute("aria-expanded", "false");
            button.removeAttribute("aria-controls");
            button.removeAttribute("aria-selected");
            button.removeAttribute("role");

            if(Number(tabListItemCount) === Number(tabPanelSelected)) {

              button.setAttribute("aria-expanded", "true");

            }

          });

          // Our Accordion UI panels.

          tabListPanel.forEach(function(panel){

            panel.removeAttribute("aria-labelledby");
            panel.removeAttribute("role");

          });

        }

     });

  }

  // Initiate viewPortWidth function when viewport is resized.

  tabListBreakPoints.forEach(function(breakpoints){

    breakpoints.addListener(viewPortChange);

  });

  // Initiate tabCordions on page load.

  viewPortChange();

})();

// Callback

var tabCordionCallBack = document.querySelectorAll(".tab-accordion[data-tab-callback]");

tabCordionCallBack.forEach(function(accordion){

  var tabCallBack = accordion.getAttribute("data-tab-callback");
  var tabCordionCallBackPanel = accordion.querySelectorAll(".expanded");

  tabCordionCallBackPanel.forEach(function(child){

    tabTargetDynamic = child.getAttribute("data-tab-panel-id");

    customCallback(tabTargetDynamic, tabCallBack);

  });

});

// Custom callback with variable name. Acceps ID of panel you wish to target.

function customCallback(panelTarget, customCallbackName) {

  if (customCallbackName !== null) {

    window[customCallbackName](panelTarget);

  }

}

/* $(".slider-example").slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
}); */

// *** Your custom callback. Do whatever your heart desires here. ***

function runMe(id) {

alert("moofmilker");

}
