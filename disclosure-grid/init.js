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

  // Display which Grid is in use via console:

  console.log('%c Grid Disclosure v1.0 (Beta) in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, and Strings.

  var grid = ".disclosure-grid";
  var gridBreakpoint = "data-grid-breakpoint";

  // Grab the hash (fragment) from the URL.

  var URLFragment = window.location.hash.substr(1);

  // Get all Grids on the page...

  var disclosureGrids = document.querySelectorAll(grid);

  // Create an array to store each Grid breakpoint in,
  // which we will loop through later...

  var disclosureGridBreakpoints = [];

  // loop through each Grid...

  disclosureGrids.forEach(function(gridItem){

    // Get each Grid breakpoint...

    var disclosureBreakpoint = gridItem.getAttribute(gridBreakpoint);

    // Store each breakpoint in array (above) for later use by matchMedia.

    disclosureGridBreakpoints.push(window.matchMedia(disclosureBreakpoint));

  });

  function gridViewPort() {

    // Loop through each Grid...

    disclosureGrids.forEach(function(gridItem, i){

      // Begin looping though breakpoints and altering DOM as each of
      // those viewports are resized/loaded.

      if (disclosureGridBreakpoints[i].matches) {

        $(".disclosure-grid").addClass("grid-pattern");

        // loop though button

        var gridButtonCount = 1;
        var gridContentCount = 5; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 3

        // Button Order

        $(".disclosure-grid__button").each(function(e) {

          $(this).attr("style", "order: " + gridButtonCount)

          if (gridButtonCount % 4 == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            gridButtonCount += 4; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          gridButtonCount++

        });

        // Content Order

        $(".disclosure-grid__content").each(function(e) {

          $(this).attr("style", "order: " + gridContentCount)

          if (gridContentCount % 4 == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            gridContentCount += 4; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          gridContentCount++

        });

      } else {

        $(".disclosure-grid").removeClass("grid-pattern");
        $(".disclosure-grid__button, .disclosure-grid__content").removeAttr("style");

      }

    });

  }

  $(".disclosure-grid__button").each(function(e) {

    var gridCount = e + 1;
    var gridActive = $(this).parent().data("grid-active");

    if (gridCount === gridActive) {

        $(this).attr("aria-expanded", "true");

    } else {

        $(this).attr("aria-expanded", "false");

    }

  }).on("click", function() {

    $(".disclosure-grid__button").attr("aria-expanded", "false");

    $(this).attr("aria-expanded", function (i, attr) {

      return attr == "true" ? "false" : "true"

    }).next().attr("tabindex", "-1").focus();

  });

  $(".disclosure-grid__content").each(function(e) {

    $(this).prepend("<button class='disclosure-grid__close' aria-label='Close'></button>");

  });

  $(".disclosure-grid__close").on("click", function() {

    $(this).parent().prev().attr("aria-expanded", "false");

  });

  // Initiate viewPortWidth function when viewport is resized.

  disclosureGridBreakpoints.forEach(function(breakpoints){

    breakpoints.addListener(gridViewPort);

  });

  // Initiate Grids on page load.

  gridViewPort();

})();
