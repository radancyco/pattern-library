/*!

  Radancy Pattern Library: Jump Menu v1.0

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

(function() {

  // Display which Grid version in use via console:

  console.log('%c Jump Menu v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var jumpMenuLabel = document.querySelectorAll(".jump-menu__label");
  var jumpMenuSelect = document.querySelectorAll(".jump-menu__select");
  var jumpMenuBtn = document.querySelectorAll(".jump-menu__btn");

  jumpMenuLabel.forEach(function(label, e){

    label.setAttribute("for", "jump-menu-select-" + (e + 1));

  });

  jumpMenuSelect.forEach(function(select, e){

    select.setAttribute("id", "jump-menu-select-" + (e + 1));

  });

  jumpMenuBtn.forEach(function(button, e){

    button.addEventListener("click", function () {

      var jumpMenuSelected = this.closest(".jump-menu").getElementsByTagName("select")[0];

      location.href = jumpMenuSelected.value;

    });

  });

})();
