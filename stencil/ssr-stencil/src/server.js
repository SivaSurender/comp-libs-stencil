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
app.post('/render', async (req, res) => {
  const { component, props } = req.body;
  const result = await renderComponent(component, props);
  console.log('SSR result:', result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`SSR server listening on port ${port}`);
});