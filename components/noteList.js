import { notesData } from "../data.js";
import "./edit-popup.js";
import "./delete-popup.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [...notesData];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
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

        .edit-btn {
          background-color: #2196f3;
          color: white;
        }

        .edit-btn:hover {
          background-color: #1976d2;
          transform: scale(1.05);
        }

        .delete-btn {
          background-color: #f44336;
          color: white;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
          transform: scale(1.05);
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
            (note, index) => `
          <div class="note-card">
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <div class="date">${new Date(
              note.createdAt
            ).toLocaleDateString()}</div>
            <div class="note-actions">
              <button class="edit-btn" data-index="${index}">Edit</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
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
      if (e.target.classList.contains("edit-btn")) {
        this.showEditPopup(parseInt(e.target.dataset.index));
      } else if (e.target.classList.contains("delete-btn")) {
        this.showDeletePopup(parseInt(e.target.dataset.index));
      }
    });
  }

  showEditPopup(index) {
    const editPopup = document.createElement("edit-popup");
    editPopup.setNoteData(this.notes[index]);
    document.body.appendChild(editPopup);

    editPopup.addEventListener("save", (e) => {
      this.notes[index] = { ...this.notes[index], ...e.detail };
      this.render();
      document.body.removeChild(editPopup);
    });

    editPopup.addEventListener("close", () => {
      document.body.removeChild(editPopup);
    });
  }

  showDeletePopup(index) {
    const deletePopup = document.createElement("delete-popup");
    document.body.appendChild(deletePopup);

    deletePopup.addEventListener("confirm", () => {
      this.notes.splice(index, 1);
      this.render();
      document.body.removeChild(deletePopup);
    });

    deletePopup.addEventListener("cancel", () => {
      document.body.removeChild(deletePopup);
    });
  }
}

customElements.define("note-list", NoteList);
