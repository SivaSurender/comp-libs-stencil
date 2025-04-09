const express = require('express');
const { renderComponent } = require('./ssr');
const app = express();
const port = process.env.PORT || 3333;

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// API endpoint for component rendering
// app.post('/render', async (req, res) => {
//   const { component, props } = req.body;
//   const result = await renderComponent(component, props);
//   console.log('SSR result:', result);
//   res.json(result);
// });
app.get('/render', async (req, res) => {
  const props = {
    first: req.query.first || 'DefaultFirst',
    middle: req.query.middle || '',
    last: req.query.last || 'DefaultLast',
  };

  const result = await renderComponent('my-component', props);

  const htmlPage = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Rendered Component</title>
        <script type="importmap">
          {
            "imports": {
              "my-component": "https://sivasurender.github.io/comp-libs-stencil/stencil/ssr-stencil/dist/components/my-component.js"
            }
          }
        </script>
        <script type="module">
          import 'my-component';
        </script>
      </head>
      <body>
        <div id="app">
          ${result.html}
        </div>
      </body>
    </html>
  `;

  res.send(htmlPage);
});

app.listen(port, () => {
  console.log(`SSR server listening on port ${port}`);
});
