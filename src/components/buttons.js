class ButtonLeft extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          background: linear-gradient(90deg, #e100ff, #00aaff);
          color: #fff;
          padding: 10px 20px;
          border-radius: 100px;
          border: none;
          text-align: center;
          display: inline-block;
          cursor: pointer;
          fonront-weight: 700;
          transition: all 0.5s ease;
        }
        .button:hover {
          transform: scale(1.05);
        }
      </style>
      <button class="button">${this.getAttribute("text")}</button>
    `;
  }
}

customElements.define("button-left", ButtonLeft);

class ButtonRight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          background: transparent;
          color: #fff;
          padding: 10px 20px;
          border: 1px solid #fff;
          border-radius: 100px;
          cursor: pointer;
          text-align: center;
          display: inline-block;
          transition: all 0.5s ease; 
          font-weight: 700;
        }
        .button:hover {
          color: #fff;
          border-color: transparent;
          transform: scale(1.05);
        }
      </style>
      <button class="button">${this.getAttribute("text")}</button>
    `;
  }
}

customElements.define("button-right", ButtonRight);

class ButtonForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          background: linear-gradient(90deg, #e100ff, #00aaff);
          color: #fff;
          padding: 10px 20px;
          border: 1px solid #fff;
          border-radius: 100px;
          cursor: pointer;
          text-align: center;
          display: inline-block;
          transition: all 0.5s ease; 
          font-weight: 700;
        }
        .button:hover {
          color: #fff;
          border-color: transparent;
          transform: scale(1.05);
        }
      </style>
      <button type="submit" value="submit" name="submit" id="submit"  class="button">${this.getAttribute(
        "text"
      )}</button>
    `;
  }
}

customElements.define("button-form", ButtonForm);
