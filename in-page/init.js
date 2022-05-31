/*!

  Radancy Pattern Library: Jump Menu (In-Page) v1.0

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Display which Jump Menu in use via console:

  console.log('%c Jump Menu (In-page) v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var jumpMenuClass = ".jump-menu";
  var jumpMenuLabelClass = ".jump-menu__label";
  var jumpMenuSelectClass = ".jump-menu__select";
  var jumpMenuOptionClass = ".jump-menu__select option";
  var jumpMenuBtnClass = ".jump-menu__btn";
  var jumpMenuContentClass = ".jump-menu__content";
  var jumpMenu = document.querySelectorAll(jumpMenuClass);
  var jumpMenuLabel = document.querySelectorAll(jumpMenuLabelClass);
  var jumpMenuSelect = document.querySelectorAll(jumpMenuSelectClass);
  var jumpMenuOption = document.querySelectorAll(jumpMenuOptionClass);
  var jumpMenuBtn = document.querySelectorAll(jumpMenuBtnClass);
  var jumpMenuState = "active";
  var jumpMenuHash =  window.location.hash;
  var jumpFragment = jumpMenuHash.substr(1);
  var jumpMenuContentList = [];

  // On page load

  jumpMenuLabel.forEach(function(label, e){

    // Apply "for" attribute to each label.

    label.setAttribute("for", "jump-menu-select-" + (e + 1));

  });

  jumpMenuSelect.forEach(function(select, e){

    // Apply "id" to each select.

    select.setAttribute("id", "jump-menu-select-" + (e + 1));

  });

  // Get all Job Menu options on page and push to array.

  jumpMenuOption.forEach(function(option, e){

    jumpMenuContentList.push(option.getAttribute("value"));

  });

  function jumpmenuSelectedState() {

    // Check array against hash

    if(jumpMenuContentList.includes(jumpMenuHash)) {

      // If hash matches one of the array selections, then load the selected content in hash

      var jumpMenuSelected =  document.getElementById(jumpFragment);
      var jumpMenuContent = jumpMenuSelected.closest(jumpMenuClass).querySelectorAll(jumpMenuContentClass);

      jumpMenuContent.forEach(function(content, i){

        content.setAttribute("hidden", "");

      });

      jumpMenuSelected.removeAttribute("hidden");

      jumpMenuOption.forEach(function(select, i){

        var optionvalue  = select.getAttribute("value");

        if (location.hash === optionvalue) {

          select.setAttribute("selected", "");
          select.closest(jumpMenuClass).classList.add(jumpMenuState);

        }

      });

    }

  }

  jumpmenuSelectedState();

  jumpMenuSelect.forEach(function(select, e){

    select.addEventListener("change", function () {

      var jumpMenuParent = this.closest(jumpMenuClass);

      var jumpMenuSelected = jumpMenuParent.getElementsByTagName("select")[0];

      var jumpMenuAnnounce = jumpMenuParent.querySelector("div[aria-live]");

      jumpMenuAnnounce.innerHTML = "Selected Content: " + this.options[this.selectedIndex].text;

      history.replaceState(null, null, jumpMenuSelected.value);

      var jumpMenuContentSelected = window.location.hash.substr(1);

      var jumpMenuContent = jumpMenuParent.querySelectorAll(jumpMenuContentClass);

      jumpMenuContent.forEach(function(content, i){

        content.setAttribute("hidden", "");


      });

      document.getElementById(jumpMenuContentSelected).removeAttribute("hidden");

      // Set selected jump menu to active.

      jumpMenu.forEach(function(menu, e){

        menu.classList.remove(jumpMenuState);

      });

      jumpMenuParent.classList.add(jumpMenuState);

    });

  });

  // Some browsers fail to place the select back to 0 when back button selected. This fixes that.

  window.addEventListener("beforeunload", function () {

    jumpMenu.forEach(function(menu, e){

      if (!menu.classList.contains(jumpMenuState)) {

        menu.getElementsByTagName("select")[0].selectedIndex = 0;

      }

    });

  });

})();
