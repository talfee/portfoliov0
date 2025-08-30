import { useState } from "react";
import "./past.css";

const items = [
  {
    id: "td",
    title: "Software Developer Intern @ TD Bank",
    dates: "Sept 2025 – Present",
    bullets: [
      "Taught logic and state machines to 120+ students; designed slides for 500+; adapted to diverse learning styles and collaborated under pressure.",
    ],
  },
  {
    id: "ga",
    title: "Mobile App Developer @ G&A Robot",
    dates: "June 2025 – August 2025",
    bullets: [
      "Taught logic and state machines to 120+ students; designed slides for 500+; adapted to diverse learning styles and collaborated under pressure.",
    ],
  },
  {
    id: "sus",
    title: "Web Developer @ UBC SUS",
    dates: "January 2025 – Present",
    bullets: [
      "Taught logic and state machines to 120+ students; designed slides for 500+; adapted to diverse learning styles and collaborated under pressure.",
    ],
  },
  {
    id: "ta",
    title: "Teaching Assistant @ UBC CS Department",
    dates: "Sept 2023 – August 2025",
    bullets: [
      "Taught logic and state machines to 120+ students; designed slides for 500+; adapted to diverse learning styles and collaborated under pressure.",
    ],
  },
];

export default function Past() {
  // track which sections are open
  const [open, setOpen] = useState(() =>
    Object.fromEntries(items.map(i => [i.id, false]))
  );

  const toggle = (id) =>
    setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <main className="past">
      {items.map((job, i) => {
        const flip = i % 2 === 1;
        const isOpen = open[job.id];

        return (
          <section key={job.id} className={`past-row ${flip ? "flip" : ""}`}>
            <div className="past-imgwrap">
              <img src="/img.png" alt="" className="past-img" />
            </div>

            <div className="past-content">
              <h3 className="past-title">{job.title}</h3>
              <p className="past-dates">{job.dates}</p>

              <button
                className="expand-btn"
                onClick={() => toggle(job.id)}
                aria-expanded={isOpen}
                aria-controls={`desc-${job.id}`}
              >
                {isOpen ? "(-)" : "(+)"}
              </button>

              {isOpen && (
                <div id={`desc-${job.id}`}>
                  {job.bullets.map((b, j) => (
                    <p key={j} className="past-body">{b}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
