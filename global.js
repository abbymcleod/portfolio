console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: "", title: "Home" },
    { url: "projects/", title: "Projects" },
    { url: "contact/", title: "Contact" },
    { url: "resume/", title: "Resume" },
    { url: "https://github.com/abbymcleod", title: "GitHub" },
  ];

const BASE_PATH =
   location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"
    : "/portfolio/";

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;

    url = !url.startsWith('http') ? BASE_PATH + url : url;

    let a = document.createElement("a");
    a.href = url;
    a.textContent = p.title;

    a.classList.toggle(
        "current",
        a.host === location.host &&
          a.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")
      );

      if (a.host !== location.host) {
        a.target = "_blank";
      }
    
      nav.append(a);
}

document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
  );

let select = document.querySelector(".color-scheme select");

function setColorScheme(scheme) {
    document.documentElement.style.setProperty("color-scheme", scheme);
    localStorage.colorScheme = scheme;
  }

  select.addEventListener("input", function (event) {
    let value = event.target.value;
    console.log("color scheme changed to", value);
    setColorScheme(value);
  });

  if ("colorScheme" in localStorage) {
    let saved = localStorage.colorScheme;
    setColorScheme(saved);
    select.value = saved;
  }