/*!

  Radancy Component Library: Carousel Grid

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

var carousel = document.querySelector(".carousel-grid__container");
var isDown = false;
var startX;
var scrollLeft;

carousel.addEventListener("mousedown", function (e) {

  isDown = true;
  carousel.classList.add("active");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;

});

carousel.addEventListener("mouseleave", function () {

  isDown = false;
  carousel.classList.remove("active");

});

carousel.addEventListener("mouseup", function () {

  isDown = false;
  carousel.classList.remove("active");

});

carousel.addEventListener("mousemove", function (e) {

  if(!isDown) return;

  e.preventDefault();

  var x = e.pageX - carousel.offsetLeft;
  var walk = (x - startX) * 1; // Scroll Speed

  carousel.scrollLeft = scrollLeft - walk;

  console.log(walk);

});
