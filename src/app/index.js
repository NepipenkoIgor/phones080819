import {PhonesPageComponent} from "./phones/phones.component.js";

const rootElement = document.querySelector('#root');
new PhonesPageComponent({element: rootElement});

console.log('Init app');
