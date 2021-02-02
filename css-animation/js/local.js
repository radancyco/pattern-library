/*

  Radancy: Animation Patterns

  Drew Toth (drew.toth[at]radancy.com)
  Michael "Spell" Spellacy (michael.spellacy[at]radancy.com)

*/

(function () {

	// Create Animation Code button and container

	$(".animation-container").append("<button class='btn-code' aria-expanded='false'>View Code</button><div class='animation-code' tabindex='0'><pre><code class='slideLeft'/></pre></div>");

	$(".btn-code").on( "click", function() {

		$(this).attr("aria-expanded", function (i, attr) {

			return attr == "true" ? "false" : "true";

		});

	});

	// Setup code for first animation

	// Note: Randomize animation on page load.

	var $ele = $(".container .button");

	var selectedAnimation = $ele.eq(Math.floor(Math.random()*($ele.length - 1))).attr("id");

	$("#object").addClass(selectedAnimation); // Load Animation

	$(".animation-code pre code").load($("#" + selectedAnimation).attr("href")); // Load Associated Animated Code

	$("#" + selectedAnimation).addClass("active"); // Highlight Associated Animated Code Button

	// Grab Sass from button link and insert into code window (.animation-code)

	$(".button").on( "click", function() {

  		$("#object").removeClass().addClass($(this).attr("id"));
  		$(".animation-code pre code").load($(this).attr("href"));
  		$(".container").find(".button").removeClass("active");
  		$(this).addClass("active");

			return false;

	});

	// There may be some conditions where we want to manipulate our canvas for better viewing.

	var canvas = $(".animation-canvas").offset().top;
	var $window = $(window);

	function checkTopPosition() {

		if ($window.scrollTop() >= canvas ) {

			$("body").addClass("active");

		} else {

			$("body").removeClass("active");

		}

  	}

  	$window.on('scroll resize', checkTopPosition);
  	$window.trigger('scroll');

})();
