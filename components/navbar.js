class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                nav {
                    position: fixed;
                    width: 100%;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 20px; /* Adjusted padding */
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                    background: transparent;
                }
                nav.sticky {
                    background: rgba(0, 0, 0, 0.8);
                    box-shadow: 0 0.5rem 2rem rgba(79, 0, 85, 0.591);
                }
                .logo-icon {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                .logo-icon p {
                    font-size: 25px;
                    margin-left: 10px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    background: linear-gradient(90deg, #e100ff, #00aaff);
                    -webkit-background-clip: text;
                    color: transparent;
                    text-transform: uppercase;
                }
                .profile {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    gap: 10px; /* Adjusted gap for smaller screens */
                }
                .profile p {
                    display: block;
                    margin: 0;
                    color: white;
                    font-size: 15px;
                }
                .profile img {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                    cursor: pointer;
                    background-color: #F3FEB8;
                    border: 1px solid #F3FEB8;
                }
                .dropdown-content {
                    display: none;
                    position: absolute;
                    background-color: white;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0, 0, 100, 0.1);
                    z-index: 1;
                    border-radius: 10px;
                    top: 60px; /* Adjusted top position for smaller screens */
                    right: 20px;
                    padding: 10px;
                    color: black;
                }
                .dropdown-content a {
                    color: var(--text-color);
                    padding: 5px 16px;
                    text-decoration: none;
                    display: block;
                }
                .dropdown-content a:hover {
                    color: #e100ff;
                    transition: all 0.3s ease;
                }
                .show {
                    display: block;
                }
                @media (max-width: 768px) {
                    nav {
                        padding: 10px; /* Reduced padding for smaller screens */
                    }
                    .logo-icon p {
                        font-size: 20px; /* Reduced font size for smaller screens */
                    }
                    .profile p {
                        display: none; /* Hide profile text on smaller screens */
                    }
                    .dropdown-content {
                        right: 10px; /* Adjust dropdown position for smaller screens */
                    }
                }
                @media (max-width: 480px) {
                    .logo-icon p {
                        font-size: 18px; /* Further reduced font size for very small screens */
                    }
                    .profile img {
                        width: 35px; /* Reduced image size for very small screens */
                        height: 35px;
                    }
                }
            </style>
            <nav>
                <div class="logo-icon">
                    <p>Catat Cepat</p>
                </div>
                <div class="profile">
                    <p>Hai, Rahmad Fahrurrozi</p>
                    <img
                        class="dropbtn"
                        src="assets/avatar-profile.png"
                        alt="profile-nav"
                    />
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#">Profile</a>
                        <a href="#">Account</a>
                        <a href="#">History</a>
                    </div>
                </div>
            </nav>
        `;
  }

  addEventListeners() {
    const nav = this.shadowRoot.querySelector("nav");
    const dropdown = this.shadowRoot.querySelector("#myDropdown");
    const dropbtn = this.shadowRoot.querySelector(".dropbtn");

    window.addEventListener("scroll", () => {
      nav.classList.toggle("sticky", window.scrollY > 0);
    });

    dropbtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdown.classList.toggle("show");
    });

    window.addEventListener("click", () => {
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    });

    this.shadowRoot.addEventListener("click", (event) => {
      if (!event.target.matches(".dropbtn")) {
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    });
  }
}

customElements.define("navbar-component", NavbarComponent);
