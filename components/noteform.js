const BASE_URL = "https://notes-api.dicoding.dev/v2";
import "./calendar.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .note-form-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
        }
        .note-form {
          width: 100%;
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
        .calendar-container {
          width: 100%;
          max-width: 300px;
        }
        @media (max-width: 768px) {
          .note-form-container {
            flex-direction: column;
            align-items: center;
          }
          .calendar-container {
            width: 100%;
            max-width: 400px;
          }
        }
        .loading-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .error-popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1001;
        }
        .error-popup button {
          margin-top: 10px;
          padding: 5px 10px;
          background: #e100ff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
      <div class="note-form-container">
        <form class="note-form">
          <h2>Buat Catatan</h2>
          <div>
            <label for="title">Judul</label>
            <input type="text" id="title" name="title" required>
            <div class="error" id="titleError"></div>
          </div>
          <div>
            <label for="content">Isi</label>
            <textarea id="content" name="content" rows="5" required></textarea>
            <div class="error" id="contentError"></div>
          </div>
          <div>
            <label for="selectedDate">Pilih Tanggal</label>
            <input type="date" id="selectedDate" name="selectedDate" required>
          </div>
          <button type="submit">Simpan</button>
          </form>
          <div class="calendar-container">
            <calendar-element selected-date="${this.selectedDate}"></calendar-element>
          </div>
        <div class="loading-overlay" id="loading">
          <div class="loading-spinner"></div>
        </div>
        <div class="error-popup" id="errorPopup">
          <p id="errorMessage"></p>
          <button id="errorClose">Close</button>
        </div>
      </div>
    `;

    this.titleInput = this.shadowRoot.querySelector("#title");
    this.contentInput = this.shadowRoot.querySelector("#content");
    this.selectedDateInput = this.shadowRoot.querySelector("#selectedDate");
    this.titleError = this.shadowRoot.querySelector("#titleError");
    this.contentError = this.shadowRoot.querySelector("#contentError");
    this.form = this.shadowRoot.querySelector(".note-form");
    this.loading = this.shadowRoot.querySelector("#loading");
    this.errorPopup = this.shadowRoot.querySelector("#errorPopup");
    this.errorMessage = this.shadowRoot.querySelector("#errorMessage");
    this.errorClose = this.shadowRoot.querySelector("#errorClose");
    this.calendarElement = this.shadowRoot.querySelector("calendar-element");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.titleInput.addEventListener("input", () => this.validateTitle());
    this.contentInput.addEventListener("input", () => this.validateContent());
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.errorClose.addEventListener("click", () => this.hideErrorPopup());

    this.calendarElement.addEventListener("dateSelected", (event) => {
      this.selectedDateInput.value = event.detail.date;
    });
  }

  validateTitle() {
    if (this.titleInput.value.trim() === "") {
      this.titleInput.setCustomValidity("Judul tidak boleh kosong.");
      this.titleError.textContent = "Judul tidak boleh kosong.";
      this.titleInput.style.borderColor = "red";
      return false;
    } else {
      this.titleInput.setCustomValidity("");
      this.titleError.textContent = "";
      this.titleInput.style.borderColor = "#ccc";
      return true;
    }
  }

  validateContent() {
    if (this.contentInput.value.trim() === "") {
      this.contentInput.setCustomValidity("Isi tidak boleh kosong.");
      this.contentError.textContent = "Isi tidak boleh kosong.";
      this.contentInput.style.borderColor = "red";
      return false;
    } else {
      this.contentInput.setCustomValidity("");
      this.contentError.textContent = "";
      this.contentInput.style.borderColor = "#ccc";
      return true;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const isTitleValid = this.validateTitle();
    const isContentValid = this.validateContent();

    if (isTitleValid && isContentValid) {
      const noteData = {
        title: this.titleInput.value,
        body: this.contentInput.value,
      };

      console.log("Sending data:", JSON.stringify(noteData));

      this.showLoading();

      try {
        const response = await fetch(`${BASE_URL}/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const newNote = await response.json();

        this.form.reset();

        this.dispatchEvent(
          new CustomEvent("noteAdded", {
            bubbles: true,
            composed: true,
            detail: newNote,
          })
        );

        this.hideLoading();
      } catch (error) {
        console.error("Error adding note:", error);
        this.hideLoading();
        this.showErrorPopup(error.message);
      }
    }
  }

  showLoading() {
    this.loading.style.display = "block";
  }

  hideLoading() {
    this.loading.style.display = "none";
  }

  showErrorPopup(message) {
    this.errorMessage.textContent = message;
    this.errorPopup.style.display = "block";
  }

  hideErrorPopup() {
    this.errorPopup.style.display = "none";
  }
}

customElements.define("note-form", NoteForm);
