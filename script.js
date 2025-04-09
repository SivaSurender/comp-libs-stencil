// client/app.js
import { defineCustomElements } from "./stencil/ssr-stencil/loader/index.js";

// Function to fetch and insert an SSR component
async function fetchAndRenderComponent(componentName, props, targetElement) {
  const queryParams = new URLSearchParams(props).toString();
  const response = await fetch(
    `/api/component/${componentName}?${queryParams}`
  );
  const { html, styles, script } = await response.json();

  // Insert styles to head if needed
  if (styles) {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);
  }

  // Insert component HTML
  targetElement.innerHTML = html;

  // Insert hydration script
  const scriptEl = document.createElement("div");
  scriptEl.innerHTML = script.hydrateScript;
  document.body.appendChild(scriptEl.firstChild);

  // Load component definition
  await import(`../dist/components/${script.componentChunkName}`);
}

// Initialize web components
defineCustomElements().then(() => {
  console.log("Components registry initialized");

  // Example usage
  const container = document.getElementById("component-container");
  fetchAndRenderComponent(
    "user-card",
    {
      name: "Alice Smith",
      title: "Product Manager",
    },
    container
  );
});
