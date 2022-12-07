/*!

  Radancy Pattern Library: Load More

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: jQuery

*/

(function() {

  // Display which Load More in use via console:

  console.log('%c Load More v1.0 in use. ', 'background: #6e00ee; color: #fff');

  var $loadMore = $(".load-more");
  var $loadMoreItem = $(".load-more__item");
  var $loadMoreMsg = $(".load-more__msg");
  var loadMoreBtnTxt = "Load More";
  var loadMoreBtnFin = "All Done!";
  var loadMoreNewItemTxt =  " new items have been loaded.";
  var loadMoreNewItemSingleTxt =  " new item has been loaded.";
  var loadMoreComplete = "All content has been loaded.";
  var loadMoreDelay = 500;
  var loadMoreDefault = 3;

  // Hide all items after nth item

  $loadMore.each(function(e) {

    if ($(this).data("load-more-show")) {

      var loadMoreShow = $(this).data("load-more-show");

    } else {

      var loadMoreShow = loadMoreDefault;

    }

    $(this).find($loadMoreItem).slice(loadMoreShow).prop("hidden", "true");

  });

  // Add Button

  $loadMore.append("<button class='load-more__btn'>" + loadMoreBtnTxt + "</button>");

  // Apply button class to variable

  var $loadMoreBtn = $(".load-more__btn");

  // Button Action: Message

  $($loadMoreBtn).on("itemsDisplayed", function(e, totalCount){

    var $loadMoreItemsHidden = $(this).parent().find(".load-more__item[hidden]");

    if(!$loadMoreItemsHidden.length) {

      // Change button text when done

      $(this).prop("disabled", "true").text(loadMoreBtnFin);

      if (totalCount === 1) {

        $(this).parent().find($loadMoreMsg).html(totalCount + loadMoreNewItemSingleTxt + " " + loadMoreComplete);

      } else {

        $(this).parent().find($loadMoreMsg).html(totalCount + loadMoreNewItemTxt + " " + loadMoreComplete);

      }

    }

  });

  $loadMoreBtn.on("click", function() {

    // Get Hidden Item(s)

    var $loadMoreItemsHidden = $(this).parent().find(".load-more__item[hidden]");

    // Remove hidden attr on every group of nth item(s)

    if ($(this).parent().data("load-more-show")) {

      var itemsToLoad =  $(this).parent().data("load-more-show");

    } else {

      var itemsToLoad = loadMoreDefault;

    }

    var itemsToRemove = $loadMoreItemsHidden.slice(0, itemsToLoad);

    itemsToRemove.slice(0, itemsToLoad).removeAttr("hidden");

    var totalItems = itemsToRemove.length;

    var loadMoreTxt = totalItems + loadMoreNewItemTxt;

    $(this).parent().find($loadMoreMsg).html(loadMoreTxt);

    // In not knowing what kind of content may exist in item, we are applying temporary focus to item itself.
    // Question: Is it better to apply focus here or keep focus on the 'Load More' button itself, allowing
    // keyboard user to navigate through newly revealed items?
    // Also, is it better to put focus on item or first focusable element within item?
    // TODO: More research will be required.

  //  $loadMoreItemsHidden.first().attr("tabindex", "-1").focus();

    var $focusElms = "a, audio, button, input, select, video";

    $loadMoreItemsHidden.find($focusElms).first().focus();

    $(this).trigger("itemsDisplayed", [totalItems]);

    // Remove message
    // Note: Message needs to be removed so we can add it again
    // when loading next selection of items.

    setTimeout(function(){

      $loadMoreMsg.empty();

    }, loadMoreDelay);

  });

})();