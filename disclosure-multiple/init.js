/*!

  Radancy Pattern Library: Multiple Disclosures v1.0

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

  Dependencies: jQuery

*/

var prodAccordion = {

  init: function(){

    var setupIDs = 0;
    var useThis = "";

    // setup each FAQ to be independent

    $(".disclosure-multiple").each(function(){

      if($(this).attr("id")){

        useThis = $(this).attr("id");

      } else{

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

  }, toggleAll: function(e){

    var curID = $(e).attr("data-acc-id");
    var expandBtn = $(e).attr("aria-pressed");

    if(expandBtn === "false"){

      $("#" + curID + " .disclosure-multiple__navigation__button").attr("aria-pressed","true");
      $("#" + curID + " .disclosure-multiple__button").attr("aria-expanded","true");

    } else{

      $("#" + curID + " .disclosure-multiple__navigation__button").attr("aria-pressed","false");
      $("#" + curID + " .disclosure-multiple__button").attr("aria-expanded","false");

    }

  }, toggleSection: function(e){

    var curState = $(e).attr("aria-expanded");

    if(curState === "true"){

      $(e).attr("aria-expanded","false");

    } else{

      $(e).attr("aria-expanded","true");

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

    } else {

      // ???

    }

  }

}

// FE code

if($(".disclosure-multiple").length){

  prodAccordion.init();

}
