/*!

  Radancy Pattern Library: Jump Menu (In-Page) v1.0

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Display which Jump Menu in use via console:

  console.log('%c Jump Menu (In-page) v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var inPageClass = ".in-page";
  var inPageLabelClass = ".in-page__label";
  var inPageSelectClass = ".in-page__select";
  var inPageOptionClass = ".in-page__select option";
  var inPageBtnClass = ".in-page__btn";
  var inPageContentClass = ".in-page__content";
  var inPage = document.querySelectorAll(inPageClass);
  var inPageLabel = document.querySelectorAll(inPageLabelClass);
  var inPageSelect = document.querySelectorAll(inPageSelectClass);
  var inPageOption = document.querySelectorAll(inPageOptionClass);
  var inPageBtn = document.querySelectorAll(inPageBtnClass);
  var inPageState = "active";
  var inPageHash =  window.location.hash;
  var inPageFragment = inPageHash.substr(1);
  var inPageContentList = [];

  // On page load

  inPageLabel.forEach(function(label, e){

    // Apply "for" attribute to each label.

    label.setAttribute("for", "in-page-select-" + (e + 1));

  });

  inPageSelect.forEach(function(select, e){

    // Apply "id" to each select.

    select.setAttribute("id", "in-page-select-" + (e + 1));

  });

  // Get all Job Menu options on page and push to array.

  inPageOption.forEach(function(option, e){

    inPageContentList.push(option.getAttribute("value"));

  });

  function inPageSelectedState() {

    // Check array against hash

    if(inPageContentList.includes(inPageHash)) {

      // If hash matches one of the array selections, then load the selected content in hash

      var inPageSelected =  document.getElementById(inPageFragment);
      var inPageContent = inPageSelected.closest(inPageClass).querySelectorAll(inPageContentClass);

      inPageContent.forEach(function(content, i){

        content.setAttribute("hidden", "");

      });

      inPageSelected.removeAttribute("hidden");

      inPageOption.forEach(function(select, i){

        var optionvalue  = select.getAttribute("value");

        if (location.hash === optionvalue) {

          select.setAttribute("selected", "");
          select.closest(inPageClass).classList.add(inPageState);

        }

      });

    }

  }

  inPageSelectedState();

  inPageSelect.forEach(function(select, e){

    select.addEventListener("change", function () {

      var inPageParent = this.closest(inPageClass);

      var inPageSelected = inPageParent.getElementsByTagName("select")[0];

      var inPageAnnounce = inPageParent.querySelector("div[aria-live]");

      inPageAnnounce.innerHTML = "Selected Content: " + this.options[this.selectedIndex].text;

      history.replaceState(null, null, inPageSelected.value);

      var inPageContentSelected = window.location.hash.substr(1);

      var inPageContent = inPageParent.querySelectorAll(inPageContentClass);

      inPageContent.forEach(function(content, i){

        content.setAttribute("hidden", "");

      });

      document.getElementById(inPageContentSelected).removeAttribute("hidden");

      // Set selected jump menu to active.

      inPage.forEach(function(menu, e){

        menu.classList.remove(inPageState);

      });

      inPageParent.classList.add(inPageState);

    });

  });

  // Some browsers fail to place the select back to 0 when back button selected. This fixes that.

  window.addEventListener("beforeunload", function () {

    inPage.forEach(function(menu, e){

      if (!menu.classList.contains(inPageState)) {

        menu.getElementsByTagName("select")[0].selectedIndex = 0;

      }

    });

  });

})();
