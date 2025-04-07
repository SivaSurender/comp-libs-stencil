import { r as registerInstance, h } from './index-CeNUr5Ab.js';
import { f as format } from './utils-DhW431pq.js';

const myComponentCss = ":host{display:block}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * The first name
     */
    first;
    /**
     * The middle name
     */
    middle;
    /**
     * The last name
     */
    last;
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { key: '70654fc83039b5f659efe99cc990e9b86d20dbe0' }, "Hello, World! I'm ", this.getText());
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
//# sourceMappingURL=my-component.entry.esm.js.map

//# sourceMappingURL=my-component.entry.js.map