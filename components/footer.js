class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
    .footer {
     background: transparent;
      color: #fff;
      text-align: start;
      padding: 10px 20px;
    }

    .footer p {
      font-size: 14px;
    }

    .footer span {
      font-weight: bold;
      color: #00aaff;
    }

    @media screen and (max-width: 375px) {
      .footer p {
        font-size: 10px;
      }
    }
    </style>
    <div class="footer">
      <p>&copy; <span>Rahmad Fahrurrozi Notes App 2024.</span> All rights reserved.</p>
    </div>
    `;
  }
}

customElements.define("footer-component", Footer);
