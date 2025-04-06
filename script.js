import 'my-component';
async function loadSSRComponent() {
  try {
    const response = await fetch('http://localhost:3333/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        component: 'my-component',
        props: {
          first: 'Johdsfdsfn',
          middle: 'Doe',
          last: 'Smitsdsdsh'
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    const result = await response.json();
    console.log('SSR result:', result.html);
    // Insert only the pre-rendered HTML for my-component
    document.body.innerHTML = result.html;
  } catch (error) {
    console.error('Error fetching SSR component:', error);
    // Fallback to client-side rendering
    document.body.innerHTML = `<my-component first="John" middle="Doe" last="Smith"></my-component>`;
  }
}

// Call the function to load the component
loadSSRComponent();