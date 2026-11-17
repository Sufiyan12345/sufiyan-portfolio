import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Rocket,
  Sparkles,
} from "lucide-react";

import "./Journey.css";

/* =========================================================
   JOURNEY DATA
========================================================= */

const journey = [
  {
    year: "2023",
    label: "THE BEGINNING",
    title: "Started my journey in technology.",
    description:
      "Started building my foundation in software development while exploring programming, web technologies and problem solving.",
    icon: GraduationCap,
    tags: ["BCA", "Programming", "Web Fundamentals"],
  },

  {
    year: "2024",
    label: "DEVELOPING",
    title: "Turning knowledge into real projects.",
    description:
      "Moved from learning concepts to building complete interfaces, applications and practical projects with modern web technologies.",
    icon: Code2,
    tags: ["React.js", "JavaScript", "Node.js"],
  },

  {
    year: "2025",
    label: "BUILDING",
    title: "Building for real businesses.",
    description:
      "Started working on real-world digital products, business websites and full-stack applications with a stronger focus on design, usability and scalable architecture.",
    icon: BriefcaseBusiness,
    tags: ["Full-Stack", "APIs", "Business Solutions"],
  },

  {
    year: "2026",
    label: "NOW",
    title: "Building better digital experiences.",
    description:
      "Continuing to build modern products while combining development, interaction design and technology to create experiences that feel as good as they work.",
    icon: Rocket,
    tags: ["React", "Express", "MongoDB", "Motion"],
  },
];

/* =========================================================
   JOURNEY COMPONENT
========================================================= */

const Journey = () => {
  return (
    <section id="journey" className="journey-section">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="journey-grid" />

      <div className="journey-glow journey-glow-one" />
      <div className="journey-glow journey-glow-two" />

      <div className="journey-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="journey-header"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="journey-label">
            <span className="journey-label-line" />

            <div>
              <Sparkles size={12} />
              <span>04 / JOURNEY</span>
            </div>
          </div>

          <div className="journey-heading-row">
            <div className="journey-title">
              <h2>
                From learning
                <br />
                <span>to building.</span>
              </h2>
            </div>

            <div className="journey-intro">
              <span>THE PROCESS</span>

              <p>
                A continuous journey of learning,
                experimenting and turning ideas into
                real digital products.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            TIMELINE
        ================================================= */}

        <div className="journey-timeline">
          {/* MAIN LINE */}

          <div className="journey-line">
            <motion.div
              className="journey-line-progress"
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
            />
          </div>

          {/* ITEMS */}

          {journey.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.year}
                className={`journey-item ${
                  index % 2 === 0
                    ? "journey-item-left"
                    : "journey-item-right"
                }`}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* YEAR */}

                <div className="journey-year">
                  <span>{item.year}</span>
                </div>

                {/* CENTER NODE */}

                <div className="journey-node">
                  <div className="journey-node-inner">
                    <Icon size={16} />
                  </div>
                </div>

                {/* CARD */}

                <div className="journey-card">
                  <div className="journey-card-top">
                    <span className="journey-card-label">
                      {item.label}
                    </span>

                    <span className="journey-card-index">
                      0{index + 1}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="journey-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="journey-card-footer">
                    <span>
                      {index === journey.length - 1
                        ? "CURRENTLY BUILDING"
                        : "MILESTONE"}
                    </span>

                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <motion.div
          className="journey-bottom"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="journey-bottom-symbol">
            <span />
            <span />
            <span />
          </div>

          <p>
            The journey continues.
            <span> The next build is always better.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;