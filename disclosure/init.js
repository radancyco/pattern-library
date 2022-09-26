/*!

  Radancy Pattern Library: Disclosure

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Andrew Hill, Email: andrew.hill@radancy.com

  Dependencies: None

*/

(function() {

  // Display which Disclosure is in use via console:

  console.log('%c Disclosure v1.4 in use. ', 'background: #6e00ee; color: #fff');

  // Commonly used Classes, Data Attributes, States, Strings, etc.

  var disclosure = document.querySelectorAll(".disclosure");
  var disclosureBtn = document.querySelectorAll(".disclosure--btn");
  var disclosureContent = document.querySelectorAll(".disclosure--content");
  var disclosureToggleAll = document.querySelectorAll(".disclosure--toggle-all");

  // Add Listener and other needed attributes to disclosure button

  disclosureBtn.forEach(function(button, e) {

    var int = e + 1;

    button.setAttribute("aria-expanded", "false");

    if(button.hasAttribute("id")){

      // Check for custom ID on button.

      var thisButtonID = button.getAttribute("id");
      var thisContentID = button + "-content";

    } else {

      // else, add dynamic ID.

      var thisButtonID = "disclosure-btn-" + int;
      var thisContentID = "disclosure-content-" + int;

    }

    // Set ID and aria-controls on button.

    button.setAttribute("id", thisButtonID);
    button.setAttribute("aria-controls", thisContentID);

    if(button.closest(".disclosure--heading")) {

      // If button contains heading.

      button.closest(".disclosure--heading").nextElementSibling.setAttribute("id", thisContentID);

    } else {

      button.nextElementSibling.setAttribute("id", thisContentID);

    }

    // If button needs icon

    if(button.hasAttribute("data-disclosure-icon")){

      button.insertAdjacentHTML('beforeend', ' <span class="disclosure--icon" aria-hidden="true"></span>');

      // Note: We add icon in spon with aria-hidden so that is not read back by AT. For example, we don't want to hear "Learn More Plus Sign", etc.

    }

    button.addEventListener("click", function () {

      discloseContent(this);

    });

    if(button.hasAttribute("data-disclosure-open")) {

      button.click();

    }

  });

  // Prep each content area.

  disclosureContent.forEach(function(content, e) {

    content.setAttribute("role", "group");

  });

  // Multiple

  disclosureToggleAll.forEach(function(toggle, e) {

    toggle.setAttribute("aria-pressed", "false");
    toggle.insertAdjacentHTML("beforeend", " <span class='disclosure--toggle-all-icon' aria-hidden='true'></span>");

    toggle.addEventListener("click", function () {

      discloseMultiple(this);

    });

  });

  // Open selected disclosure via URL

  var url = document.location.href;
  var hash = url.split("#");
  var disclosureID = document.getElementById(hash[1]);

  if(disclosureID) {

    if(disclosureID.closest(".disclosure--heading")) {

      disclosureID.closest(".disclosure--heading").classList.add("open");

    } else {

      disclosureID.classList.add("open");

    }

    disclosureID.setAttribute("aria-expanded", "true");

  }

  function discloseContent(thisButton){

    // Run Event

    var isActive = thisButton.getAttribute("aria-expanded");

    if (isActive === "true") {

      // Not Active

      thisButton.setAttribute("aria-expanded", "false");

      if(thisButton.closest(".disclosure--heading")) {

        thisButton.closest(".disclosure--heading").classList.remove("open");

      } else {

        thisButton.classList.remove("open");

      }

    } else {

      // Active

      thisButton.setAttribute("aria-expanded", "true");

      if(thisButton.closest(".disclosure--heading")) {

        thisButton.closest(".disclosure--heading").classList.add("open");

      } else {

        thisButton.classList.add("open");

      }

    }

    // Check if all buttons are open

    if(thisButton.closest(".disclosure")) {

      var buttonArray = [];

      var allGroupButtons = thisButton.closest(".disclosure").querySelectorAll(".disclosure--btn");

      allGroupButtons.forEach(function(button, e) {

        buttonArray.push(button.getAttribute("aria-expanded"));

      });

      // console.log(buttonArray);

      if(buttonArray.includes("false")) {

        thisButton.closest(".disclosure").querySelector(".disclosure--toggle-all").setAttribute("aria-pressed", "false");

      } else {

        thisButton.closest(".disclosure").querySelector(".disclosure--toggle-all").setAttribute("aria-pressed", "true");

      }

    }

  }

  function discloseMultiple(thisButton){

    var isActive = thisButton.getAttribute("aria-pressed");

    if(isActive === "true") {

      thisButton.setAttribute("aria-pressed", "false");

    } else {

      thisButton.setAttribute("aria-pressed", "true");

    }

    var openAll = thisButton.closest(".disclosure").querySelectorAll(".disclosure--btn");

    openAll.forEach(function(button, e) {

      if (isActive === "true") {

        button.setAttribute("aria-expanded", "false");

        if(button.closest(".disclosure--heading")) {

          button.closest(".disclosure--heading").classList.remove("open");

        } else {

          button.classList.remove("open");

        }

      } else {

        button.setAttribute("aria-expanded", "true");

        if(button.closest(".disclosure--heading")) {

          button.closest(".disclosure--heading").classList.add("open");

        } else {

          button.classList.add("open");

        }

      }

    });

  }

})();
