import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Layers3,
  GitBranch,
  Palette,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import "./Skills.css";

/* =========================================================
   SKILL CARDS
========================================================= */

const skills = [
  {
    title: "Frontend",
    icon: Code2,
    number: "01",
    description:
      "Interfaces built for speed, clarity and interaction.",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3"],
  },

  {
    title: "Backend",
    icon: Server,
    number: "02",
    description:
      "Reliable APIs and server-side architecture.",
    skills: ["Node.js", "Express.js", "REST API"],
  },

  {
    title: "Database",
    icon: Database,
    number: "03",
    description:
      "Structured data systems designed to scale.",
    skills: ["MongoDB", "Mongoose", "Database Design"],
  },

  {
    title: "Architecture",
    icon: Layers3,
    number: "04",
    description:
      "Clean and maintainable application structures.",
    skills: [
      "Reusable Components",
      "API Integration",
      "React Architecture",
    ],
  },

  {
    title: "Tools",
    icon: GitBranch,
    number: "05",
    description:
      "A workflow focused on efficient development.",
    skills: ["Git", "GitHub", "VS Code", "Postman"],
  },

  {
    title: "Motion & UI",
    icon: Palette,
    number: "06",
    description:
      "Interfaces enhanced with refined motion.",
    skills: [
      "Responsive Design",
      "Framer Motion",
      "GSAP",
    ],
  },
];

/* =========================================================
   FLOATING TECHNOLOGIES
========================================================= */

const technologies = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Git",
  "GitHub",
  "GSAP",
  "Framer Motion",
  "REST API",
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

/* =========================================================
   SKILLS COMPONENT
========================================================= */

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="skills-bg-grid" />

      <div className="skills-glow skills-glow-one" />
      <div className="skills-glow skills-glow-two" />

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div className="skills-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="skills-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="skills-label">
            <span className="skills-label-line" />

            <div className="skills-label-content">
              <Sparkles size={12} />
              <span>03 / SKILLS</span>
            </div>
          </div>

          <div className="skills-heading-row">
            <div>
              <h2>
                The tools
                <br />
                <span>behind the work.</span>
              </h2>
            </div>

            <div className="skills-intro">
              <span className="skills-intro-small">
                MY STACK
              </span>

              <p>
                A focused collection of technologies I use
                to build modern, scalable and interactive
                digital experiences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            FLOATING TECH MARQUEE
        ================================================= */}

        <motion.div
          className="tech-marquee-wrapper"
          initial={{
            opacity: 0,
            y: 25,
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
            delay: 0.15,
          }}
        >
          <div className="tech-marquee">

            <div className="tech-marquee-track">
              {[...technologies, ...technologies].map(
                (tech, index) => (
                  <div
                    className="floating-tech"
                    key={`${tech}-${index}`}
                  >
                    <span className="floating-tech-dot" />

                    <span className="floating-tech-name">
                      {tech}
                    </span>
                  </div>
                )
              )}
            </div>

          </div>
        </motion.div>

        {/* =================================================
            SKILL CARDS
        ================================================= */}

        <div className="skills-grid">
          {skills.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="skill-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                }}
              >

                {/* CARD GLOW */}

                <div className="skill-card-glow" />

                <div className="skill-card-orb" />

                {/* CARD TOP */}

                <div className="skill-card-top">
                  <div className="skill-icon">
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="skill-number">
                    {item.number}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="skill-card-content">
                  <h3>{item.title}</h3>

                  <p>
                    {item.description}
                  </p>
                </div>

                {/* TAGS */}

                <div className="skill-list">
                  {item.skills.map((skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* ARROW */}

                <div className="skill-arrow">
                  <ArrowUpRight size={15} />
                </div>

                {/* BOTTOM LINE */}

                <div className="skill-card-line" />

              </motion.article>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <motion.div
          className="skills-bottom"
          initial={{
            opacity: 0,
            y: 15,
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
            delay: 0.2,
          }}
        >
          <div className="skills-bottom-line" />

          <span>
            ALWAYS LEARNING · ALWAYS BUILDING
          </span>

          <div className="skills-bottom-line" />
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;