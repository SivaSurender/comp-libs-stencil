const fs = require("fs");
const path = require("path");
const { hydrateDocument } = require("./stencil/ssr-stencil/hydrate"); // from your build

async function renderComponent() {
  // Load just your component snippet
  const componentHtml = fs.readFileSync("index.html", "utf-8");

  // Wrap it in minimal HTML doc
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head><title>SSR Component</title></head>
      <body>
        ${componentHtml}
      </body>
    </html>
  `;

  const results = await hydrateDocument(fullHtml, {
    prettyHtml: true,
  });

  // Extract only the component's HTML from the body
  const bodyMatch = results.html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const hydratedOnly = bodyMatch ? bodyMatch[1].trim() : results.html;

  console.log(hydratedOnly);
}

renderComponent();
