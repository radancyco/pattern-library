/*!

  Radancy Pattern Library: Disclosure v1.0

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

*/

var getExpanders = document.getElementsByClassName("disclosure--btn");
var simpleExpander = {

  init: function(){

    console.log('%c Disclosure v1.1 in use. ', 'background: #6e00ee; color: #fff');

    // Add Listener and other needed attributes

    var i = 0;

    for (i = 0; i < getExpanders.length; i++) {

      var thisButtonText = getExpanders[i].textContent;

      getExpanders[i].setAttribute("aria-expanded", "false");
      getExpanders[i].addEventListener("click", simpleExpander.clicked);

      if(getExpanders[i].hasAttribute("data-label-close")){

        getExpanders[i].setAttribute("aria-label", thisButtonText);

      }

      if(getExpanders[i].hasAttribute("data-disclosure-icon")){

        getExpanders[i].insertAdjacentHTML('beforeend', ' <span class="disclosure--icon" aria-hidden="true"></span>');

      }

    }

    // Show content if hash in URL matches ID on button.

    if(getExpanders.length) {

      var url = document.location.href;
      var hash = url.split("#");
      $("#" + hash[1] + ".disclosure--btn").attr("aria-expanded", "true");

    }

  }, clicked: function(){

    // Run Event

    var isActive = this.getAttribute("aria-expanded");
    var labelOpen = this.getAttribute("aria-label");
    var labelClose = this.getAttribute("data-label-close");

    if (isActive == "true") {

      // Active

      this.setAttribute("aria-expanded", "false");

      if(labelOpen) {

        this.textContent = labelOpen;

      }

    } else {

      // Not Active

      this.setAttribute("aria-expanded", "true");

      if(labelClose) {

        this.textContent = labelClose;

      }

    }

  }

}

if(getExpanders){

  simpleExpander.init();

}
