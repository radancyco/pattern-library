/*!

  Radancy: Animation Control (AC)

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

  TODO: We may need way to load in smaller videos on mobile using MatchMedia. Rather than use divs, will just add data-animation-mobile to video element to swap source with.

*/

(function() {

  "use strict";

  // Display which component in use via console:

  console.log('%c Animation Control v1.1 in use. ', 'background: #6e00ee; color: #fff');

  // Animation variables

  var acButtonClassName = "ac__button"
  var acButtonLabel = "Pause Animation";
  var acClass = ".ac";
  var acCookieName = "AnimationPaused";
  var acEnabledClassName = "animation-enabled"
  var acMediaClass = ".ac__video";
  var animationBody = document.body;
  var animationControls = document.querySelectorAll(acClass);
  var backgroundVideos = document.querySelectorAll(acMediaClass);
  var lazyLoadClassName = "lazy-load";

  // Used to retrieve cookie and pause all video if present.

  function getCookie(name) {

    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
    
  }

  // Get cookie on initial load.

  var animationPaused = getCookie(acCookieName);

  // Used to set and remove cookie.

  function setCookie(state) {

    if (location.protocol === "https:") {

      // Secure environments require secure cookies.

      document.cookie = acCookieName + "=" + state + "; Secure; SameSite=None; path=/";

    } else {

      document.cookie = acCookieName + "=" + state + "; path=/";

    }

  }

  // If animation disabled in OS settings and cookie not present, set cookie.

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    if(animationPaused === null) {

      setCookie("true");

      var animationPaused = getCookie(acCookieName);

    }

  }

  // For each animation control...

  animationControls.forEach(function(control){

    // Create pause button.

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", acButtonLabel);
    btnPlayPause.classList.add(acButtonClassName);

    // Check to see if cookie is false or null.

    if(animationPaused === "false" || animationPaused === null) {

      // Set aria-pressed to false.

      btnPlayPause.setAttribute("aria-pressed", "false");

      // Remove animation enabled class from body.

      animationBody.classList.add(acEnabledClassName);

    } else {

      // Set aria-pressed to true.

      btnPlayPause.setAttribute("aria-pressed", "true");

      // Add animation enabled class to body.
        
      animationBody.classList.remove(acEnabledClassName);

    }

    // Append pause button.
    
    control.prepend(btnPlayPause);
    
    // Pause Toggle Event

    btnPlayPause.addEventListener("click", function() {

      var animationToggles = document.querySelectorAll("." + acButtonClassName);

      if (this.getAttribute("aria-pressed") === "false") {

        // Remove animation enabled class from body.

        animationBody.classList.remove(acEnabledClassName);

        // Set cookie to true.

        setCookie("true");

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
        
        animationBody.classList.add(acEnabledClassName);

        // Set cookie to false.

        setCookie("false");

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

  // Lazy Load Video (Optional)
  // Usage:  Add lazy-load class to video element. Replace "src" with "data-src" attribute on "source" element.

  function lazyLoadVideos() {

    document.addEventListener("DOMContentLoaded", function() {

      var lazyVideos = [].slice.call(backgroundVideos);
  
      if ("IntersectionObserver" in window) {
  
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
  
          entries.forEach(function(video) {
  
            if (video.isIntersecting) {
  
              for (var source in video.target.children) {
  
                var videoSource = video.target.children[source];
  
                if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
  
                  videoSource.src = videoSource.dataset.src;
  
                }
  
              }
  
              video.target.load();
              
              video.target.classList.remove(lazyLoadClassName);
  
              lazyVideoObserver.unobserve(video.target);
  
            }
  
          });
  
        });
  
        lazyVideos.forEach(function(lazyVideo) {
  
          lazyVideoObserver.observe(lazyVideo);
  
        });
  
      }
  
    });

  }

  // On page load, loop through all the videos on the page.

  backgroundVideos.forEach(function(video){

      // If cookie is false or null, play video(s).

      if(animationPaused === "false" || animationPaused === null) {

        video.autoplay = true;

      }

      // Lazy Load Videos if data-src present

      if (video.querySelector("source").hasAttribute("data-src")) {

        lazyLoadVideos();

      }

  });

})();