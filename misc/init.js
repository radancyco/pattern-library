/*!

  Radancy Pattern Library: Miscellaneous Examples

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy
  Dependencies: None

*/

// Your Path

var yourPathClass = ".your-path";
var yourPathBtnClass = ".your-path__btn";
var yourPathContentClass = ".your-path__content";
var yourPath = document.querySelectorAll(yourPathClass);
var yourPathBtn = document.querySelectorAll(yourPathBtnClass);
var yourPathContent = document.querySelectorAll(yourPathContentClass);

yourPathContent.forEach(function(content, e){

  content.setAttribute("id",  "your-path-" + (e + 1));

});

yourPathBtn.forEach(function(button, e){

  button.setAttribute("aria-controls", "your-path-" + (e + 1));
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", function () {

    var activeButton = this.closest(yourPathClass).querySelectorAll(yourPathBtnClass);

    activeButton.forEach(function(active, i){

      active.setAttribute("aria-expanded", "false");
      active.parentNode.classList.remove("active");

    });

    this.setAttribute("aria-expanded", "true");
    this.parentNode.classList.add("active");

  });

});
