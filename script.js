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

const jwUrl = `https://www.jw.org/es/biblioteca/libros/examinando-las-escrituras-diariamente/${year}/${month}/${day}/`;

// New reliable proxy
const proxyUrl = "https://corsproxy.io/?";

async function fetchText() {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(jwUrl));
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const verseElement = doc.querySelector(".themeScrp");
    const paragraphElement = doc.querySelector(".themeText");

    if (!verseElement || !paragraphElement) {
      throw new Error("Contenido no encontrado");
    }

    const verse = verseElement.innerText.trim();
    const text = paragraphElement.innerText.trim();

    document.getElementById("verse").innerText = verse;
    document.getElementById("preview").innerText = text.substring(0, 150) + "...";
    document.getElementById("fullText").innerText = text;

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
