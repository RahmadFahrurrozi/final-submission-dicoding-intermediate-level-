const BASE_URL = "https://notes-api.dicoding.dev/v2";
class LoaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
           background: -moz-linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 24, 43, 1) 100%,
            rgba(0, 62, 109, 1) 100%
        );
        background: -webkit-linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 24, 43, 1) 100%,
            rgba(0, 62, 109, 1) 100%
        );
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 24, 43, 1) 100%,
            rgba(0, 62, 109, 1) 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000", endColorstr="#003e6d", GradientType=1);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .loader {
          display: flex;
          justify-content: space-between;
          width: 60px;
        }
        .loader-inner {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: linear-gradient(90deg, #e100ff, #00aaff);
          animation: loader 0.8s ease-in-out alternate infinite;
        }
        .loader-inner:nth-child(1) {
          animation-delay: -0.4s;
        }
        .loader-inner:nth-child(2) {
          animation-delay: -0.2s;
        }
        @keyframes loader {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-15px);
          }
        }
        :host(.loader-hidden) {
          opacity: 0;
          visibility: hidden;
        }
      </style>
      <div class="loader">
        <div class="loader-inner"></div>
        <div class="loader-inner"></div>
        <div class="loader-inner"></div>
      </div>
    `;
  }

  setupEventListeners() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.classList.add("loader-hidden");
      }, 1000);
    });

    this.addEventListener("transitionend", () => {
      if (this.classList.contains("loader-hidden")) {
        this.remove();
      }
    });
  }
}

customElements.define("loader-component", LoaderComponent);
