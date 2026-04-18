console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");

let currentLink = navLinks.find(
    (a) => 
        a.host === location.host && 
        a.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "")
);

currentLink?.classlist.add('current');