class ArchivedNoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.archivedNotes = [];
  }

  connectedCallback() {
    this.render();
    document.addEventListener(
      "noteArchived",
      this.handleNoteArchived.bind(this)
    );
  }

  handleNoteArchived(event) {
    const archivedNote = event.detail;
    this.archivedNotes.unshift(archivedNote);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Styles for archived note list */
        .archived-notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .archived-note-card {
          background: #f7f7f7;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .archived-note-card h3 {
          font-size: 1.3rem;
          color: #555;
        }
        .archived-note-card p {
          font-size: 1rem;
          color: #888;
        }
        .archived-note-card .date {
          font-size: 0.8rem;
          color: #aaa;
          text-align: right;
        }
      </style>
      <div class="archived-notes-container">
        ${
          this.archivedNotes.length > 0
            ? this.archivedNotes
                .map(
                  (note) => `
                <div class="archived-note-card">
                  <h3>${note.title}</h3>
                  <p>${note.body}</p>
                  <div class="date">${new Date(
                    note.createdAt
                  ).toLocaleDateString()}</div>
                </div>
              `
                )
                .join("")
            : "<p style='text-align: center;'>No archived notes</p>"
        }
      </div>
    `;
  }
}

customElements.define("archived-note-list", ArchivedNoteList);
