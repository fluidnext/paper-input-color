# Paper Input Color

Is a [Polymer 3](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview) web component that lets the user to select a color through a color picker.

See: [Demo](https://www.webcomponents.org/element/paper-input-color/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @fluidnext-polymer/paper-input-color
```

### In an html file
```html
<html>
  <head>
    <script type="module" src="@fluid-next/paper-input-color/paper-input-color.js"></script>
  </head>
  <body>
    <paper-input-color></paper-input-color>
  </body>
</html>
```

### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@fluid-next/paper-input-color/paper-input-color';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-input-color></paper-input-color>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

#### Custome Style, from outside TODO
Find some test on the various demo file.

**_--paper-autocomplete-main-color_**: Color for autocomplete details (border & icons).  
**_--paper-input-font-color_**: Font color only for input value.  
**_--paper-suggestions-color_**: Font color for item suggestions.  
**_--suggestions-item-min-height_**: Min heigth for item suggestions.  
**_--paper-autocomplete-min-height_**: Min heigth for the autocomplete, that wrap also the suggestions.

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/fluidnext/paper-input-color
cd paper-input-color
npm install
npm install -g polymer-cli
npm install -g wct-istanbull
```

### Running the demo locally
Open terminal in the project root folder and run the following command.
```sh
polymer serve --open
```

### Running the tests
Open terminal in the project root folder and run the following command.
```sh
polymer test
```
To see tests details, open the generated "index.html" inside "coverage/lcov-report" folder.