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