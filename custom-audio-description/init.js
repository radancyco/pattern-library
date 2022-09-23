const heroVideo = document.getElementById("hero-video");
const audioDescription = document.getElementById("audio-description");

const btnAudioDescription = document.getElementById("btn-audio-description");
const btnPlayToggle = document.getElementById("btn-play-pause");

btnAudioDescription.onclick = function() {

	this.classList.toggle("on");
	audioDescription.classList.toggle("active");

	if (heroVideo.textTracks) {

		const track = heroVideo.textTracks[0];
		track.mode = "hidden";

		track.oncuechange = function(e) {

			const cue = this.activeCues[0];

			if (cue) {

				audioDescription.innerHTML = "";
				audioDescription.appendChild(cue.getCueAsHTML());

				var Message = audioDescription.textContent;
				var msg = new SpeechSynthesisUtterance(Message);

				window.speechSynthesis.speak(msg);

			}

		}

	}

	heroVideo.volume = 0.05;

}

btnPlayToggle.onclick = function() {

	this.classList.toggle("on");
	heroVideo.paused ? heroVideo.play() : heroVideo.pause();

}
