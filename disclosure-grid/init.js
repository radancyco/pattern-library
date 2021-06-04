/*!

  Radancy Pattern Library: Grid Disclosure

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Bobby KC, Email: bobby.kc@radancy.com
  Dependencies: jQuery

*/

(function() {

  // forEach Polyfill for IE11.

  if (window.NodeList && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = Array.prototype.forEach;

  }

  // Display which TabCordion is in use via console:

  console.log('%c Grid Disclosure v1.0 (Beta) in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, and Strings.

  var grid = ".disclosure-grid";
  var gridBreakpoint = "data-grid-breakpoint";

  // Grab the hash (fragment) from the URL.

  var URLFragment = window.location.hash.substr(1);

  // Get all TabCordions on the page...

  var disclosureGrids = document.querySelectorAll(grid);

  // Create an array to store each TabCordions breakpoint in,
  // which we will loop through later...

  var disclosureGridBreakpoints = [];

  // loop through each TabCordion...

  disclosureGrids.forEach(function(gridItem){

    // Get each TabCordion breakpoint...

    var disclosureBreakpoint = gridItem.getAttribute(gridBreakpoint);

    // Store each breakpoint in array (above) for later use by matchMedia.

    disclosureGridBreakpoints.push(window.matchMedia(disclosureBreakpoint));

  });

  function viewPortChange() {

    // Loop through each TabCordion

    // Loop through each TabCordion

    disclosureGrids.forEach(function(gridItem, i){

      // Begin looping though breakpoints and altering DOM as each of
      // those viewports are resized/loaded.

      if (disclosureGridBreakpoints[i].matches) {

        // loop though button

        $(".disclosure-grid").addClass("stacked");

        var btnCounter = 1;
        var divCounter = 4; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 3

        $(".disclosure-grid__button").each(function (index) {

          $(this).attr("style", "order: " + btnCounter)

          if (btnCounter % 3 == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            btnCounter += 3; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          btnCounter++

        });

        $(".disclosure-grid__content").each(function (index) {

          $(this).attr("style", "order: " + divCounter)

          if (divCounter % 3 == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            divCounter += 3; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          divCounter++

        });

      } else {

        $(".disclosure-grid").removeClass("stacked");

        $(".disclosure-grid__button, .disclosure-grid__content").removeAttr("style");

      }

    });

  }

  $(".disclosure-grid__button").each(function (index) {

    $(this).attr("aria-expanded", "false");

  }).on("click", function() {

    $(".disclosure-grid__button").attr("aria-expanded", "false");

    $(this).attr("aria-expanded", function (i, attr) {

      return attr == "true" ? "false" : "true"

    }).next().attr("tabindex", "-1").focus();

  });

  $(".disclosure-grid__content").each(function (index) {

    $(this).prepend("<button class='disclosure-grid__close' aria-label='Close'></button>");

  });

  $(".disclosure-grid__close").on("click", function() {

    $(this).parent().prev().attr("aria-expanded", "false");

  });

  // Initiate viewPortWidth function when viewport is resized.

  disclosureGridBreakpoints.forEach(function(breakpoints){

    breakpoints.addListener(viewPortChange);

  });

  // Initiate tabCordions on page load.

  viewPortChange();

})();
