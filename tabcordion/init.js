/*!

  Radancy Pattern Library: TabCordion

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  // Display which TabCordion is in use via console:

  console.log('%c TabCordion v1.6 in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, and Strings.

  var tabCordionClass = ".tab-accordion";
  var tabCordionActiveClass = ".active";
  var tabCordionButtonClass = ".tab-accordion__button";
  var tabCordionPanelClass = ".tab-accordion__panel";
  var tabCordionActiveState = tabCordionActiveClass.replace(".", "");
  var tabCordionExpandedState = "expanded";
  var tabCordionDataActive = "data-tab-active";
  var tabCordionDataActiveChanged = "data-tab-active-changed";
  var tabCordionDataBreakpoint = "data-tab-breakpoint";
  var tabCoprdionDataDisableURL = "data-tab-disable-url";
  var tabCordionDataVertical = "data-tab-vertical";

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

  function toggleTabCordion(thisButton, oldTab, thisButtonIndex) {

    // Normally, we would use ARIA as a CSS hook, but since we are
    // dealing with adding and removeing aria-expanded and aria-selected,
    // it is easier to include/target a class.

    var activeState = thisButton.parentNode.parentNode.querySelectorAll(tabCordionActiveClass);

    if (!thisButton.classList.contains(tabCordionActiveState)) {

      activeState.forEach(function(activeButton){

        activeButton.classList.remove(tabCordionActiveState);
        activeButton.nextElementSibling.classList.remove(tabCordionExpandedState);
        activeButton.nextElementSibling.removeAttribute("tabindex");

        if (activeButton.hasAttribute("aria-expanded")) {

          activeButton.setAttribute("aria-expanded", "false");

        }

        if (thisButton.hasAttribute("aria-expanded")) {

          thisButton.setAttribute("aria-expanded", "true");

        }

        if (activeButton.hasAttribute("aria-selected")) {

          thisButton.focus(); // For arrow keys

          // Make the active tab focusable by the user (Tab key).

          thisButton.removeAttribute('tabindex');

          // Set the selected state

          activeButton.setAttribute("aria-selected", "false");
          activeButton.setAttribute("tabindex", "-1");
          activeButton.classList.remove(tabCordionActiveState);
          activeButton.nextElementSibling.classList.remove(tabCordionExpandedState);
          activeButton.nextElementSibling.removeAttribute("tabindex");
          thisButton.setAttribute("aria-selected", "true");
          thisButton.nextElementSibling.setAttribute("tabindex", -1);

        }

      });

      thisButton.classList.add(tabCordionActiveState);
      thisButton.nextElementSibling.classList.add(tabCordionExpandedState);

      // TODO: Have mobile panels be closed by default or when toggled on.
      // As it is now, panels will behave the same across smaller
      // and larger viewports.

    }

    var tabListActive = thisButton.parentNode.parentNode.getAttribute(tabCordionDataActive);

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

  function viewPortChange() {

    // Loop through each TabCordion

     tabCordions.forEach(function(tabCordion, i){

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

        });

        // Attach events and attributes to all tab buttons and panels.

        tabListButton.forEach(function(button, j){

          var tabListItemCount = j + 1;

          if(Number(tabListItemCount) === Number(tabPanelSelected)) {

            button.classList.add(tabCordionActiveState);
            button.nextElementSibling.classList.add(tabCordionExpandedState);
            button.nextElementSibling.setAttribute("tabindex", -1);

          }

          button.setAttribute("id", "tab-button-" + tabListCount + "-" + tabListItemCount);
          button.setAttribute("aria-controls", "tab-panel-" + tabListCount + "-" + tabListItemCount);
          button.setAttribute("data-button-count", tabListItemCount);
          button.addEventListener("click", function (e) {

            var index = j + 1;

            toggleTabCordion(this, e.currentTarget, index);

          });

          button.addEventListener("keydown", function (e) {

            if (this.hasAttribute("aria-selected")) {

              var index = Array.prototype.indexOf.call(tabListButton, e.currentTarget);

              // Work out which key the user is pressing and calculate the new tab's index where appropriate

              // Left:	37, Up: 38, Right: 39, Down: 40

              if(tabVertical !== null) {

                // Move up, down, and right.

                var dir = e.which === 38 ? index - 1 : e.which === 40 ? index + 1 : e.which === 39 ? "right" : null;

                if (dir !== null) {

                  // If the right key is pressed, move focus to the open panel, otherwise switch to the adjacent tab

                  dir === "right" ? document.getElementById(e.currentTarget.id).nextElementSibling.focus() : tabListButton[dir] ? toggleTabCordion(tabListButton[dir], e.currentTarget, tabListButton[dir].getAttribute("data-button-count")) : void 0;

                }

              } else {

                // Move left, right, and down.

                var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? "down" : null;

                if (dir !== null) {

                  // If the down key is pressed, move focus to the open panel, otherwise switch to the adjacent tab

                  dir === "down" ? document.getElementById(e.currentTarget.id).nextElementSibling.focus() : tabListButton[dir] ? toggleTabCordion(tabListButton[dir], e.currentTarget, tabListButton[dir].getAttribute("data-button-count")) : void 0;

                }

              }

            }

          });

        });

        // Begin looping though breakpoints and altering DOM as each of
        // those viewports is resized/loaded.

        if (tabListBreakPoints[i].matches) {

          // Our Tab UI.

          tabCordion.setAttribute("role", "tablist");

          if(tabVertical !== null) {

            // Indicate orientation

            tabCordion.setAttribute("aria-orientation", "vertical");

          }

          // Our Tab UI buttons.

          tabListButton.forEach(function(button, j){

            var tabListItemCount = j + 1;

            button.setAttribute("aria-selected", "false");
            button.setAttribute("role", "tab");
            button.setAttribute("tabindex", -1);
            button.removeAttribute("aria-expanded");

            if(Number(tabListItemCount) === Number(tabPanelSelected)) {

              button.setAttribute("aria-selected", "true");
              button.removeAttribute("tabindex");

            }

            //TODO: Add key direction support.

          });

          // Our Tab UI panels.

          tabListPanel.forEach(function(panel, j){

            var tabListItemCount = j + 1;

            panel.setAttribute("role", "tabpanel");
            panel.setAttribute("aria-labelledby", "tab-button-" + tabListCount + "-" + tabListItemCount);

          });

        } else {

          // Our Accordion UI.

          tabCordion.removeAttribute("role");

          if(tabVertical !== null) {

            // Remove orientation

            tabCordion.removeAttribute("aria-orientation");

          }

          // Our Accordion UI buttons.

          tabListButton.forEach(function(button, j){

            var tabListItemCount = j + 1;

            button.setAttribute("aria-expanded", "false");
            button.removeAttribute("aria-selected");
            button.removeAttribute("role");
            button.removeAttribute("tabindex");

            if(Number(tabListItemCount) === Number(tabPanelSelected)) {

              button.setAttribute("aria-expanded", "true");

            }

          });

          // Our Accordion UI panels.

          tabListPanel.forEach(function(panel){

            panel.removeAttribute("role");
            panel.removeAttribute("tabindex");
            panel.removeAttribute("aria-labelledby");

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
