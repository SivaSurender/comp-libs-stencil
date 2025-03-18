async function loadComponent(name) {
  try {
    await import(name);
  } catch (error) {
    console.error(`Error loading component: ${name}`, error);
  }
}

// ✅ Automatically Load Components When They Appear in DOM
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("quote-block, main-wrapper, hero-block")
    .forEach((element) => {
      console.log(element, "Dfdf");
      loadComponent(element.tagName.toLowerCase());
    });
});
