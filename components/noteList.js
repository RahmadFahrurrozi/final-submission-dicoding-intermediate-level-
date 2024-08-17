import { api } from "../api.js";
import "./delete-popup.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [];
  }

  connectedCallback() {
    this.fetchNotes();
    this.setupEventListeners();
  }

  async fetchNotes() {
    try {
      this.showLoading();
      const result = await api.getNotes();
      this.notes = result.data;
      this.render();
      this.hideLoading();
    } catch (error) {
      console.error("Error:", error);
      this.hideLoading();
      this.showNotification("Failed to fetch notes", "error");
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .note-card {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .note-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .note-card h3 {
          margin-top: 0;
          font-size: 1.3rem;
          color: #333;
        }
        .note-card p {
          font-size: 1rem;
          color: #666;
          margin-bottom: 15px;
        }
        .note-card .date {
          font-size: 0.8rem;
          color: #999;
          text-align: right;
          margin-bottom: 10px;
        }
        .note-actions {
          display: flex;
          justify-content: flex-end;
        }
        .note-actions button {
          padding: 8px 15px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s, transform 0.1s;
          margin-left: 10px;
        }
        .delete-btn {
          background-color: #f44336;
          color: white;
        }
        .delete-btn:hover {
          background-color: #d32f2f;
          transform: scale(1.05);
        }
        #loading {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 10px;
        }
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          border-radius: 5px;
          color: white;
          font-weight: bold;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 1000;
        }
       
        .notification.show {
          opacity: 1;
          transform: translateY(0);
        }
        .notification.success {
          background-color: #4CAF50;
        }
        .notification.error {
          background-color: #f44336;
        }
        @media (max-width: 600px) {
          .notes-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="notes-container">
        ${this.notes
          .map(
            (note) => `
          <div class="note-card" data-id="${note.id}">
            <h3>${note.title || "refresh your browser"}</h3>
            <p>${note.body || "refresh your browser"}</p>
            <div class="date">${new Date(
              note.createdAt
            ).toLocaleDateString()}</div>
            <div class="note-actions">
              <button class="delete-btn" data-id="${note.id}">Delete</button>
            </div>
          </div>
        `
          )
          .join("")}
          
      </div>
    `;
  }

  setupEventListeners() {
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        this.showDeletePopup(e.target.dataset.id);
      }
    });

    document.addEventListener("noteAdded", (e) => {
      this.notes.unshift(e.detail);
      this.render();
      this.showNotification("Note added successfully!", "success");
    });

    document.addEventListener("noteUpdated", (e) => {
      const index = this.notes.findIndex((note) => note.id === e.detail.id);
      if (index !== -1) {
        this.notes[index] = e.detail;
        this.render();
        this.showNotification("Note updated successfully!", "success");
      }
    });
  }

  showDeletePopup(id) {
    const deletePopup = document.createElement("delete-popup");
    document.body.appendChild(deletePopup);

    deletePopup.addEventListener("confirm", () => {
      this.deleteNote(id);
      document.body.removeChild(deletePopup);
    });

    deletePopup.addEventListener("cancel", () => {
      document.body.removeChild(deletePopup);
    });
  }

  async deleteNote(id) {
    try {
      this.showLoading();
      await api.deleteNote(id);
      this.notes = this.notes.filter((note) => note.id !== id);
      this.render();
      this.showNotification("Note deleted successfully!", "success");
      this.hideLoading();
    } catch (error) {
      console.error("Error:", error);
      this.hideLoading();
      this.showNotification("Failed to delete note", "error");
    }
  }

  showLoading() {
    const loadingElement = document.createElement("div");
    loadingElement.textContent = "Loading...";
    loadingElement.id = "loading";
    this.shadowRoot.appendChild(loadingElement);
  }

  hideLoading() {
    const loadingElement = this.shadowRoot.querySelector("#loading");
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.className = `notification ${type}`;
    this.shadowRoot.appendChild(notification);

    notification.offsetHeight;

    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 2000);
  }
}

customElements.define("note-list", NoteList);
