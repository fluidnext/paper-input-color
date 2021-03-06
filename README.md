[![Coverage Status](https://coveralls.io/repos/github/fluidnext/paper-input-color/badge.svg?branch=master)](https://coveralls.io/github/fluidnext/paper-input-color?branch=master)
[![Published on NPM](https://img.shields.io/npm/v/%40fluidnext-polymer%2Fpaper-input-color.svg)](https://www.npmjs.com/package/%40fluidnext-polymer%2Fpaper-input-color)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/%40fluidnext-polymer%2Fpaper-input-color)

# Paper Input Color

Is a [Polymer 3](https://polymer-library.polymer-project.org) web component that lets the user to select a color through a color picker.

See: [Demo](https://www.webcomponents.org/element/@fluidnext-polymer/paper-input-color/demo/demo/index.html).

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

### Custom icons
Icons can be customized by importing a different iconset.
For example, here is the iconset code imported in the [Demo]().
```js
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`
    <iron-iconset-svg name="paper-input-color" size="24">
        <svg><defs>
          <g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
        </defs></svg>
    </iron-iconset-svg>
`;

document.head.appendChild(template.content);
```

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
