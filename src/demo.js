import Rwd from './rwd.js';

// Get dom element.
const log = document.getElementById('log');

Rwd.init({
  breakpoints: {
    992: {
      name: 'small',
      notName: 'large',
      type: 'max-width',
      match: () => {
        // Matching code.
        log.innerHTML += "<li>Breakpoint reached.</li>";
      },
      else: () => {
        // Breakpoint is not matching.
        log.innerHTML += '<li>Breakpoint not active, execute the "else" code</li>';
      }
    }
  }
});
