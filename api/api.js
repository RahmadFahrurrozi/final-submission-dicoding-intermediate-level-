const BASE_URL = "https://notes-api.dicoding.dev/v2";

export const api = {
  async getNotes() {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return response.json();
  },

  async createNote(note) {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error("Failed to create note");
    }
    return response.json();
  },

  async deleteNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    return response.json();
  },

  async archiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to archive note");
    }
    return response.json();
  },

  async getArchivedNotes() {
    const response = await fetch(`${BASE_URL}/notes?archived=true`);
    if (!response.ok) {
      throw new Error("Failed to fetch archived notes");
    }
    return response.json();
  },

  async unarchiveNote(id) {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to unarchive note");
    }
    return response.json();
  },
};
