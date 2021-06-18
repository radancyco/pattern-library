/*!

  Radancy Pattern Library: Floating Labels

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

*/

// Example 2: Outer Float

var searchFormField = document.querySelectorAll(".search-form-fields input:not([type=submit]), .search-form-fields select");
var locationField = document.getElementsByClassName("search-location");
var radiusField = document.getElementsByClassName("search-radius");
var searchForm = document.getElementsByClassName("search-form");

for (var i = 0; i < searchFormField.length; i++) {

  searchFormField[i].addEventListener("focus", function(){

    this.classList.add("has-focus");

  });

  searchFormField[i].addEventListener("blur", function(){

    this.classList.remove("has-focus");

    if (this.value !== "") {

       this.classList.add("has-text");

    } else {

      this.classList.remove("has-text");

    }

  });

}

for (var i = 0; i < locationField.length; i++) {

  locationField[i].addEventListener("blur", function(){

    if(this.value !== "") {

      this.parentNode.nextElementSibling.querySelector("select").classList.add("has-text");

    } else {

      this.parentNode.nextElementSibling.querySelector("select").classList.remove("has-text");

    }

  });

}

function checkSearchFormFields() {

  for (var i = 0; i < searchFormField.length; i++) {

    if (searchFormField[i].value !== "") {

       searchFormField[i].classList.add("has-text");

    }

  }

}

checkSearchFormFields();
