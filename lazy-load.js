const componentConfig = {
  "quote-block": { hoc: false },
  "hero-block": { hoc: false },
  "main-wrapper": { hoc: true, wraps: ["quote-block"] },
};

async function loadComponent(name) {
  try {
    await import(
      `https://cdn.jsdelivr.net/npm/bweb-components/dist/components/${name}.js`
    );
  } catch (error) {
    console.error(`Error loading component: ${name}`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(componentConfig).forEach((component) => {
    document.querySelectorAll(component).forEach((element) => {
      console.log(`Loading: ${component}`);
      loadComponent(component);
      console.log(`Loaded: ${component}`);

      if (componentConfig[component].hoc) {
        componentConfig[component].wraps.forEach((wrappedComponent) => {
          console.log(wrappedComponent, "fgfgf");
          loadComponent(wrappedComponent);
        });
      }
    });
  });
});
