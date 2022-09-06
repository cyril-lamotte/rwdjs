export default class Rwd {
  constructor(settings = {}) {

    // Stop script if we are not in a browser context.
    if (typeof window !== "object") {
      throw new Error('RWDjs module must be run in a browser context.');
    }

    // Merge user's settings.
    this.settings = {
      breakpoints: {
        768: {
          name: 'small',
          notName: 'large',
          type: 'max-width',
          match: null,
          else: null,
        },
      },
      ...settings,
    };

    this.init();
  }

  init() {
    for (const [bp, properties] of Object.entries(this.settings.breakpoints)) {
      // Build the media querie object.
      const mediaQ = window.matchMedia(`(${properties.type}: ${bp}px`);

      // Execute code at load.
      if (typeof properties.match === 'function') {
        this.execute(mediaQ, properties);
      }

      // Execute code on breakpoint change.
      try {
        // Chrome & Firefox
        mediaQ.addEventListener('change', (e) => {
          this.execute(e, properties);
        });
      } catch (e1) {
        try {
          // Safari / iOS 13.
          mediaQ.addListener((e) => {
            this.execute(e, properties);
          });
        } catch (e2) {
          console.error(e2);
        }
      }
    }
  }

  execute = (mediaQ, properties) => {
    if (mediaQ.matches) {
      properties.match();
      document.body.classList.add(`rwd-${properties.name}`);
      document.body.classList.remove(`rwd-${properties.notName}`);
    } else {
      if (typeof properties.match === 'function') {
        properties.else();
      }
      document.body.classList.remove(`rwd-${properties.name}`);
      document.body.classList.add(`rwd-${properties.notName}`);
    }
  };
}
