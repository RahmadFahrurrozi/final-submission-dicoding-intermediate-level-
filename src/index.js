import "./style/style.css";

import "./components/loader.js";
import "./components/navbar.js";
import "./components/buttons.js";
import "./components/calendar.js";
import "./components/noteform.js";
import "./components/noteList.js";
import "./components/archive-list.js";
import "./components/footer.js";
import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  heroTimeline
    .from(".hero-images img", {
      duration: 2.5,
      opacity: 0,
      scale: 0.8,
      rotate: 10,
      x: 100,
    })
    .from(
      ".title",
      {
        duration: 2,
        opacity: 0,
        y: -50,
        stagger: 0.2,
      },
      "-=2"
    )
    .from(
      ".subtitle",
      {
        duration: 2,
        opacity: 0,
        y: 30,
      },
      "-=1.5"
    )
    .from(
      ".hero-buttons button-left, .hero-buttons button-right",
      {
        duration: 1.5,
        opacity: 0,
        y: 20,
        stagger: 0.3,
      },
      "-=1"
    );

  gsap.from("#note-form", {
    scrollTrigger: {
      trigger: "#note-form",
      start: "top 80%",
    },
    duration: 1.8,
    opacity: 0,
    y: 50,
  });

  gsap.from(".notes-hashtag", {
    scrollTrigger: {
      trigger: ".notes-hashtag",
      start: "top 80%",
    },
    duration: 1.8,
    opacity: 0,
    x: -50,
  });

  gsap.from(".form-container", {
    scrollTrigger: {
      trigger: ".form-container",
      start: "top 80%",
    },
    duration: 1.8,
    opacity: 0,
    scale: 0.95,
  });

  gsap.from(".notes-title, note-list, archive-note-list", {
    scrollTrigger: {
      trigger: ".notes-section",
      start: "top 80%",
    },
    duration: 1.8,
    opacity: 0,
    y: 30,
    stagger: 0.3,
  });

  gsap.utils.toArray("button-left, button-right").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, { scale: 1.05, duration: 0.5 });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { scale: 1, duration: 0.5 });
    });
  });
});
