/*!

  Radancy: Animation Control (AC)

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  "use strict";

  // Display which component in use via console:

  console.log('%c Animation Control v1.0 in use. ', 'background: #6e00ee; color: #fff');

  // Animation variables

  var $acClass = ".ac";
  var $acMediaClass = ".ac__video";
  var $acButtonClassName = "ac__button"
  var $acButtonLabel = "Pause Animation";
  var $acEnabledClassName = "animation-enabled"
  var $acCookieName = "AnimationPaused";
  var animationBody = document.body;
  var animationPaused = getCookie($acCookieName);
  var animationControls = document.querySelectorAll($acClass);
  var backgroundVideos = document.querySelectorAll($acMediaClass);

  // Used to retrieve cookie and pause all video if present.

  function getCookie(name) {

    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
    
  }

  // Used to set and remove cookie

  function toggleCookie(value) {

    if(value === true) {

      if (location.protocol === "https:") {

        document.cookie = $acCookieName + "=true; Secure; SameSite=None; path=/";

      } else {

        document.cookie = $acCookieName + "=true; path=/";

      }

    } else {

      document.cookie = $acCookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    }

  }

  // For each Animation Control

  animationControls.forEach(function(control){

    // Create Pause Button

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", $acButtonLabel);
    btnPlayPause.classList.add($acButtonClassName);

    // Check OS settings first to see if user has disabled animation...

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

       // ... and check to see if cookie present.

      if(animationPaused !== null) {

        // If cookie present, set aria-pressed to true.

        btnPlayPause.setAttribute("aria-pressed", "true");

        // Add animation enabled class to body.

        animationBody.classList.remove($acEnabledClassName);

      } else {

        // If cookie not present, set aria-pressed to false.

        btnPlayPause.setAttribute("aria-pressed", "false");

        // Remove animation enabled class from body.

        animationBody.classList.add($acEnabledClassName);

      }

      // Append Pause Button
    
      control.prepend(btnPlayPause);

    } 
    
    // Pause Button Toggle Event

    btnPlayPause.addEventListener("click", function() {

      var animationToggles = document.querySelectorAll("." + $acButtonClassName);

      if (this.getAttribute("aria-pressed") === "false") {

        // Remove animation enabled class from body.

        animationBody.classList.remove($acEnabledClassName);

        // Add cookie

        toggleCookie(true);

        // Get all pause buttons on page and set them to true. 

        animationToggles.forEach(function(button){

          button.setAttribute("aria-pressed", "true");

        });

        // Pause video(s) on page.

        backgroundVideos.forEach(function(video) {

          video.pause();

        });

      } else {

        // Add animation enabled class to body.
        
        animationBody.classList.add($acEnabledClassName);

        // Remove cookie.

        toggleCookie();

        // Get all pause buttons on page and set them to false. 

        animationToggles.forEach(function(button){

          button.setAttribute("aria-pressed", "false");
        
        });

        // Play video(s) on page.

        backgroundVideos.forEach(function(video){

          video.play();
  
        });

      }

    });

  });

  // On page load, loop through all the videos on the page.

  backgroundVideos.forEach(function(video){

    // Check OS settings first to see if user has disabled animation...

    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

      // ... and check to see if cookie present. If cookie not present, play video(s).

      if(animationPaused === null) {

        video.autoplay = true;

      }

    }

  });

})();