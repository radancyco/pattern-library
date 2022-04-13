/*!

  Radancy Pattern Library: Multiple Disclosures v1.1

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

  Dependencies: jQuery

*/

var prodAccordion = {

  init: function(){

    console.log('%c Multiple Disclosure v1.1 in use. ', 'background: #6e00ee; color: #fff');

    // setup each FAQ to be independent

    $(".disclosure-multiple").each(function(e){

      var setupIDs = e + 1;
      var useThis = "";

      if($(this).attr("id")){

        useThis = $(this).attr("id");

      } else {

        useThis = "prod-acc-" + setupIDs;
        $(this).attr("id","prod-acc-" + setupIDs);

      }

      var getID = "#" + useThis;

      $(getID + " button").attr("data-acc-id", useThis);

    });

    $(".disclosure-multiple__button").attr('aria-expanded', 'false').on("click",function(){

      var e = $(this);
      prodAccordion.toggleSection(e);

    });



    $(".disclosure-multiple__navigation__button").attr('aria-pressed', 'false').on("click",function(){

      var e = $(this);
      prodAccordion.toggleAll(e);

    });

    $(".disclosure-multiple").each(function(){

      $(this).find(".disclosure-multiple__button").each(function(e){

        // Include Visual Affordance

        var disclosureIcon = $(this).parent().parent().parent().attr('data-disclosure-multiple-icon');

        if (typeof disclosureIcon !== 'undefined' && disclosureIcon !== false) {

          $(this).append(' <span class="disclosure-multiple--icon" aria-hidden="true"></span>');

        }

        // Have one section opened by default.

        $(this).attr("data-button-id", e + 1);

        var disclosureOpen = $(this).parent().parent().parent().attr('data-disclosure-multiple-open');

        if (typeof disclosureOpen !== 'undefined' && disclosureOpen !== false) {

          if($(this).data("button-id") == disclosureOpen){

            $(this).attr("aria-expanded", "true");
            $(this).parent().addClass("disclosure-multiple__list__item--open");

          }

        }

      });

    });

  }, toggleAll: function(e){

    var curID = $(e).attr("data-acc-id");
    var expandBtn = $(e).attr("aria-pressed");

    if(expandBtn === "false"){

      $("#" + curID + " .disclosure-multiple__navigation__button").attr("aria-pressed","true");
      $("#" + curID + " .disclosure-multiple__button").attr("aria-expanded","true");
      $("#" + curID + " .disclosure-multiple__list__item").addClass("disclosure-multiple__list__item--open");

    } else {

      $("#" + curID + " .disclosure-multiple__navigation__button").attr("aria-pressed","false");
      $("#" + curID + " .disclosure-multiple__button").attr("aria-expanded","false");
      $("#" + curID + " .disclosure-multiple__list__item").removeClass("disclosure-multiple__list__item--open");

    }

  }, toggleSection: function(e){

    var curState = $(e).attr("aria-expanded");

    if(curState === "true"){

      $(e).attr("aria-expanded","false");
      $(e).parent().removeClass("disclosure-multiple__list__item--open");

    } else{

      $(e).attr("aria-expanded","true");
      $(e).parent().addClass("disclosure-multiple__list__item--open");

    }

    prodAccordion.fireAnalytics(e);

  }, fireAnalytics: function(e){

    // fire a GA event based on it being opened or closed

    if(!$(e).hasClass('.disclosure-multiple__navigation__button')){

      if($(e).attr("data-custom-label")){

        var curState = $(e).attr("aria-expanded");
        curState == "false" ? curState = " - closed" : curState = " - opened";

        var labelValue = $(e).attr("data-custom-label") + curState;
        var catValue = $(e).attr("data-custom-category");

        console.log("Would send: Click - " + catValue + " - " + labelValue);

      }

    }

  }

}

// FE code

if($(".disclosure-multiple").length){

  prodAccordion.init();

}
