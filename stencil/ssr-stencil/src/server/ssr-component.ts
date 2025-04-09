// server/ssr-component.ts
import { renderToString } from '../../hydrate';
import fs from 'fs';
import path from 'path';

export async function renderStencilComponent(tagName: string, props: any = {}) {
  // Create the HTML string with component tag and props
  let componentHtml = `<${tagName}`;

  // Add props as attributes
  Object.keys(props).forEach(key => {
    if (typeof props[key] === 'string' || typeof props[key] === 'number') {
      componentHtml += ` ${key}="${props[key]}"`;
    }
  });

  componentHtml += `></${tagName}>`;

  // Render the component to HTML
  const results = await renderToString(componentHtml);

  // Collect the hydration script info
  const hydrationScript = {
    componentChunkName: `${tagName}.entry.js`,
    hydrateScript: `<script>
      // This ensures the component will hydrate once loaded
      window.customElements.whenDefined('${tagName}').then(() => {
        const elements = document.querySelectorAll('${tagName}');
        elements.forEach(el => {
          // Set complex props that couldn't be passed as attributes
          ${Object.keys(props)
            .filter(key => typeof props[key] === 'object')
            .map(key => `el.${key} = ${JSON.stringify(props[key])};`)
            .join('\n')}
        });
      });
    </script>`,
  };

  return {
    html: results.html,
    styles: results.styles,
    hydrateScript: hydrationScript,
  };
}
