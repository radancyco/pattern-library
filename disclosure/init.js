/*!

  Radancy Pattern Library: Disclosure v1.0

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

*/

var getExpanders = document.getElementsByClassName("disclosure--btn");
var simpleExpander = {

  init: function(){

    console.log("got here");

    // add listener

    var i = 0;

    for (i = 0; i < getExpanders.length; i++) {

      var thisButtonText = getExpanders[i].textContent;

      getExpanders[i].setAttribute("aria-expanded", "false");
      getExpanders[i].addEventListener("click", simpleExpander.clicked);

      if(getExpanders[i].hasAttribute("data-label-close")){

        getExpanders[i].setAttribute("aria-label", thisButtonText);
        getExpanders[i].setAttribute("data-label-open", thisButtonText);

      }

    }

  }, clicked: function(){

    // run click event

    var isActive = this.getAttribute("aria-expanded");
    var labelOpen = this.getAttribute("data-label-open");
    var labelClose = this.getAttribute("data-label-close");

    if (isActive == "true") {

      // active

      this.setAttribute("aria-expanded", "false");

      if( labelOpen.trim() ) {

        this.textContent = labelOpen;

      }

    } else {

      // not active

      this.setAttribute("aria-expanded", "true");

      if( labelClose.trim() ) {

        this.textContent = labelClose;

      }

    }

  }

}

if(getExpanders){

  simpleExpander.init();

}
