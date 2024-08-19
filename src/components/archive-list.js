import { api } from "../api/api.js";

class ArchivedNoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.archivedNotes = [];
  }

  connectedCallback() {
    this.fetchArchivedNotes();
  }

  async fetchArchivedNotes() {
    try {
      this.showLoading();
      const result = await api.getArchivedNotes();
      if (Array.isArray(result.data)) {
        this.archivedNotes = result.data;
      } else {
        this.archivedNotes = [];
        throw new Error("Invalid archived notes data");
      }
      this.render();
    } catch (error) {
      console.error("Error fetching archived notes:", error);
      this.showNotification("Failed to fetch archived notes", "error");
    } finally {
      this.hideLoading();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .archived-notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .note-card {
          background: #f4f4f4;
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
          .archived-notes-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="archived-notes-container">
        ${
          Array.isArray(this.archivedNotes) && this.archivedNotes.length > 0
            ? this.archivedNotes
                .map(
                  (note) => `
            <div class="note-card" data-id="${note.id}">
              <h3>${note.title || "refresh your browser"}</h3>
              <p>${note.body || "refresh your browser"}</p>
              <div class="date">${new Date(
                note.createdAt
              ).toLocaleDateString()}</div>
            </div>
          `
                )
                .join("")
            : "<p style='text-align: center; color: red;'>Belum ada catatan yang diarsipkan</p>"
        }
      </div>
    `;
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

customElements.define("archived-note-list", ArchivedNoteList);
