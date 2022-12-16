export default class Rwd {

  static settings = {
    breakpoints: {
      768: {
        name: 'small',
        notName: 'large',
        type: 'max-width',
        match: null,
        else: null,
      },
    },
  }

  static init(settings) {
    // Merge user's settings.
    this.settings = { ...this.settings, ...settings };

    for (const [bp, properties] of Object.entries(this.settings.breakpoints)) {
      // Build the media querie object.
      const mediaQ = window.matchMedia(`(${properties.type}: ${bp}px)`);

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

  static execute = (mediaQ, properties) => {
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
