/*!

  Radancy Pattern Library: Disclosure v1.1

  Contributor(s):
  Andrew Hill, Email: andrew.hill@radancy.com

*/

var getExpanders = document.querySelectorAll(".disclosure--btn");
var getContent = document.querySelectorAll(".disclosure--content");

var simpleExpander = {

  init: function(){

    console.log('%c Disclosure v1.2 in use. ', 'background: #6e00ee; color: #fff');

    // Add Listener and other needed attributes to disclosure button

    getExpanders.forEach(function(disclosure, i){

      var int = i + 1;

      disclosure.setAttribute("aria-expanded", "false");

      if(disclosure.hasAttribute("id")){

        var thisButtonID = disclosure.getAttribute("id");
        var thisContentID = thisButtonID + "-content";

      } else {

        var thisButtonID = "disclosure-btn-" + int;
        var thisContentID = "disclosure-content-" + int;

      }

      disclosure.setAttribute("id", thisButtonID);
      disclosure.setAttribute("aria-controls", thisContentID);

      if(disclosure.parentElement.classList.contains("disclosure--heading")) {

        disclosure.parentElement.nextElementSibling.setAttribute("id", thisContentID);

      } else {

        disclosure.nextElementSibling.setAttribute("id", thisContentID);

      }

      // Prep each content area.

      getContent.forEach(function(content, e){

        content.setAttribute("role", "group");

      });

      if(disclosure.hasAttribute("data-disclosure-icon")){

        disclosure.insertAdjacentHTML('beforeend', ' <span class="disclosure--icon" aria-hidden="true"></span>');

      }

      disclosure.addEventListener("click", simpleExpander.clicked);

     });

     // Open selected disclosure via URL

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
