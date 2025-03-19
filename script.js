import "main-wrapper";
import "quote-block";

// ✅ Dynamically Inject Components
document.body.innerHTML += `

  <main-wrapper
    component-tag="quote-block"
    data='${JSON.stringify({ text: "hidddd", author: "John Doe" })}'
  ></main-wrapper>
`;
