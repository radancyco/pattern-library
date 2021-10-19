/*!

  Radancy Pattern Library: Grid Disclosure

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // IE11 Detection

  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  // forEach Polyfill for IE11.

  if(isIE11) {

    NodeList.prototype.forEach = Array.prototype.forEach;

  };

  // Display which Grid version in use via console:

  console.log('%c Grid Disclosure v1.0 (Beta) in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, and Strings.

  var gridButtonClass = ".disclosure-grid__button";
  var gridButtonId = "grid-button";
  var gridClass = ".disclosure-grid";
  var gridCloseClass = "disclosure-grid__close"
  var gridCloseText = "Close";
  var gridContentAreaId = "grid-content";
  var gridContentClass = ".disclosure-grid__content";
  var gridDataActive = "data-grid-active";
  var gridDataClose = "data-grid-disable-close";
  var gridDataDisableURL = "data-grid-disable-url";
  var gridDataExclude = "data-grid-exclude";
  var gridDataLarge = "data-grid-large";
  var gridDataMedium = "data-grid-medium";
  var gridDataSticky = "data-grid-sticky";
  var gridDisclosureId = "grid-disclosure";
  var gridFormatClass = "grid-format";
  var gridButtonAll = document.querySelectorAll(gridButtonClass);
  var gridCallBackAll = document.querySelectorAll(".disclosure-grid[data-grid-callback]");
  var gridContentAll = document.querySelectorAll(gridContentClass);
  var gridDisclosuresAll = document.querySelectorAll(gridClass);
  var gridDelay = 500;

  // Grab the hash (fragment) from the URL, which we may need later.

  var URLFragment = window.location.hash.substr(1);

  // Create an array to store each Grid breakpoint in, which we will loop through later...

  var gridDisclosureLarge = [];
  var gridDisclosureMedium = [];

  // loop through each Grid...

  gridDisclosuresAll.forEach(function(gridItem, i){

    var gridItemCount = i + 1;
    gridItem.setAttribute("id", gridDisclosureId + "-" + gridItemCount);

    // Get each Grids medium and large breakpoints...

    var disclosureLargeBreakpoint = gridItem.getAttribute(gridDataLarge);
    var disclosureMediumBreakpoint = gridItem.getAttribute(gridDataMedium);

    // Store each breakpoint in array (created above) for later use by matchMedia.

    gridDisclosureLarge.push(window.matchMedia(disclosureLargeBreakpoint));
    gridDisclosureMedium.push(window.matchMedia(disclosureMediumBreakpoint));

  });

  // If URL fragment present with "grid-content"...

  if(URLFragment.indexOf(gridContentAreaId) > -1) {

    // Parse fragment and pull grid and content ID number.
    // We will then target specific grid and reset data-grid-active with open value.

    var gridFragment = URLFragment.split(/-/g).slice(2);
    var gridSelected = parseInt(gridFragment[0]);
    var gridContentSelected = gridFragment[1];
    var grid = document.getElementById(gridDisclosureId + "-" + gridSelected);

    // Reset data-grid-active

    grid.setAttribute(gridDataActive, gridContentSelected);

  };

  function gridViewPort() {

    // Loop through each Grid...

    gridDisclosuresAll.forEach(function(gridItem, i){

      var gridItemCount = i + 1;

      // Add Unique class to medium and large viewport widths.

      gridItem.classList.add(gridFormatClass);

      // Get each Grids child buttons and content

      var gridButtonChild = gridItem.querySelectorAll(gridButtonClass);
      var gridContentChild = gridItem.querySelectorAll(gridContentClass);

      // Begin looping though grids and altering DOM as each viewport is met.

      if (gridDisclosureMedium[i].matches) {

        // Here we match the medium breakpoint with the min amount of grid items we want displayed...

        var gridSize = parseInt(gridItem.dataset.gridMin);

      } else if (gridDisclosureLarge[i].matches) {

        // Here we match the large breakpoint with the max amount of grid items we want displayed...

        var gridSize = parseInt(gridItem.dataset.gridMax);

      } else {

        // It's a small viewport (mobile), so we can remove the special class.

        gridItem.classList.remove(gridFormatClass);

      };

      var gridButtonCount = 1;
      var gridContentCount = gridSize + 1; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 3

      // Button Child

      gridButtonChild.forEach(function(button, e){

        if (!button.hasAttribute(gridDataExclude)) {

          var buttonCount = e + 1;

          // Rather than manipulate the DOM bu copying, creating, and appending elements, we can instead "reorder"
          // the layout via use of the CSS order property when conditions are met.

          // Buttons will contain an order of 1, 2, 3, 4 and so on.
          // To address accessibility concerns, we simply manage focus when button clicked.
          // Tabbing should be just fine, though we may need to include keyboard arrow function in future release.

          /*

            Example:

            <button style="order: 1"> ... </button>

            <div style="order: 3"> ... </div>

            <button stle="order: 2"> ... </button>

            <div style="order: 4"> ... </div>

            ...

          */

          if (gridDisclosureLarge[i].matches || gridDisclosureMedium[i].matches) {

            // var itemSize = parseInt(100 / gridSize);
            // button.setAttribute("style", "order: " + gridButtonCount + "; width: " + itemSize + "%;");

            // Note: Because spacing with margins is a problem for a dynamic l;ayout such of this, we have to pull in
            // the computed margin value from CSS and apply calculation for inline style.

            var buttonStyle = window.getComputedStyle(button);
            var buttonMarginLeft = parseInt(buttonStyle.getPropertyValue("margin-left").replace("px", ""));
            var buttonMarginRight = parseInt(buttonStyle.getPropertyValue("margin-right").replace("px", ""));
            var buttonMarginTotal = buttonMarginLeft + buttonMarginRight;

            // if(!isIE11) {

            button.setAttribute("style", "margin-right: " + buttonMarginRight + "px; margin-left: " + buttonMarginLeft + "px; order: " + gridButtonCount + "; width: calc(100%/" + gridSize + " - " + buttonMarginTotal + "px);");

            // } else {

            // button.setAttribute("style", "margin-right: " + buttonMarginRight + "px; margin-left: " + buttonMarginLeft + "px; order: " + gridButtonCount + "; width: calc(99.9%/" + gridSize + " - " + buttonMarginTotal + "px);");

            // }

            if (gridButtonCount % gridSize === 0) {

              gridButtonCount += gridSize;

            };

            gridButtonCount++

          } else {

            // If it's a small (mobile) viewport, then all elements are simply stacked, so need for inline style.

            button.removeAttribute("style");

          };

          // Add additional attributes for accessibility, etc.

          var gridID = gridItemCount + "-" + buttonCount;

          button.setAttribute ("id", gridButtonId + "-" + gridID);
          button.setAttribute ("aria-controls", gridContentAreaId + "-" + gridID);

          // Set active content

          var gridCount = e + 1;
          var gridSelected = parseInt(gridItem.dataset.gridActive);

          if (gridCount === gridSelected) {

            button.setAttribute("aria-expanded", "true");

          } else {

            button.setAttribute("aria-expanded", "false");

          };

        }; // End gridDataExclude

      });

      // Content Child

      gridContentChild.forEach(function(content, e){

        if (!content.hasAttribute(gridDataExclude)) {

          // Rather than manipulate the DOM bu copying, creating, and appending elements, we can instead "reorder"
          // the layout via use of the CSS order property when conditions are met.

          // Content will contain an order of 5, 6, 7, 8 and so on, making content appear as if they are under the buttons.

          var contentCount = e + 1;

          if (gridDisclosureLarge[i].matches || gridDisclosureMedium[i].matches) {

            content.setAttribute("style", "order: " + gridContentCount);

            if (gridContentCount % gridSize === 0) {

              gridContentCount += gridSize;

            };

            gridContentCount++

          } else {

            // If it's a small (mobile) viewport, then all elements are simply stacked, so need for inline style.

            content.removeAttribute("style");

          };

          // Add additional attributes for accessibility, etc.

          var gridID = gridItemCount + "-" + contentCount;

          // content.setAttribute ("aria-labelledby", gridButtonId + "-" + gridID); Axe reporting that aria-labelledby on div not well supported. Removing for now.
          content.setAttribute ("id", gridContentAreaId + "-" + gridID);

        }; // End gridDataExclude

      });

    });

  };

  // Add listner and initiate gridViewPort function when viewport is resized.

  gridDisclosureLarge.forEach(function(breakpoints){

    breakpoints.addListener(gridViewPort);

  });

  // Add listner and initiate gridViewPort function when viewport is resized.

  gridDisclosureMedium.forEach(function(breakpoints){

    breakpoints.addListener(gridViewPort);

  });

  // Initiate Grids on initial page load.

  gridViewPort();

  // Button Event

  gridButtonAll.forEach(function(button, e){

    // Button Toggle
    // TODO: Allow mobile to have multiple opens.

    button.addEventListener("click", function () {

      if (this.getAttribute("aria-expanded") === "false") {

        var gridItemButtons = this.parentNode.querySelectorAll(gridButtonClass);

        gridItemButtons.forEach(function(buttons){

          if (!buttons.hasAttribute(gridDataExclude)) {

            buttons.setAttribute("aria-expanded", "false");

          };

        });

        this.setAttribute("aria-expanded", "true");
        //this.nextElementSibling.setAttribute("tabindex", "-1");
        //this.nextElementSibling.focus();

        // Append fragment to URL if data-tab-disable-url not present.

        var gridURLBypass = this.parentNode.getAttribute(gridDataDisableURL);
        var selectedGridContentID = this.nextElementSibling.getAttribute("id");
        var targetContent = document.getElementById(selectedGridContentID);

        // On click, add or change data-grid-active value. Better to just add/change a data attribute script already lookig for.

        var gridFragment = selectedGridContentID.split(/-/g).slice(2);
        var gridContentSelected = gridFragment[1];
        this.parentNode.setAttribute(gridDataActive, gridContentSelected)

        // if callback is present, then fire it off.

        var gridCallBack = this.parentNode.dataset.gridCallback;

        if(gridCallBack !== undefined) {

          contentTarget = this.nextElementSibling.getAttribute("id");
          customCallback(contentTarget, gridCallBack);

        };

        if(gridURLBypass === null) {

          history.pushState(null, null, "#" + selectedGridContentID);

        };

        scrollIntoPosition(this);

      };

    });

  });

  // Content Order

  gridContentAll.forEach(function(content, e){

    // Close Button

    if(!content.parentNode.hasAttribute(gridDataClose)) {

      var gridCloseButton = document.createElement("button");
      gridCloseButton.setAttribute("aria-label", gridCloseText);
      gridCloseButton.classList.add(gridCloseClass);

      gridCloseButton.addEventListener("click", function () {

        this.parentNode.previousElementSibling.setAttribute("aria-expanded", "false");
        this.parentNode.parentNode.removeAttribute(gridDataActive);

      });

      content.prepend(gridCloseButton);

    };

  });

  gridCallBackAll.forEach(function(grid){

    var callBackFunction = grid.dataset.gridCallback;
    var callBackContent = grid.querySelectorAll(gridButtonClass + "[aria-expanded=true] + " + gridContentClass);

    callBackContent.forEach(function(content){

      contentTarget = content.getAttribute("id");
      customCallback(contentTarget, callBackFunction);

    });

  });

  // Custom callback with variable name. Accepts ID of content you will target.

  function customCallback(contentTarget, customCallBackName) {

    if (customCallBackName !== null) {

      window[customCallBackName](contentTarget);

    };

  };

  // Get Offset
  // TODO: Remove this when scroll-margin-top is better supported in iOS

  function getOffset(el) {

    var rect = el.getBoundingClientRect();
    return {

      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY

    };

  };

  function scrollIntoPosition(button) {

    setTimeout(function(){

      // Scroll to grid position
      // TODO: Possibly remove this when scroll-margin-top is better supported in iOS

      // Get the element being accessed, in this case the button:

      var gridContentTarget = button;

      setTimeout(function(){

        gridContentTarget.focus();

      }, gridDelay * 2);

      // Get Sticky Element Offset

      if (button.parentNode.getAttribute(gridDataSticky) !== null) {

        var stickyTargetID = button.parentNode.dataset.gridSticky;

        // Single or multiple target offsets

        var stickyTargetArray = stickyTargetID.replace(" ", "").split(",");

        // Get total outer height of all elements.

        var stickyTargetHeight = 0;

        stickyTargetArray.forEach(function(stickyTargetElement, e){

          stickyTargetHeight += document.getElementById(stickyTargetElement).offsetHeight + 16;

          // 16 is an arbitrary number to add a slight amount of space between top of grid button and target(s).
          // TODO: Make a data-* so dev an offset however they wish.

        });

        window.scrollTo({

          top: getOffset(gridContentTarget).top - stickyTargetHeight

        });

      } else {

        window.scrollTo({

          top: getOffset(gridContentTarget).top

        });

      };

    }, gridDelay);

  };

  // Back Button

  window.onpopstate = function() {

    var contentFragment = window.location.hash.substr(1);

    if(contentFragment.indexOf(gridContentAreaId) > -1) {

      // Parse fragment and pull grid and content ID number.
      // We will then target specific grid and reset data-grid-active with open value.

      var gridFragment = contentFragment.split(/-/g).slice(2);
      var gridSelected = parseInt(gridFragment[0]);
      var gridContentSelected = gridFragment[1];
      var grid = document.getElementById(gridDisclosureId + "-" + gridSelected);

      // Reset data-grid-active

      grid.setAttribute(gridDataActive, gridContentSelected);

      gridViewPort(); // HACK: Firing off entire grid again until we can build a small function to turn section on and off more simply.

      var selectedGridContent = document.getElementById(URLFragment);

      if (selectedGridContent) {

        var selectedGridButton = selectedGridContent.previousElementSibling;

        scrollIntoPosition(selectedGridButton);

      };

    };

  };

  // If hash exists, focus and scroll to it.

  if(URLFragment.indexOf(gridContentAreaId) > -1) {

    // Focus and scroll to target content.

    var selectedGridContent = document.getElementById(URLFragment);

    if (selectedGridContent) {

      var selectedGridButton = selectedGridContent.previousElementSibling;

      scrollIntoPosition(selectedGridButton);

    };

  };

  // Add Grid Disclosure to Window Object so that it can be called again if needed.

  window.gridViewPort = gridViewPort;

})();

// Example Callback Function

function helloWorld(contentID) {

  var targetContent = document.getElementById(contentID);
  var message = document.createElement("p");
  message.innerHTML = "<strong>Hello World! The ID of this content area is <em> " + contentID + "</em>. You can use a callback to initiate a function within the disclosed content area on page load and reinitiate the same function on button click.</strong>";
  targetContent.append(message);

};
