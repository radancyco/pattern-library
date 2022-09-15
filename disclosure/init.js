/*!

  Radancy Pattern Library: Disclosure v1.1

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

*/

var getExpanders = document.getElementsByClassName("disclosure--btn");
var simpleExpander = {

  init: function(){

    console.log('%c Disclosure v1.2 in use. ', 'background: #6e00ee; color: #fff');

    // Add Listener and other needed attributes

    var i = 0;

    for (i = 0; i < getExpanders.length; i++) {

      var thisButtonText = getExpanders[i].textContent;

      getExpanders[i].setAttribute("aria-expanded", "false");

      getExpanders[i].addEventListener("click", simpleExpander.clicked);

      if(getExpanders[i].hasAttribute("data-disclosure-icon")){

        getExpanders[i].insertAdjacentHTML('beforeend', ' <span class="disclosure--icon" aria-hidden="true"></span>');

      }

    }

    // Show content if hash in URL matches ID on button.

    if(getExpanders.length) {

      var url = document.location.href;
      var hash = url.split("#");

      var disclosureID = document.getElementById(hash[1]);

      if(disclosureID) {

        if(disclosureID.parentElement.classList.contains("disclosure--heading")) {

          disclosureID.parentElement.classList.add("open");

        } else {

          disclosureID.classList.add("open");

        }

        disclosureID.setAttribute("aria-expanded", "true");

      }

    }

  }, clicked: function(){

    // Run Event

    var isActive = this.getAttribute("aria-expanded");

    if (isActive == "true") {

      // Not Active

      this.setAttribute("aria-expanded", "false");

      if(this.parentElement.classList.contains("disclosure--heading")) {

        this.parentElement.classList.remove("open");

      } else {

        this.classList.remove("open");

      }


    } else {

      // Active

      this.setAttribute("aria-expanded", "true");

      if(this.parentElement.classList.contains("disclosure--heading")) {

        this.parentElement.classList.add("open");

      } else {

        this.classList.add("open");

      }

    }

  }

}

if(getExpanders){

  simpleExpander.init();

}
