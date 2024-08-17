class EditPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._noteData = null;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    if (this._noteData) {
      this.setNoteData(this._noteData);
    }
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
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .popup-content {
          background: white;
          padding: 30px;
          border-radius: 15px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transform: scale(0.8);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        h2 {
          margin-top: 0;
          color: #333;
          font-size: 1.5rem;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input, textarea {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .buttons {
          display: flex;
          justify-content: flex-end;
        }
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        button[type="submit"] {
          background-color: #4CAF50;
          color: white;
          margin-right: 10px;
        }
        button[type="submit"]:hover {
          background-color: #45a049;
        }
        #cancel-edit {
          background-color: #f44336;
          color: white;
        }
        #cancel-edit:hover {
          background-color: #da190b;
        }
      </style>
      <div class="popup-content">
        <h2>Edit Note</h2>
        <form id="edit-form">
          <input type="text" id="edit-title" placeholder="Title" required>
          <textarea id="edit-body" placeholder="Note content" required></textarea>
          <div class="buttons">
            <button type="submit">Save</button>
            <button type="button" id="cancel-edit">Cancel</button>
          </div>
        </form>
      </div>
    `;

    setTimeout(() => {
      const popupContent = this.shadowRoot.querySelector(".popup-content");
      popupContent.style.transform = "scale(1)";
      popupContent.style.opacity = "1";
    }, 10);
  }

  setupEventListeners() {
    this.shadowRoot
      .querySelector("#edit-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const title = this.shadowRoot.querySelector("#edit-title").value;
        const body = this.shadowRoot.querySelector("#edit-body").value;
        this.dispatchEvent(
          new CustomEvent("save", { detail: { title, body } })
        );
      });

    this.shadowRoot
      .querySelector("#cancel-edit")
      .addEventListener("click", () => {
        this.close();
      });
  }

  setNoteData(note) {
    this._noteData = note;
    if (this.shadowRoot) {
      const titleInput = this.shadowRoot.querySelector("#edit-title");
      const bodyInput = this.shadowRoot.querySelector("#edit-body");
      if (titleInput && bodyInput) {
        titleInput.value = note.title;
        bodyInput.value = note.body;
      }
    }
  }

  close() {
    const popupContent = this.shadowRoot.querySelector(".popup-content");
    popupContent.style.transform = "scale(0.8)";
    popupContent.style.opacity = "0";
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent("close"));
    }, 300);
  }
}

customElements.define("edit-popup", EditPopup);
