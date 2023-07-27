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
  // Important: For labels such as atPauseButtonLabel, atAudioDescriptionLabel and atVideoLabel, do not forget to translate on multi-language sites.

  var animationBody = document.body;
  var atAudioDescriptionClassName = "animation-toggle__audio";
  var atClass = ".animation-toggle";
  var atCookieName = "AnimationPaused";
  var atDescriptionTrackClass = ".animation-toggle__track";
  var atEnabledClassName = "animation-enabled"
  var atPauseButtonClassName = "animation-toggle__pause";
  var atPauseButtonClass = "." + atPauseButtonClassName;
  var atPauseButtonLabel = "Pause Animation";
  var atVideoClass = ".animation-toggle__video";
  var atVideoControlsName = "animation-toggle__controls"
  var atVideoLabel = "Background Animation";
  var dataLargeViewport = "data-large-viewport";
  var dataPauseButton = "data-pause-button";
  var dataVideoBreakPoint = "data-media";
  var lazyLoadClassName = "lazy-load";
  var lazyLoadClass = "." + lazyLoadClassName;
  var getAnimationWrappers = document.querySelectorAll(atClass);
  var getBackgroundVideos = document.querySelectorAll(atVideoClass);
  var getLazyLoadClass = document.querySelectorAll(lazyLoadClass);

  // Used to retrieve cookie and pause video(s) if present.

  function getCookie(name) {

    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
    
  }

  // Assign cookie to variable on page load.

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

  // If animation disabled in OS settings and cookie not present, force pause.

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    if(animationPaused === null) {

      setCookie("true");

      var animationPaused = getCookie(atCookieName);

    }

  }

  // For each animation wrapper...

  getAnimationWrappers.forEach(function(wrapper){

    // Create control wrapper.

    var btnControls = document.createElement("div");

    btnControls.setAttribute("class", atVideoControlsName);

    // Append control wrapper.
    
    wrapper.append(btnControls);

    // Create pause button.

    var btnPlayPause = document.createElement("button");

    // See if wrapper contains custom pause button value; use over default if true.

    if(wrapper.hasAttribute(dataPauseButton)) {

      btnPlayPause.setAttribute("aria-label", wrapper.getAttribute(dataPauseButton));

    } else {

      btnPlayPause.setAttribute("aria-label", atPauseButtonLabel);

    }

    // Add class to pause button.

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

        // Note: https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error/37172024#37172024

        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;

        if(!isPlaying) {

          video.play();

        } else {

          video.pause();

        }
              
      });

    });

    if (wrapper.querySelector("track") !== null) {

      // Create audio description button 

      var btnAudioDescription = document.createElement("button");

      btnAudioDescription.setAttribute("class", atAudioDescriptionClassName);

      // Append pause button

      btnControls.append(btnAudioDescription);

      // Pause Toggle Event

      btnAudioDescription.addEventListener("click", function() {

        var thisVideo = wrapper.querySelector(atVideoClass);
        var thisDescription = wrapper.querySelector(atDescriptionTrackClass)

        thisDescription.classList.toggle("active");

        if (thisVideo.textTracks) {

          var track = thisVideo.textTracks[0];
          track.mode = "hidden";
      
          track.oncuechange = function(e) {
      
            var cue = this.activeCues[0];
      
            if(cue) {
      
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

  function loadVideo(obj) {

    // If animation class on body exists...

    if (animationBody.classList.contains(atEnabledClassName)) {

      obj.play();
 
     } else { 
 
       obj.load();
 
     }

  }

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

  // Video Breakpoint Support

  // Create array to store all video brakpoints in.

  var videoBreakPoints = [];

  // Loop through each video...

  getBackgroundVideos.forEach(function(video){

    // Get each breakpoint in video

    var videoBreakpoint = video.getAttribute(dataVideoBreakPoint);

    // Store each breakpoint in array (videoBreakPoints) for later use by matchMedia.

    videoBreakPoints.push(window.matchMedia(videoBreakpoint));

  });

  function videoViewPort() {

    // On page load, loop through all the videos on the page.

    getBackgroundVideos.forEach(function(video, i){

      // If aria-label does not exist on video, add default. 

      if(!video.hasAttribute("aria-label")) {

        video.setAttribute("aria-label", atVideoLabel);

      }

      if(video.hasAttribute(dataVideoBreakPoint)) {

        var largeViewportSource = video.getAttribute(dataLargeViewport);
        var smallViewportSource = video.querySelector("source").getAttribute("src");

        if (videoBreakPoints[i].matches) {

          // Large Viewport Video

          video.setAttribute("src", largeViewportSource);

        } else { 

          // Small Viewport Video (Default)

          video.setAttribute("src", smallViewportSource);

        }

        // Load video

        loadVideo(video);
       
      }  else { 

        // Load video

        loadVideo(video);

      }

    });

  }

  // Initiate videoViewPortChange function when viewport is resized.

  videoBreakPoints.forEach(function(breakpoints){

    breakpoints.addEventListener("change", videoViewPort);
  
  });
  
  // Initiate on page load.
  
  videoViewPort();

})();