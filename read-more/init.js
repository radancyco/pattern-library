/*!

  Radancy Pattern Library: Read More v1.0

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: jQuery

*/

$(".read-more").append("<button class='read-more__btn' aria-expanded='true'>Read More <span class='read-more__btn--icon' aria-hidden='true'></span></button>");

var $focusElms = "a, button, input, video, iframe, audio, select";

$(".read-more .content").attr("aria-hidden", "true").find($focusElms).attr("tabindex", "-1");

$(".read-more__btn").on("click", function() {

  $(this).attr("aria-expanded", function (i, attr) {

    return attr == "true" ? "false" : "true"

  });

  var targetAttr = $(this).prev().attr("tabindex");

  if (typeof targetAttr !== typeof undefined && targetAttr !== false) {

    $(this).prev().removeAttr("tabindex").attr("aria-hidden", "true");
    $(this).prev().find($focusElms).attr("tabindex", "-1");

  } else {

    $(this).prev().removeAttr("aria-hidden").attr("tabindex", "-1").focus();
    $(this).prev().find($focusElms).removeAttr("tabindex");

  }

});
