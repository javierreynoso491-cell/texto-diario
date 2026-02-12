const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

document.getElementById("date").innerText =
  today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

const url = `https://wol.jw.org/wol/dt/r4/lp-s/${year}/${month}/${day}`;

async function fetchText() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const content = data.items[0].content;

    const clean = content.replace(/<[^>]*>/g, "");

    document.getElementById("verse").innerText = clean.split(".")[0] + ".";
    document.getElementById("preview").innerText = clean.substring(0, 150) + "...";
    document.getElementById("fullText").innerText = clean;

  } catch (error) {
    document.getElementById("preview").innerText =
      "No se pudo cargar el texto.";
  }
}

document.getElementById("expandBtn").addEventListener("click", function() {
  document.getElementById("fullText").classList.remove("hidden");
  document.getElementById("expandBtn").style.display = "none";
});

fetchText();