/*!

  Radancy Component Library: Dialog

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  var dialogInit = document.querySelectorAll("button[data-dialog-src]");
var dialogClose = document.querySelectorAll("button[data-dialog-button]");
var dialog = document.querySelectorAll("dialog");

dialogInit.forEach(function(btn) {
    
  btn.addEventListener("click", function() {
    
    var targetDialog = document.getElementById(this.getAttribute("data-dialog-src"));

    targetDialog.showModal();
  
   });
    
});

// Close Button 

dialogClose.forEach(function(btn) {
    
  btn.addEventListener("click", function() {
    
    var targetDialog = this.closest("dialog");

    targetDialog.close();

    stopVideo(targetDialog); // May need if statement here for non-vids
  
   });
    
});

// Kill Video

var stopVideo = function(element) {

    var iframe = element.querySelector("iframe");
    var video = element.querySelector("video");

    if (iframe) {

        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;

    }

    if (video) {

        video.pause();

    }

};

// Experimental: Kill on click outside of dialog 

dialog.forEach(function(modal) {

  modal.addEventListener("click", function (event) {

    var rect = modal.getBoundingClientRect();
    var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);

    if (!isInDialog) {

      modal.close();
      stopVideo(modal);

    }

  });

});

})();
