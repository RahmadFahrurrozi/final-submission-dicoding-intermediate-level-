class DeletePopup extends HTMLElement {
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
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .popup.active {
          opacity: 1;
          visibility: visible;
        }
        .popup-content {
          background: white;
          padding: 30px;
          border-radius: 15px;
          max-width: 300px;
          width: 90%;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }
        .popup.active .popup-content {
          transform: scale(1);
        }
        h2 {
          margin-top: 0;
          color: #333;
          font-size: 1.5rem;
        }
        p {
          color: #666;
          margin-bottom: 20px;
        }
        .buttons {
          display: flex;
          justify-content: center;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          margin: 0 10px;
        }
        #confirm-delete {
          background-color: #f44336;
          color: white;
        }
        #confirm-delete:hover {
          background-color: #da190b;
        }
        #cancel-delete {
          background-color: #ccc;
          color: #333;
        }
        #cancel-delete:hover {
          background-color: #bbb;
        }
      </style>
      <div class="popup">
        <div class="popup-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this note?</p>
          <div class="buttons">
            <button id="confirm-delete">Delete</button>
            <button id="cancel-delete">Cancel</button>
          </div>
        </div>
      </div>
    `;

    this.popup = this.shadowRoot.querySelector(".popup");

    setTimeout(() => this.popup.classList.add("active"), 10);

    this.shadowRoot
      .querySelector("#confirm-delete")
      .addEventListener("click", () => {
        this.close(() => this.dispatchEvent(new CustomEvent("confirm")));
      });

    this.shadowRoot
      .querySelector("#cancel-delete")
      .addEventListener("click", () => {
        this.close(() => this.dispatchEvent(new CustomEvent("cancel")));
      });
  }

  close(callback) {
    this.popup.classList.remove("active");
    setTimeout(() => {
      callback();
      this.dispatchEvent(new CustomEvent("close"));
    }, 300);
  }
}

customElements.define("delete-popup", DeletePopup);
