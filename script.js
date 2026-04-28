// ELEMENTS
const orb = document.getElementById("orb");
const chat = document.getElementById("chat");

// 🎤 SPEECH SETUP
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let speechSupported = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-GB";
  recognition.continuous = false;
  recognition.interimResults = false;
  speechSupported = true;
}

// 🔁 SIMULATION QUERIES
const queries = [
  { text: "Show me hoodies", category: "hoodies" },
  { text: "I need a tracksuit", category: "tracksuits" },
  { text: "Find me a bag", category: "bags" },
  { text: "Show tshirts", category: "tshirts" }
];

// STATE
let running = false;

// CLICK HANDLER
orb.addEventListener("click", () => {
  if (running) return;
  running = true;
  startFlow();
});


// 💬 MESSAGE FUNCTION
function addMessage(text, type = "ai") {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.innerText = text;

  msg.style.opacity = "0";
  msg.style.transform = "translateY(10px)";

  chat.appendChild(msg);

  setTimeout(() => {
    msg.style.transition = "all 0.4s ease";
    msg.style.opacity = "1";
    msg.style.transform = "translateY(0)";
  }, 50);

  chat.scrollTop = chat.scrollHeight;
}
function addTyping() {
  const typing = document.createElement("div");
  typing.className = "message ai typing";
  typing.innerText = "...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
  return typing;
}

// 🚀 START FLOW
function startFlow() {
  orb.classList.add("listening"); // 👈 ADD HERE

  addMessage("Listening...", "ai");

  if (speechSupported) {
    recognition.start();
  } else {
    runSimulation();
  }
}
// 🎭 FALLBACK SIMULATION
function runSimulation() {

  const random = queries[Math.floor(Math.random() * queries.length)];
  const randomQuery = random.text;
  const category = random.category;

  setTimeout(() => {
    addMessage("What do you need?", "ai");
  }, 1000);

  setTimeout(() => {
    addMessage(randomQuery, "user");
  }, 2000);

  setTimeout(() => {
    addMessage(`Looking for ${category}...`, "ai");
  }, 3000);

  setTimeout(() => {
    addMessage("Finding best options...", "ai");
  }, 4500);

  setTimeout(() => {
    localStorage.setItem("category", category);
    window.location.href = "products.html";
  }, 6000);
}


// 🎤 SPEECH RESULT
if (recognition) {

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    orb.classList.remove("listening");

    addMessage(transcript, "user");

    let category = "hoodies"; // fallback

    if (transcript.includes("hoodie")) category = "hoodies";
    else if (transcript.includes("tracksuit")) category = "tracksuits";
    else if (transcript.includes("bag")) category = "bags";
    else if (
      transcript.includes("tshirt") ||
      transcript.includes("t-shirt") ||
      transcript.includes("t shirt")
    ) category = "tshirts";

    const typing = addTyping();

    setTimeout(() => {
      typing.remove();
      addMessage(`Looking for ${category}...`, "ai");
    }, 800);

    setTimeout(() => {
      localStorage.setItem("category", category);
      window.location.href = "products.html";
    }, 2000);
  };

  recognition.onerror = () => {
    orb.classList.remove("listening");
    addMessage("Didn't catch that — try again", "ai");
    running = false;
  };
    }
