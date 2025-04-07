// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

// Import the hydrate functions from your built Stencil library
const { renderToString } = require("./stencil/ssr-stencil/hydrate");

const PORT = 3000;

// Read your HTML template
const templatePath = path.join(__dirname, "index.html");
const template = fs.readFileSync(templatePath, "utf-8");

http
  .createServer(async (req, res) => {
    try {
      // Use renderToString to perform SSR on the template
      const result = await renderToString(template, {
        // Setting fullDocument to true to process the entire document
        fullDocument: true,
        serializeShadowRoot: "declarative-shadow-dom",
        prettyHtml: true,
        // Add the hydrateOptions
        hydrateOptions: {
          // This tells Stencil to fully hydrate the components
          clientHydrateAnnotations: true,
        },
      });

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(result.html);
    } catch (error) {
      console.error("SSR error:", error);
      res.writeHead(500);
      res.end("Internal Server Error");
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
