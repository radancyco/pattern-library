





// Video Hero Banner (VHB)
// Developer: Michael Spellacy (Spell), https://michaelspellacy.com

// Note: If you have a PWA, please see https://github.com/michaelspellacy/video-hero-banner/issues/7 before using

var heroBanner = document.getElementById("hero-banner");
var heroBannerVideo = heroBanner !== null ? heroBanner.getAttribute("data-banner-video") : null;

// Check if banner exists.

if(heroBannerVideo !== null) {

	// Check Cookie. If set to true, pause video.

	var videoBannerPaused = getCookie("videoBannerPaused");

	// Set "active" hook to main element

	heroBanner.classList.add("hero-banner-active");

	// Variables

	var heroBannerAll = heroBanner.getAttribute("data-banner-all");
	var heroBannerCaption = heroBanner.getAttribute("data-banner-caption");
	var heroBannerDescription = heroBanner.getAttribute("data-banner-description");
	var heroBannerDesktop = heroBanner.getAttribute("data-banner-desktop");
	var heroBannerImage = document.getElementById("hero-banner-image");
	var heroBannerMedia = heroBanner.getAttribute("data-banner-media");
	var heroBannerMobile = heroBanner.getAttribute("data-banner-mobile");
	var heroBannerPlay = "Play Background Animation";
	var heroBannerPause = "Pause Background Animation";
	var heroBannerState = "paused";

	// Create: Video

	var heroBannerVideo = document.createElement("video");
	heroBannerVideo.id = "hero-banner-video";
	heroBannerVideo.setAttribute("aria-label", "Background Animation");
	heroBannerVideo.setAttribute("loop", "");
	heroBannerVideo.setAttribute("playsinline", "");
	heroBannerVideo.setAttribute("disableRemotePlayback", "");

	// If captions are present, then controls have to be present

	if(heroBannerCaption !== null) {

		heroBannerVideo.setAttribute("controls", "");

	}

	if(heroBannerCaption !== null || heroBannerDescription !== null) {

		heroBannerVideo.setAttribute("crossorigin", "anonymous");

	}

	// TODO: Add fallback Image

	// Add: Video

	heroBanner.appendChild(heroBannerVideo);

	// Add: Audio Description

	if(heroBannerDescription !== null) {

		var heroBannerDescValue = heroBannerDescription.split(",");
		var n = 3;

		for (var i = 0; i < heroBannerDescValue.length; i += n) {

			// Append track to video

			var heroBannerAudioDescription = document.createElement("track");
			heroBannerAudioDescription.setAttribute("kind", "descriptions");
			heroBannerAudioDescription.setAttribute("srclang", heroBannerDescValue[i+1].trim());
			heroBannerAudioDescription.setAttribute("label", heroBannerDescValue[i+2].trim());
			heroBannerAudioDescription.setAttribute("src", heroBannerDescValue[i].trim());

			heroBannerVideo.appendChild(heroBannerAudioDescription);

		}

	}

	// Add: Audio Caption

	if(heroBannerCaption !== null) {

		var heroBannerCaptionValue = heroBannerCaption.split(",");
		var n = 3;

		for (var i = 0; i < heroBannerCaptionValue.length; i += n) {

			// Append track to video

			var heroBannerAudioCaption = document.createElement("track");
			heroBannerAudioCaption.setAttribute("kind", "captions");
			heroBannerAudioCaption.setAttribute("srclang", heroBannerCaptionValue[i+1].trim());
			heroBannerAudioCaption.setAttribute("label", heroBannerCaptionValue[i+2].trim());
			heroBannerAudioCaption.setAttribute("src", heroBannerCaptionValue[i].trim());

			heroBannerVideo.appendChild(heroBannerAudioCaption);

		}

	}

	// Create: Play/Pause Button

	var heroBannerButton = document.createElement("button");
	heroBannerButton.id = "hero-banner__button";

	// Fire Viewport Width

	var mediaQuery = window.matchMedia(heroBannerMedia);
	mediaQuery.addListener(viewPortWidth);
	viewPortWidth(mediaQuery);

	// Fire Prefers Reduced Motion

	var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	//motionQuery.addListener(viewportMotion);
	viewportMotion(motionQuery);

	// Add: Play/Pause Button

	// Note: The pause button should _never_ be removed from the UI (unless captions present, which will add controls). This is an important accessibility feature.
	// While script does make use of prefers-reduced-motion, we can't fully depend on it.

	if(heroBannerCaption === null) {

		heroBanner.appendChild(heroBannerButton);

	}

	// Event: Play/Pause Button

	heroBannerButton.onclick = function(){

		if (heroBanner.classList.contains(heroBannerState)) {

			document.cookie = "videoBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

			heroBanner.classList.remove(heroBannerState);

			playVideo();

		} else {

			pauseVideo();

			heroBanner.classList.add(heroBannerState);

			document.cookie = "videoBannerPaused=true; path=/";

		}

	};

}

// Get Cookie

function getCookie(name) {

	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value !== null) ? unescape(value[1]):null;

}

// Prefers Reduced Motion

function viewportMotion(motionQuery){

	heroBanner.classList.add("paused")

	if (motionQuery.matches) {

		pauseVideo();

		alert("Prefers Reduced Motion");

	}

}

// Pause Video

function pauseVideo() {

	heroBannerVideo.pause();

	heroBannerButton.setAttribute("aria-label", heroBannerPlay);

	if(heroBannerImage !== null && heroBanner.classList.contains(heroBannerState)) {

		// alert("Add Fallback Image");

		//heroBannerVideo.setAttribute("preload", "none");
		//heroBannerVideo.setAttribute("poster", heroBannerImage.src);

	}

}

// Play Video

function playVideo() {

	heroBannerVideo.play();
	heroBannerButton.setAttribute("aria-label", heroBannerPause);

}

// Viewport Width

function viewPortWidth(mediaQuery) {

	if(heroBannerAll !== null) {

		heroBannerVideo.setAttribute("src", heroBannerAll);

	} else {

		if (mediaQuery.matches) {

			heroBannerVideo.setAttribute("src", heroBannerDesktop);

		} else {

			heroBannerVideo.setAttribute("src", heroBannerMobile);

		}

	}

	heroBannerVideo.load();

	// Only mute video if captions are not present (video will not autoplay under this condition)

	if(heroBannerCaption === null) {

		heroBannerVideo.muted = true;

	}

	// If cookie exists, then pause video

	if(videoBannerPaused !== null) {

			heroBanner.classList.add(heroBannerState);

	}

	if(heroBanner.classList.contains(heroBannerState)) {

		pauseVideo();

	} else {

		playVideo();

	}

}

  