/*!

  Radancy Pattern Library: Jump Menu (External)

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Display which Grid version in use via console:

  console.log('%c Jump Menu (External) v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var jumpMenuClass = ".jump-menu";
  var jumpMenuLabelClass = ".jump-menu__label";
  var jumpMenuSelectClass = ".jump-menu__select";
  var jumpMenuBtnClass = ".jump-menu__btn";
  var jumpMenuLabel = document.querySelectorAll(jumpMenuLabelClass);
  var jumpMenuSelect = document.querySelectorAll(jumpMenuSelectClass);
  var jumpMenuBtn = document.querySelectorAll(jumpMenuBtnClass);

  jumpMenuLabel.forEach(function(label, e){

    label.setAttribute("for", "jump-menu-select-" + (e + 1));

  });

  jumpMenuSelect.forEach(function(select, e){

    select.setAttribute("id", "jump-menu-select-" + (e + 1));

  });

  jumpMenuBtn.forEach(function(button, e){

    button.addEventListener("click", function () {

      var jumpMenuSelected = this.closest(jumpMenuClass).getElementsByTagName("select")[0];

   // jumpMenuSelected.selectedIndex = 0;
      location.href = jumpMenuSelected.value;

    });

  });

})();
