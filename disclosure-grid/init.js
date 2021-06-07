/*!

  Radancy Pattern Library: Grid Disclosure

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
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
  var gridLarge = "data-grid-large";
  var gridMedium = "data-grid-medium";

  // Grab the hash (fragment) from the URL.

  var URLFragment = window.location.hash.substr(1);

  // Get all Grids on the page...

  var disclosureGrids = document.querySelectorAll(grid);

  // Create an array to store each Grid breakpoint in,
  // which we will loop through later...

  var disclosureGridsLarge = [];
  var disclosureGridsMedium = [];

  // loop through each Grid...

  disclosureGrids.forEach(function(gridItem){

    // Get each Grid breakpoint...

    var disclosureLargeBreakpoint = gridItem.getAttribute(gridLarge);
    var disclosureMediumBreakpoint = gridItem.getAttribute(gridMedium);

    // Store each breakpoint in array (above) for later use by matchMedia.

    disclosureGridsLarge.push(window.matchMedia(disclosureLargeBreakpoint));
    disclosureGridsMedium.push(window.matchMedia(disclosureMediumBreakpoint));

  });

  function gridViewPort() {

    // Loop through each Grid...

    disclosureGrids.forEach(function(gridItem, i){

      var gridItemCount = i + 1;

      gridItem.classList.add("grid-pattern");

      var gridButton = gridItem.querySelectorAll(".disclosure-grid__button");
      var gridContent = gridItem.querySelectorAll(".disclosure-grid__content");

      // Begin looping though grids and altering DOM as each viewport is met.

      if (disclosureGridsMedium[i].matches) {

        var gridSize = parseInt(gridItem.dataset.gridMin);

      } else if (disclosureGridsLarge[i].matches) {

        var gridSize = parseInt(gridItem.dataset.gridMax);

      } else {

        // Small Screen

        gridItem.classList.remove("grid-pattern");

        gridButton.forEach(function(button, e){

          button.removeAttribute("style");

        });

        gridContent.forEach(function(content, e){

          content.removeAttribute("style");

        });

      }

      if (disclosureGridsLarge[i].matches || disclosureGridsMedium[i].matches) {

        var gridButtonCount = 1;
        var gridContentCount = gridSize + 1; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 3

        // Button Order

        gridButton.forEach(function(button, e){

          button.setAttribute("style", "order: " + gridButtonCount + "; width: calc(100%/" + gridSize + ")");

          if (gridButtonCount % gridSize == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            gridButtonCount += gridSize; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          gridButtonCount++

          // Set Active Content

          var gridCount = e + 1;
          var gridSelected = parseInt(gridItem.dataset.gridActive);

          if (gridCount === gridSelected) {

              button.setAttribute("aria-expanded", "true");

          } else {

              button.setAttribute("aria-expanded", "false");

          }

          // Button Toggle
          // TODO: Allow mobile to have multiple opens.

          button.addEventListener("click", function () {

            var gridItemButtons = gridItem.querySelectorAll(".disclosure-grid__button");

            gridItemButtons.forEach(function(test){

              test.setAttribute("aria-expanded", "false");

            });

            this.setAttribute("aria-expanded", "true");
            this.nextElementSibling.setAttribute("tabindex", "-1");
            this.nextElementSibling.focus();

          });

        });

        // Content Order

        gridContent.forEach(function(content, e){

          var contentCount = e + 1;

          content.setAttribute("style", "order: " + gridContentCount);

          if (gridContentCount % gridSize == 0) { // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

            gridContentCount += gridSize; // WHEN SCREEN SIZE CHANGES, CHANGE THIS NUMBER TO 2

          }

          gridContentCount++

          content.setAttribute ("id", "content-" + gridItemCount + "-" + contentCount);

          // Close Button

          var gridCloseButton = document.createElement("button");
          gridCloseButton.setAttribute("aria-label", "Close");
          gridCloseButton.classList.add("disclosure-grid__close");

          gridCloseButton.addEventListener("click", function () {

             this.parentNode.previousElementSibling.setAttribute("aria-expanded", "false");

          });

          content.prepend(gridCloseButton);

        });

      }

    });

  }

  // Initiate viewPortWidth function when viewport is resized.

  disclosureGridsLarge.forEach(function(breakpoints){

    breakpoints.addListener(gridViewPort);

  });

  // Initiate viewPortWidth function when viewport is resized.

  disclosureGridsMedium.forEach(function(breakpoints){

    breakpoints.addListener(gridViewPort);

  });

  // Initiate Grids on page load.

  gridViewPort();

})();
