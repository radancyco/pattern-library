/*!

  Radancy: Animation Toggle

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  "use strict";

  // Display which component in use via console:

  console.log('%c Animation Toggle v1.1 in use. ', 'background: #6e00ee; color: #fff');

  // Animation variables
  // Note: For labels such as atButtonLabel and atVideoLabel, do not forget to translate on multi-language sites.

  var atPauseButtonClassName = "animation-toggle__pause";
  var atPauseButtonClass = "." + atPauseButtonClassName;
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

    // Create control container.

    var btnControls = document.createElement("div");

    btnControls.setAttribute("class", "animation-toggle__controls");

    // Append control div.
    
    control.append(btnControls);

    // Create pause button.

    var btnPlayPause = document.createElement("button");

    if(control.hasAttribute(dataPauseButton)) {

      btnPlayPause.setAttribute("aria-label", control.getAttribute(dataPauseButton));

    } else {

      btnPlayPause.setAttribute("aria-label", atButtonLabel);

    }

    btnPlayPause.classList.add(atPauseButtonClassName);

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

    // Append pause button

    btnControls.append(btnPlayPause);
    
    // Pause Toggle Event

    btnPlayPause.addEventListener("click", function() {

      var getAtPauseButtonClass = document.querySelectorAll(atPauseButtonClass);

      var animationPauseToggles = getAtPauseButtonClass;

      if (this.getAttribute("aria-pressed") === "false") {

        // Remove animation enabled class from body.

        animationBody.classList.remove(atEnabledClassName);

        // Set cookie to true.

        setCookie("true");

        // Get all pause buttons on page and set them to true. 

        animationPauseToggles.forEach(function(button){

          button.setAttribute("aria-pressed", "true");

        });

      } else {

        // Add animation enabled class to body.
        
        animationBody.classList.add(atEnabledClassName);

        // Set cookie to false.

        setCookie("false");

        // Get all pause buttons on page and set them to false. 

        animationPauseToggles.forEach(function(button){

          button.setAttribute("aria-pressed", "false");
        
        });

      }

      // Toggle Video Playback

      getBackgroundVideos.forEach(function(video){

        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;

        // Note: https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error/37172024#37172024

        if(!isPlaying) {

          video.play();

        } else {

          video.pause();

        }
              
      });

    });

    if (control.querySelector("track") !== null) {

      // Create audio description button 

      var btnAudioDescription = document.createElement("button");

      btnAudioDescription.setAttribute("class", "animation-toggle__audio");

      // Append pause button

      btnControls.append(btnAudioDescription);

      // Pause Toggle Event

      btnAudioDescription.addEventListener("click", function() {


        var thisVideo = control.querySelector(atMediaClass);
        var thisDescription = control.querySelector(".animation-toggle__description")

        // alert(thisVideo);

        
        thisDescription.classList.toggle("active");

        if (thisVideo.textTracks) {

          var track = thisVideo.textTracks[0];
          track.mode = "hidden";
      
          track.oncuechange = function(e) {
      
            var cue = this.activeCues[0];
      
            if (cue) {
      
              thisDescription.innerHTML = "";
              thisDescription.appendChild(cue.getCueAsHTML());
      
              var Message = thisDescription.textContent;
              var msg = new SpeechSynthesisUtterance(Message);
      
              window.speechSynthesis.speak(msg);
      
            }
      
          }

        }
      
      });

    }
  
  });

  // On page load, loop through all the videos on the page.

  getBackgroundVideos.forEach(function(video){

    if(!video.hasAttribute("aria-label")) {

      video.setAttribute("aria-label", atVideoLabel);

    }

    // If animation class on body exists...

    if (animationBody.classList.contains(atEnabledClassName)) {

      video.play();

    } else { 

      video.load();

    }

  });

  // Video Lazy Load (Optional)

  function videoLazyLoad() {

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

              if (animationBody.classList.contains(atEnabledClassName)) {

                video.target.play();
        
              }
              
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

  // Initiate on page load.

  videoLazyLoad();

  // Video Breakpoint Support (Optional)

  // Create array to store all video brakpoints in.

  var videoBreakPoints = [];

  // Loop through each video...

  getBackgroundVideos.forEach(function(video){

    // Get each breakpoint in video

    var videoBreakpoint = video.getAttribute(dataVideoBreakPoint);

    // Store each breakpoint in array (videoBreakPoints) for later use by matchMedia.

    videoBreakPoints.push(window.matchMedia(videoBreakpoint));

  });

  function videoViewPortChange() {

    getBackgroundVideos.forEach(function(video, i){

      if(video.hasAttribute(dataVideoBreakPoint)) {

        var largeViewportSource = video.getAttribute("data-large-viewport");
        var smallViewportSource = video.querySelector("source").getAttribute("src");

        if (videoBreakPoints[i].matches) {

          // Large Viewport Video

          video.setAttribute("src", largeViewportSource);

        } else { 

          // Small Viewport Video (Default)

          video.setAttribute("src", smallViewportSource);

        }

        video.load();
       
        // If animation class on body exists...

        if (animationBody.classList.contains(atEnabledClassName)) {

          video.play();

        }

      }

    });

  }

  // Initiate videoViewPortChange function when viewport is resized.

  videoBreakPoints.forEach(function(breakpoints){

    breakpoints.addEventListener("change", videoViewPortChange);
  
  });
  
  // Initiate on page load.
  
  videoViewPortChange();

})();