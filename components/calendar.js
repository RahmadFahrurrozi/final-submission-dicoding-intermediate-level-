class Calendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .calendar {
          padding: 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .calendar h2 {
          margin-bottom: 15px;
        }

        .calendar-header {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .calendar-header select {
          padding: 5px;
          margin: 0 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          font-weight: bold;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .calendar-grid div {
          padding: 10px;
          background: #f9f9f9;
          border-radius: 5px;
          text-align: center;
        }
        @media (max-width: 400px) {
          .calendar-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      </style>
      <div class="calendar">
        <h2>Kalender</h2>
        <div class="calendar-header">
          <select id="month-select"></select>
          <select id="year-select"></select>
        </div>
        <div class="calendar-grid"></div>
      </div>
    `;

    this.months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    this.date = new Date();
    this.selectedMonth = this.date.getMonth();
    this.selectedYear = this.date.getFullYear();

    this.renderCalendar();
    this.attachEventListeners();
  }

  renderCalendar() {
    const monthSelect = this.shadowRoot.querySelector("#month-select");
    const yearSelect = this.shadowRoot.querySelector("#year-select");
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");

    monthSelect.innerHTML = this.months
      .map(
        (month, index) => `
      <option value="${index}" ${
          index === this.selectedMonth ? "selected" : ""
        }>${month}</option>
    `
      )
      .join("");

    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = Array.from(
      { length: 10 },
      (_, i) => `
      <option value="${currentYear - 5 + i}" ${
        currentYear - 5 + i === this.selectedYear ? "selected" : ""
      }>${currentYear - 5 + i}</option>
    `
    ).join("");

    calendarGrid.innerHTML = "";

    const firstDay = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).getDay();
    const daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === this.date.getDate() &&
        this.selectedMonth === this.date.getMonth() &&
        this.selectedYear === this.date.getFullYear();
      calendarGrid.innerHTML += `<div style="background: ${
        isToday ? "#00aaff" : "#f9f9f9"
      }">${i}</div>`;
    }
  }

  attachEventListeners() {
    const monthSelect = this.shadowRoot.querySelector("#month-select");
    const yearSelect = this.shadowRoot.querySelector("#year-select");

    monthSelect.addEventListener("change", (event) => {
      this.selectedMonth = parseInt(event.target.value);
      this.renderCalendar();
    });

    yearSelect.addEventListener("change", (event) => {
      this.selectedYear = parseInt(event.target.value);
      this.renderCalendar();
    });
  }
}

customElements.define("calendar-element", Calendar);
