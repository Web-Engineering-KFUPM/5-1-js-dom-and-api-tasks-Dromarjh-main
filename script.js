document.addEventListener("DOMContentLoaded", function () {
  /*
  =======================================
  TODO1: Welcome Board
  ---------------------------------------
  */
  document.getElementById("t1-msg").innerHTML = "Hello, World!";

  /*
  =======================================
  TODO2: Interaction Corner
  ---------------------------------------
  */
  const t2Btn = document.getElementById("t2-btn");
  const t2Status = document.getElementById("t2-status");

  t2Btn.addEventListener("click", function () {
    t2Status.innerHTML = "You clicked the button!";
  });

  /*
  =======================================
  TODO3: Inspiring Quote Board
  ---------------------------------------
  */
  // ---- Inspiring Quote Board (using dummyjson + local fallback) ----
// ---- Inspiring Quote Board (dummyjson + local fallback) ----
const quoteBtn  = document.getElementById("t3-loadQuote");
const quoteText = document.getElementById("t3-quote");
const quoteAuth = document.getElementById("t3-author");

// Local fallback quotes (used if network/API blocked)
const localQuotes = [
  { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { quote: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { quote: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" }
];

function pickLocalQuote(label = "offline") {
  const q = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  quoteText.textContent = `“${q.quote}”`;
  quoteAuth.textContent = `— ${q.author}${label ? ` (${label})` : ""}`;
}

async function loadQuote() {
  // UI state
  quoteBtn.disabled = true;
  quoteText.textContent = "Loading...";
  quoteAuth.textContent = "";

  try {
    const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json(); // { id, quote, author }
    quoteText.textContent = `“${data.quote}”`;
    quoteAuth.textContent = `— ${data.author}`;
  } catch (err) {
    // Fallback if the API is blocked/offline
    pickLocalQuote("fallback");
  } finally {
    quoteBtn.disabled = false;
  }
}

if (quoteBtn && quoteText && quoteAuth) {
  quoteBtn.addEventListener("click", loadQuote);
  // Auto-load one quote so you see it working immediately
  loadQuote();
}


  /*
=======================================
TODO4: Dammam Weather Now
---------------------------------------
*/
const tempEl = document.getElementById("t4-temp");
const humEl  = document.getElementById("t4-hum");
const windEl = document.getElementById("t4-wind");
const errEl  = document.getElementById("t4-err");
const wxBtn  = document.getElementById("t4-loadWx");

wxBtn.addEventListener("click", function () {
  errEl.textContent = "";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=eb143142d18ea165c434cdb10b3d83e6&units=metric";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      tempEl.textContent = data.main.temp + " °C";
      humEl.textContent  = data.main.humidity + " %";
      windEl.textContent = data.wind.speed + " m/s";
    })
    .catch(() => {
      errEl.textContent = "Could not load weather data.";
    });
});

});
