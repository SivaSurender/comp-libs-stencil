// server/index.ts
import express from 'express';
import { renderStencilComponent } from './ssr-component';

const app = express();

app.get('/api/component/user-card', async (req, res) => {
  const props = {
    name: req.query.name || 'John Doe',
    title: req.query.title || 'Software Developer',
    // Complex data example
    userData: {
      id: 123,
      skills: ['JavaScript', 'TypeScript', 'Web Components'],
    },
  };

  const { html, styles, hydrateScript } = await renderStencilComponent('user-card', props);

  // Return component parts for consumption
  res.json({
    html,
    styles,
    script: hydrateScript,
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
