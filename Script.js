const tapZone = document.getElementById("tapZone");
const output = document.getElementById("output");

// Speech Recognition Setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-GB";
recognition.continuous = false;
recognition.interimResults = false;

// Tap → Start Listening
tapZone.addEventListener("click", () => {
  output.classList.add("active");
  output.innerText = "Listening...";
  recognition.start();
});

// When speech detected
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  output.innerText = transcript;

  handleCommand(transcript.toLowerCase());
};

// Handle commands
function handleCommand(command) {

  if (command.includes("headphones")) {
    output.innerText = "Opening headphones...";
    window.location.href = "product.html";
  }

  else if (command.includes("nike") || command.includes("trainers")) {
    output.innerText = "Showing Nike Air Max...";
    window.location.href = "nike.html";
  }

  else {
    output.innerText = "Searching for: " + command;
  }
}
