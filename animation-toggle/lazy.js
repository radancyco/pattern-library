// Use for future development.

// Video Lazy Load

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