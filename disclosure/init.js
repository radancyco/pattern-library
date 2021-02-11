/*!

  Radancy Pattern Library: Disclosure v1.0

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

*/

var getExpanders = document.getElementsByClassName("prod-expander");
var simpleExpander = {
  init: function(){
    console.log("got here");
    // add listener
    var i = 0;
    for (i = 0; i < getExpanders.length; i++) {
      getExpanders[i].addEventListener("click", simpleExpander.clicked);
    }
  },
  clicked: function(){
    // run click event
    var isActive = this.getAttribute("aria-expanded");
    var labelOpen = this.getAttribute("data-label-open");
    var labelClose = this.getAttribute("data-label-close");
    if (isActive == "true") {
      // active
      this.setAttribute("aria-expanded", "false");
      if( labelOpen.trim() ) {
        this.innerHTML = labelOpen;
      }
    } else {
      // not active
      this.setAttribute("aria-expanded", "true");
      if( labelClose.trim() ) {
        this.innerHTML = labelClose;
      }
    }
  }
}
if(getExpanders){
  simpleExpander.init();
}
