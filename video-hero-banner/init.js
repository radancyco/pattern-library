/*!

  Radancy Pattern Library: Video Hero Banner (VHB)

  Contributor(s):
  Michael "Spell" Spellacy, Email: michael.spellacy@radancy.com, Twitter: @spellacy, GitHub: michaelspellacy

  Dependencies: None

*/

(function() {

    // Display which version of Video Hero Banner is in use via console:
  
    console.log('%c Video Hero Banner v2.0 in use. ', 'background: #6e00ee; color: #fff');
  
    // Commonly used classes, data attributes, states, and strings.
  
    var heroBannerClass = ".hero-banner";
    var heroBannerBreakpointData = "data-banner-breakpoint";
	var heroBannerVideoClassName = "hero-banner__video";
	var heroBannerVideoClass = ".hero-banner__video";
	var heroBannerPlay = "Play Background Animation";
	var heroBannerPause = "Pause Background Animation";
	var heroBannerState = "paused";
  
    // Get all banners on the page...
  
    var allHeroBanners = document.querySelectorAll(heroBannerClass);
  
    // Create an array to store each banner breakpoint in, which we will loop through later...
  
    var allHeroBannerBreakPoints = [];
  
    allHeroBanners.forEach(function(banner){
  
      // Get each banner breakpoint...
  
      var heroBreakPoint = banner.getAttribute(heroBannerBreakpointData);
  
      // Store each breakpoint in array (above) for later use by matchMedia.
  
      allHeroBannerBreakPoints.push(window.matchMedia(heroBreakPoint));
  
    });

	function playVideo() {

		var allBannerVideos = document.querySelectorAll(heroBannerVideoClass);

		allBannerVideos.forEach(function(video, i){

			// video.load();

			video.muted = true;

			video.play();
			// heroBannerButton.setAttribute("aria-label", heroBannerPause);

		});
	
	}

  
    function viewPortChange() {
  
      // Loop through each banner again...
  
	  allHeroBanners.forEach(function(banner, i){

		// Local variables

		var heroBannerAll = banner.getAttribute("data-banner-all");
		var heroBannerCaption = banner.getAttribute("data-banner-caption");
		var heroBannerDescription = banner.getAttribute("data-banner-description");
		var heroBannerDesktop = banner.getAttribute("data-banner-desktop");
		// var heroBannerImage = banner.getElementById("hero-banner-image");
		// var heroBannerMedia = heroBanner.getAttribute("data-banner-media");
		var heroBannerMobile = banner.getAttribute("data-banner-mobile");

		// Set "active" hook on each banner

		banner.classList.add("active");
  
        var bannerCount = i + 1;
  
        // Give each banner a unique ID...
  
        banner.setAttribute("id", "hero-banner-" + bannerCount);

		// Create a video element for each banner

		var heroBannerVideo = document.createElement("video");
		heroBannerVideo.setAttribute("id", "hero-banner-video-" + bannerCount)
		heroBannerVideo.classList.add(heroBannerVideoClassName);
		heroBannerVideo.setAttribute("aria-label", "Background Animation");
		heroBannerVideo.setAttribute("loop", "");
		heroBannerVideo.setAttribute("autoplay", "");
		heroBannerVideo.setAttribute("playsinline", "");
		heroBannerVideo.setAttribute("disableRemotePlayback", "");

		// If captions are present, then controls have to be present

		/* if(heroBannerCaption !== null) {

			heroBannerVideo.setAttribute("controls", "");

		} */

		/* if(heroBannerCaption !== null || heroBannerDescription !== null) {

			heroBannerVideo.setAttribute("crossorigin", "anonymous");

		} */

		// TODO: Add fallback Image

		// Append video element to each banner

		

			banner.appendChild(heroBannerVideo);

		}	





        // Begin looping though breakpoint and apply correct video



		if(heroBannerAll !== null) {

			heroBannerVideo.setAttribute("src", heroBannerAll);
	
		} else {
  
        	if (allHeroBannerBreakPoints[i].matches) {

				// alert(allHeroBannerBreakPoints[i]);

				heroBannerVideo.setAttribute("src", heroBannerDesktop);

				alert("desktop");

        	} else {

				// alert(allHeroBannerBreakPoints[i]);
	
				heroBannerVideo.setAttribute("src", heroBannerMobile);

			alert("mobile");

			}

		}

		

			// Only mute video if captions are not present (video will not autoplay under this condition)

//	if(heroBannerCaption === null) {

	// 	heroBannerVideo.muted = true;

//	}

		
	
			playVideo();








  
       });





  
    }
  
    // Initiate viewPortWidth function when viewport is resized.
  
    allHeroBannerBreakPoints.forEach(function(breakpoint){
  
      breakpoint.addListener(viewPortChange);
  
    });
  
    // Initiate banners on page load.
  
    viewPortChange(); 
  
  })();



