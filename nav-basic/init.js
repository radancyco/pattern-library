/*!

  Radancy Pattern Library: Jump Menu (External) v1.0

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Display which Grid version in use via console:

  console.log('%c Navigation (Basic) v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var primaryNavigationClass = ".primary-navigation";
  var primaryNavigationMenuClass = ".primary-navigation__menu";
  var primaryNavigationItemClass = ".primary-navigation__item";
  var primaryNavigationContentClass = ".primary-navigation__content";
  var primaryNav = document.querySelectorAll(primaryNavigationClass);
  var primaryNavMenu = document.querySelectorAll(primaryNavigationMenuClass);
  var primaryNavItem = document.querySelectorAll(primaryNavigationItemClass);
  var primaryNavContent = document.querySelectorAll(primaryNavigationContentClass);
  var URLPath = location.pathname;
  var fileName = /[^\/]*$/;

  URLPath.replace(fileName, ''); // Remove file name, if any.

  var pageFolder = URLPath.replace(fileName, "").replace(/\//g,"");

  primaryNavContent.forEach(function(content, e){

    content.setAttribute("id",  "nav-content-" + (e + 1));

    var subListItems = content.querySelectorAll("li");

    //subitem.setAttribute("id", "nav-" + (e + 1));

    subListItems.forEach(function(subitem, i){

      var subItemLink = subitem.firstChild.getAttribute("href").replace(/\//g,"").toLowerCase();

    //  alert(subItemLink);

      subitem.firstChild.setAttribute("id", "nav-" + subItemLink);

      // Highlight Navigation

      if(document.getElementById("nav-" + pageFolder)) {

          var selectedNav = document.getElementById("nav-" + pageFolder);

          selectedNav.setAttribute("aria-current", "page");
          selectedNav.setAttribute("href", "#content");

        }


    });




  });

  primaryNavItem.forEach(function(button, e){

    button.setAttribute("aria-controls", "nav-content-" + (e + 1));
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function () {

      if(this.getAttribute("aria-expanded") === "true") {

  	    this.setAttribute("aria-expanded", "false");

  	  } else {

  	    this.setAttribute("aria-expanded", "true");

  	  }

    });

  });

//  jumpMenuSelect.forEach(function(select, e){

  //  select.setAttribute("id", "jump-menu-select-" + (e + 1));

//  });

//  jumpMenuBtn.forEach(function(button, e){

  //  button.addEventListener("click", function () {

    //  var jumpMenuSelected = this.closest(jumpMenuClass).getElementsByTagName("select")[0];

   // jumpMenuSelected.selectedIndex = 0;
    //  location.href = jumpMenuSelected.value;

    //});

  //});

})();
