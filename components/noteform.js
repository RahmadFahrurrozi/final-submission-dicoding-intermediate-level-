class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .note-form {
          padding: 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .note-form h2 {
          margin-bottom: 15px;
        }

        .note-form label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .note-form input, .note-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 15px;
        }

        .note-form .error {
          color: red;
          font-size: 0.8em;
          margin-top: -10px;
          margin-bottom: 10px;
        }
        .note-form button {
          padding: 10px 20px;
          background: linear-gradient(90deg, #e100ff, #00aaff);
          color: #fff;
          border: none;
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.5s ease;
        }
        .note-form button:hover {
          transform: scale(1.05);
          transition: all 0.5s ease;
        }
      </style>
      <form class="note-form" action="index.html" method="post">
        <h2>Buat Catatan</h2>
        <label for="title">Judul</label>
        <input type="text" id="title" name="title" required>
        <div class="error" id="titleError"></div>
        <label for="content">Isi</label>
        <textarea id="content" name="content" rows="5" required></textarea>
        <div class="error" id="contentError"></div>
        <button type="submit">Simpan</button>
      </form>
    `;

    this.titleInput = this.shadowRoot.querySelector("#title");
    this.contentInput = this.shadowRoot.querySelector("#content");
    this.titleError = this.shadowRoot.querySelector("#titleError");
    this.contentError = this.shadowRoot.querySelector("#contentError");
    this.form = this.shadowRoot.querySelector(".note-form");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.titleInput.addEventListener("input", () => this.validateTitle());
    this.contentInput.addEventListener("input", () => this.validateContent());
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
  }

  validateTitle() {
    if (this.titleInput.value.trim() === "") {
      this.titleInput.setCustomValidity("Judul tidak boleh kosong.");
      this.titleError.textContent = "Judul tidak boleh kosong.";
      this.titleInput.style.borderColor = "red";
    } else {
      this.titleInput.setCustomValidity("");
      this.titleError.textContent = "";
      this.titleInput.style.borderColor = "#ccc";
    }
    this.titleInput.reportValidity();
  }

  validateContent() {
    if (this.contentInput.value.trim() === "") {
      this.contentInput.setCustomValidity("Isi tidak boleh kosong.");
      this.contentError.textContent = "Isi tidak boleh kosong.";
      this.contentInput.style.borderColor = "red";
    } else {
      this.contentInput.setCustomValidity("");
      this.contentError.textContent = "";
      this.contentInput.style.borderColor = "#ccc";
    }
    this.contentInput.reportValidity();
  }

  handleSubmit(event) {
    const isTitleValid = this.validateTitle();
    const isContentValid = this.validateContent();

    if (!isTitleValid || !isContentValid) {
      event.preventDefault();
    }
  }
}

customElements.define("note-form", NoteForm);
