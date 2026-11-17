import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  LockKeyhole,
  Layers3,
} from "lucide-react";

import "./Projects.css";

const projects = [
  {
    id: 1,
    number: "01",
    title: "JK Auto Electronic Works",
    category: "Automotive Technology",
    description:
      "A professional automotive electronics platform built for ECU programming, diagnostics, firmware solutions and workshop technology.",
    image: "/projects/jkauto.png",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "https://www.jkautoelectronicworks.com/",
    status: "LIVE",
    statusType: "live",
  },

  {
    id: 2,
    number: "02",
    title: "SHAMSHECO",
    category: "Solar Panel Recycling",
    description:
      "A modern business website for a solar panel recycling company focused on sustainable waste management and material recovery.",
    image: "/projects/shamsheco.png",
    technologies: ["React", "Responsive UI", "Business Website"],
    liveLink: "https://shamsheco.com/",
    status: "LIVE",
    statusType: "live",
  },

  {
    id: 3,
    number: "03",
    title: "Classic Tailor",
    category: "Bespoke Tailoring",
    description:
      "A premium full-stack tailoring platform designed around bespoke fashion, consultation and a refined luxury experience.",
    image: "/projects/classictailor.png",
    technologies: ["React", "Express", "MongoDB", "Admin Panel"],
    liveLink: "https://classic-tailor-three.vercel.app/",
    status: "LIVE",
    statusType: "live",
  },

  {
    id: 4,
    number: "04",
    title: "ARINA ECOM",
    category: "E-Commerce",
    description:
      "A modern e-commerce platform for electric cycles, batteries, inverters and electrical solutions with a strong product-focused shopping experience.",
    image: "/projects/Arina.png",
    technologies: [
      "React",
      "WooCommerce",
      "Elementor",
      "E-Commerce",
    ],
    liveLink: "https://arinaecom.com/",
    status: "LIVE",
    statusType: "live",
  },

  {
    id: 5,
    number: "05",
    title: "TNM7000",
    category: "Automotive Programmer",
    description:
      "A professional product-focused website for the TNM7000 multi-protocol automotive programmer covering ECU, OBD, ISP, JTAG, BDM and GPT workflows.",
    image: "/projects/TNM.png",
    technologies: ["React", "Product UI", "Responsive Design"],
    liveLink: "https://jkautoelectronicworks.com/",
    status: "LIVE",
    statusType: "live",
  },

  {
    id: 6,
    number: "06",
    title: "ECM PRO LAB",
    category: "Automotive Software",
    description:
      "An advanced ECM analysis and annotation platform featuring deep zoom inspection, ECU image analysis and structured technical annotations.",
    image: "/projects/ecm.png",
    technologies: [
      "React",
      "Node.js",
      "OpenSeadragon",
      "React Konva",
    ],
    liveLink: null,
    status: "UPCOMING",
    statusType: "upcoming",
  },
];

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ProjectCard = ({ project, index }) => {
  const isReverse = index % 2 !== 0;

  return (
    <motion.article
      className={`project-card ${
        isReverse ? "project-card-reverse" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.18,
      }}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <motion.div
        className="project-visual"
        variants={imageVariants}
      >
        <div className="project-image-wrapper">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="project-image"
          />

          <div className="project-image-overlay" />

          <div className="project-number">
            {project.number}
          </div>

          <div
            className={`project-status ${
              project.statusType === "upcoming"
                ? "status-upcoming"
                : "status-live"
            }`}
          >
            <span className="status-dot" />
            {project.status}
          </div>

          <div className="project-hover-icon">
            {project.liveLink ? (
              <ExternalLink size={22} strokeWidth={1.6} />
            ) : (
              <LockKeyhole size={21} strokeWidth={1.6} />
            )}
          </div>
        </div>
      </motion.div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <motion.div
        className="project-content"
        variants={contentVariants}
      >
        <div className="project-category">
          <span className="category-line" />
          <span>{project.category}</span>
        </div>

        <h3 className="project-title">
          {project.title}
        </h3>

        <p className="project-description">
          {project.description}
        </p>

        {/* Technologies */}

        <div className="project-tech">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="tech-pill"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Project */}

        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span>View live project</span>

            <span className="project-link-icon">
              <ArrowUpRight
                size={17}
                strokeWidth={1.6}
              />
            </span>
          </a>
        ) : (
          <div className="project-coming-soon">
            <LockKeyhole
              size={15}
              strokeWidth={1.5}
            />

            <span>Project in development</span>
          </div>
        )}
      </motion.div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section
      id="work"
      className="projects-section"
    >
      {/* Ambient Effects */}

      <div className="projects-glow projects-glow-one" />
      <div className="projects-glow projects-glow-two" />

      <div className="projects-grid-bg" />

      <div className="projects-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="projects-header"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="projects-kicker">
            <span>06</span>

            <div className="kicker-line" />

            <span>SELECTED WORK</span>
          </div>

          <div className="projects-heading-row">

            <div>
              <p className="projects-eyebrow">
                Built for real businesses.
              </p>

              <h2 className="projects-title-main">
                Selected
                <span> projects.</span>
              </h2>
            </div>

            <div className="projects-header-side">
              <Layers3
                size={19}
                strokeWidth={1.5}
              />

              <p>
                A collection of digital products,
                business platforms and technical
                experiences I've built.
              </p>
            </div>

          </div>
        </motion.div>

        {/* =================================================
            PROJECTS
        ================================================= */}

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;