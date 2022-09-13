# rwdjs

## Install

```
npm install rwdjs
```

## Usage

Execute JS code from given breakpoints.

```html
<div id="log"></div>
```

```js
import Rwd from './node_modules/rwdjs/src/rwd.js';

const log = document.getElementById('log');
const rwd = new Rwd({
  breakpoints: {
    992: {
      name: 'small',
      notName: 'large',
      type: 'max-width',
      match: () => {
        // Matching code.
        log.innerHTML += "<p>Breakpoint reached.</p>";
      },
      else: () => {
        // When breakpoint is not matching.
        log.innerHTML += '<p>Breakpoint not active, execute the "else" code</p>';
      }
    }
  }
});
```
