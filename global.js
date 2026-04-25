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
export async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = "h2") {
  if (!containerElement) {
    console.error("Container element not found");
    return;
  }

  if (!Array.isArray(projects)) {
    console.error("Projects must be an array");
    return;
  }

  const validHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];

  if (!validHeadings.includes(headingLevel)) {
    headingLevel = "h2";
  }

  containerElement.innerHTML = "";

  for (let project of projects) {
    const article = document.createElement("article");

    article.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    `;

    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}