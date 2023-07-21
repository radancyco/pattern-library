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
  // Note: For labels such as atButtonLabel and atVideoLabel, do not forget to translate on multi-language sites.

  var atButtonClassName = "animation-toggle__button";
  var atButtonClass = "." + atButtonClassName;
  var atButtonLabel = "Pause Animation";
  var atClass = ".animation-toggle";
  var atCookieName = "AnimationPaused";
  var atEnabledClassName = "animation-enabled"
  var atMediaClass = ".animation-toggle__video";
  var atVideoLabel = "Background Animation";
  var animationBody = document.body;
  var dataPauseButton = "data-pause-button";
  var dataVideoBreakPoint = "data-media";
  var lazyLoadClassName = "lazy-load";
  var lazyLoadClass = "." + lazyLoadClassName;
  var getAnimationToggles = document.querySelectorAll(atClass);
  var getBackgroundVideos = document.querySelectorAll(atMediaClass);
  var getLazyLoadClass = document.querySelectorAll(lazyLoadClass);

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

  getAnimationToggles.forEach(function(control){

    // Create pause button.

    var btnPlayPause = document.createElement("button");

    if(control.hasAttribute(dataPauseButton)) {

      btnPlayPause.setAttribute("aria-label", control.getAttribute(dataPauseButton));

    } else {

      btnPlayPause.setAttribute("aria-label", atButtonLabel);

    }

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

      var getAtButtonClass = document.querySelectorAll(atButtonClass);

      var animationToggles = getAtButtonClass;

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

        getBackgroundVideos.forEach(function(video) {

          video.pause();

          // Only need this for lazly loading videos in hidden divs.

          if (video.classList.contains(lazyLoadClassName)) {

            video.autoplay = false;

          }

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

        getBackgroundVideos.forEach(function(video){

          video.play();

          // TODO: https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error/37172024#37172024
  
        });

      }

    });

  });

  // Lazy Load Video (Optional)
  // Usage:  Add .lazy-load class to video element. Replace 'src' with 'data-src' attribute on 'source' element.

  function lazyLoadVideos() {

    document.addEventListener("DOMContentLoaded", function() {

      var lazyVideos = [].slice.call(getLazyLoadClass);
  
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

  getBackgroundVideos.forEach(function(video){

      if(!video.hasAttribute("aria-label")) {

        video.setAttribute("aria-label", atVideoLabel);

      }

      // If animation class on body exists...

      if (animationBody.classList.contains(atEnabledClassName)) {

        video.autoplay = true;

      }

      // Lazy Load Videos if class present

      if (video.classList.contains(lazyLoadClassName)) {

        lazyLoadVideos();

      }

  });


  // Test




  // Create an array to store each TabCordions breakpoint in,
  // which we will loop through later...

  var videoBreakPoints = [];

  // loop through each TabCordion...

  getBackgroundVideos.forEach(function(video){

    // Get each TabCordion breakpoint...

    var videoBreakpoint = video.getAttribute(dataVideoBreakPoint);

    // Store each breakpoint in array (above) for later use by matchMedia.

    videoBreakPoints.push(window.matchMedia(videoBreakpoint));

  });


  function viewPortChange() {

    getBackgroundVideos.forEach(function(video, i){

      if(video.hasAttribute(dataVideoBreakPoint)) {

        var largeVideo = video.getAttribute("data-large-viewport");
        var smallVideo = video.querySelector("source").getAttribute("src");

        if (videoBreakPoints[i].matches) {

          //desktop

          video.setAttribute("src", largeVideo);


        } else { 

          // mobile

          video.setAttribute("src", smallVideo);


        }

        video.load();

      }

    });


  }

   // Initiate viewPortWidth function when viewport is resized.

   videoBreakPoints.forEach(function(breakpoints){

    breakpoints.addEventListener("change", viewPortChange);

  });

   // Initiate tabCordions on page load.

   viewPortChange();

})();