/*!

  Radancy: Animation Toggle

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

  TODO: We may need way to load in smaller videos on mobile using MatchMedia. Rather than use divs, will just add data-animation-mobile to video element to swap source with.

*/

(function() {

  "use strict";

  // Display which component in use via console:

  console.log('%c Animation Toggle v1.1 in use. ', 'background: #6e00ee; color: #fff');

  // Animation variables

  var atButtonClassName = "animation-toggle__button"
  var atButtonLabel = "Pause Animation";
  var atClass = ".animation-toggle";
  var atCookieName = "AnimationPaused";
  var atEnabledClassName = "animation-enabled"
  var atMediaClass = ".animation-toggle__video";
  var animationBody = document.body;
  var animationControls = document.querySelectorAll(atClass);
  var backgroundVideos = document.querySelectorAll(atMediaClass);
  var lazyLoadClassName = "lazy-load";

  // Used to retrieve cookie and pause all video if present.

  function getCookie(name) {

    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
    
  }

  // Get cookie on initial load.

  var animationPaused = getCookie(atCookieName);

  // Used to set and remove cookie.

  function setCookie(state) {

    if (location.protocol === "https:") {

      // Secure environments require secure cookies.

      document.cookie = atCookieName + "=" + state + "; Secure; SameSite=None; path=/";

    } else {

      document.cookie = atCookieName + "=" + state + "; path=/";

    }

  }

  // If animation disabled in OS settings and cookie not present, set cookie.

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    if(animationPaused === null) {

      setCookie("true");

      var animationPaused = getCookie(atCookieName);

    }

  }

  // For each animation control...

  animationControls.forEach(function(control){

    // Create pause button.

    var btnPlayPause = document.createElement("button");
    btnPlayPause.setAttribute("aria-label", atButtonLabel);
    btnPlayPause.classList.add(atButtonClassName);

    // Check to see if cookie is false or null.

    if(animationPaused === "false" || animationPaused === null) {

      // Set aria-pressed to false.

      btnPlayPause.setAttribute("aria-pressed", "false");

      // Remove animation enabled class from body.

      animationBody.classList.add(atEnabledClassName);

    } else {

      // Set aria-pressed to true.

      btnPlayPause.setAttribute("aria-pressed", "true");

      // Add animation enabled class to body.
        
      animationBody.classList.remove(atEnabledClassName);

    }

    // Append pause button.
    
    control.append(btnPlayPause);
    
    // Pause Toggle Event

    btnPlayPause.addEventListener("click", function() {

      var animationToggles = document.querySelectorAll("." + atButtonClassName);

      if (this.getAttribute("aria-pressed") === "false") {

        // Remove animation enabled class from body.

        animationBody.classList.remove(atEnabledClassName);

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
        
        animationBody.classList.add(atEnabledClassName);

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
  // Usage:  Add lazy-load class to video element. Replace 'src' with 'data-src' attribute on 'source' element.

  function lazyLoadVideos() {

    document.addEventListener("DOMContentLoaded", function() {

      var lazyVideos = [].slice.call(document.querySelectorAll("." + lazyLoadClassName));
  
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

      // Lazy Load Videos if class present

      if (video.classList.contains(lazyLoadClassName)) {

        lazyLoadVideos();

      }

  });

})();