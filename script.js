// Your script here.

const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Load voices dynamically
function populateVoices() {
  voices = speechSynthesis.getVoices();

  if (!voices.length) {
    voicesDropdown.innerHTML = `<option>No voices available</option>`;
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  restartSpeech();
}

// Start speech
function speak() {
  if (!msg.text.trim()) {
    alert("Please enter text to speak!");
    return;
  }
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

// Stop speech
function stop() {
  speechSynthesis.cancel();
}

// Handle rate, pitch & text updates
function setOption() {
  msg[this.name] = this.value;
  restartSpeech();
}

// Restart speech automatically when settings change
function restartSpeech() {
  if (speechSynthesis.speaking) {
    stop();
    speak();
  }
}

// When voices change (browser loads them asynchronously)
speechSynthesis.addEventListener("voiceschanged", populateVoices);

// Set message text initially
msg.text = document.querySelector('[name="text"]').value;

// Event Listeners
voicesDropdown.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption));
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stop);
