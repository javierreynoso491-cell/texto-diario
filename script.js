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

// Use jw.org official daily text page
const url = `https://www.jw.org/es/biblioteca/libros/examinando-las-escrituras-diariamente/${year}/${month}/${day}/`;

async function fetchText() {
  try {
    const proxy = "https://api.allorigins.win/raw?url=";
    const response = await fetch(proxy + encodeURIComponent(url));
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const verseElement = doc.querySelector(".themeScrp");
    const paragraphElement = doc.querySelector(".themeText");

    if (!verseElement || !paragraphElement) {
      throw new Error("Contenido no encontrado");
    }

    const verse = verseElement.innerText;
    const text = paragraphElement.innerText;

    document.getElementById("verse").innerText = verse;
    document.getElementById("preview").innerText =
      text.substring(0, 150) + "...";
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
