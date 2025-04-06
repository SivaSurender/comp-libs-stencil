// src/ssr.js
const { renderToString } = require('../hydrate');

// Export a function that AEM can use
module.exports.renderComponent = async function(tagName, props = {}) {
  // Convert props object to attributes string
  const attributes = Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  
  // Create component string
  const componentString = `<${tagName} ${attributes}></${tagName}>`;
  
  try {
    // Render to HTML string
    const result = await renderToString(componentString);
    return {
      html: result.html,
      diagnostics: result.diagnostics
    };
  } catch (error) {
    console.error('SSR rendering error:', error);
    return { html: '', error: error.message };
  }
};