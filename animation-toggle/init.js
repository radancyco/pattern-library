/*!

  Radancy: Animation Toggle

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

  "use strict";

  // Display which component in use via console:

  console.log('%c Animation Toggle v1.2 in use. ', 'background: #6e00ee; color: #fff');

  // Animation variables

  var animationHTML = document.documentElement;
  var animationBody = document.body;
  var atAudioDescriptionClassName = "animation-toggle__audio";
  var atClass = ".animation-toggle";
  var atCookieName = "AnimationPaused";
  var atDescriptionTrackClass = ".animation-toggle__track";
  var atEnabledClassName = "animation-enabled"
  var atPauseButtonClassName = "animation-toggle__pause";
  var atPauseButtonClass = "." + atPauseButtonClassName;
  var atVideoClass = ".animation-toggle__video";
  var atVideoControlsName = "animation-toggle__controls"
  var dataAudioDescriptionButton = "data-audio-description-button";
  var dataMedia = "data-media";
  var dataPoster = "data-poster";
  var dataSrcSet = "data-srcset";
  var dataPauseButton = "data-pause-button";
  var getAnimationWrappers = document.querySelectorAll(atClass);
  var getBackgroundVideos = document.querySelectorAll(atVideoClass);

  // Translations

  var currentPageLanguage = animationHTML.getAttribute("lang");

  if(currentPageLanguage === "es") {

    var atAudioDescriptionLabel = "Audiodescripción";
    var atPauseButtonLabel = "Pausar animación";
    var atVideoLabel = "Animación de fondo";

  } else if (currentPageLanguage === "fr") {

    var atAudioDescriptionLabel = "Audiodescription";
    var atPauseButtonLabel = "Suspendre l'animation";
    var atVideoLabel = "Animation d'arrière-plan";
      
  } else {

    var atAudioDescriptionLabel = "Audio Description";
    var atPauseButtonLabel = "Pause Animation";
    var atVideoLabel = "Background Animation";

  }

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

    // Prepend control wrapper.
    
    wrapper.prepend(btnControls);

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
      btnAudioDescription.setAttribute("aria-label", atAudioDescriptionLabel);
      btnAudioDescription.setAttribute("aria-pressed", "false");
      btnAudioDescription.setAttribute("class", atAudioDescriptionClassName);

      // See if wrapper contains custom audio description button value; use over default if true.

      if(wrapper.hasAttribute(dataAudioDescriptionButton)) {

        btnAudioDescription.setAttribute("aria-label", wrapper.getAttribute(dataAudioDescriptionButton));

      } else {

        btnAudioDescription.setAttribute("aria-label", atAudioDescriptionLabel);

      }

      // Append Audio Description button

      btnControls.append(btnAudioDescription);

      // Audio Description Toggle Event

      btnAudioDescription.addEventListener("click", function() {

        var thisVideo = wrapper.querySelector(atVideoClass);
        var thisDescription = wrapper.querySelector(atDescriptionTrackClass);

        thisDescription.classList.toggle("active");

        if (this.getAttribute("aria-pressed") === "false") {

          this.setAttribute("aria-pressed", "true");

          if (thisVideo.textTracks) {

            var track = thisVideo.textTracks[0];
            track.mode = "hidden";
            track.oncuechange = function() {
  
              var currentCue = this.activeCues[0];
  
              console.log(currentCue)
  
              if (currentCue) {
  
                thisDescription.innerHTML = "";
                thisDescription.appendChild(currentCue.getCueAsHTML());
        
                var Message = thisDescription.textContent;
                var msg = new SpeechSynthesisUtterance(Message);

                window.speechSynthesis.speak(msg);
  
              }
  
            }

          }

        } else {

          this.setAttribute("aria-pressed", "false");

          // HACK: Need to figure out a way to disable or stop cue. Currently looping through cue and sending nothing to div. Grr.

          if (thisVideo.textTracks) {

            var track = thisVideo.textTracks[0];
            track.mode = "hidden";
            track.oncuechange = function() {
  
              var currentCue = this.activeCues[0];
  
              console.log(currentCue)
  
              if (currentCue) {
  
                thisDescription.innerHTML = "";
  
              }
  
            }

          }

          window.speechSynthesis.cancel();

        }
      
      });

    }
  
  });

  // Video Loader

  function loadVideo(obj, poster) {

    // If animation class on body exists...

    if (animationBody.classList.contains(atEnabledClassName)) {

      obj.play();
 
     } else { 

      obj.load();

        if(poster) {

          obj.currentTime = poster;

        } else {
 
          obj.load();

        }
 
     }

     // TODO: Possibly include support for multiple source elements. See Line 19 in lazy.js

  }

  // Video Breakpoint Support

  // Create array to store all video brakpoints in.

  var videoBreakPoints = [];

  // Loop through each video...

  getBackgroundVideos.forEach(function(video, e){

    // Add inital attributes.

    video.setAttribute("crossorigin" , "");
    video.setAttribute("disableRemotePlayback", "");
    video.setAttribute("loop" , "");
    video.setAttribute("playsinline" , "");
    video.id = "animation-toggle-video-" + (e + 1);    
    video.muted = true;

    // Grab source src and apply to video element as "data-src" then delete source elm. Used by videoViewPort();

    if(video.hasAttribute(dataMedia)) {

      var videoSource =  video.querySelector("source");
      var defaultSource = videoSource.getAttribute("src");

      video.setAttribute("data-src", defaultSource);
      video.removeChild(videoSource);

    }

    // Get each breakpoint in video

    var videoBreakpoint = video.getAttribute(dataMedia);

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

      // If video has poster. 

      if(video.hasAttribute(dataPoster)) {

        var posterLoad = video.getAttribute(dataPoster);

      }

      if(video.hasAttribute(dataMedia)) {

        var largeSource = video.getAttribute(dataSrcSet);
        var defaultSource = video.getAttribute("data-src");

        if (videoBreakPoints[i].matches) {

          // Large Viewport Video

          video.setAttribute("src", largeSource);

        } else { 

          // Small Viewport Video (Default)

          video.setAttribute("src", defaultSource);

        }

        // Load video

        loadVideo(video, posterLoad);
       
      }  else { 

        // Load video

        loadVideo(video, posterLoad);

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