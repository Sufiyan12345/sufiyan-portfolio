import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Database,
  LayoutTemplate,
  Rocket,
  Sparkles,
} from "lucide-react";

import "./Services.css";

/* =========================================================
   SERVICES DATA
========================================================= */

const services = [
  {
    number: "01",
    icon: LayoutTemplate,
    title: "Web Design",
    subtitle: "INTERFACES THAT FEEL RIGHT",
    description:
      "Modern, responsive interfaces designed around clarity, usability and a strong visual identity.",
    tags: ["UI / UX", "Responsive", "Design Systems"],
  },

  {
    number: "02",
    icon: Code2,
    title: "Frontend Development",
    subtitle: "INTERACTIVE DIGITAL EXPERIENCES",
    description:
      "Fast and interactive frontend applications built with modern React architecture and refined motion.",
    tags: ["React.js", "JavaScript", "Framer Motion"],
  },

  {
    number: "03",
    icon: Database,
    title: "Full-Stack Development",
    subtitle: "FROM INTERFACE TO DATABASE",
    description:
      "Complete web solutions connecting frontend experiences with APIs, backend logic and structured databases.",
    tags: ["Node.js", "Express.js", "MongoDB"],
  },

  {
    number: "04",
    icon: Rocket,
    title: "Business Solutions",
    subtitle: "DIGITAL PRODUCTS THAT SOLVE PROBLEMS",
    description:
      "Business-focused websites and digital platforms built around real requirements, scalability and long-term usability.",
    tags: ["Business Websites", "APIs", "Deployment"],
  },
];

/* =========================================================
   SERVICES COMPONENT
========================================================= */

const Services = () => {
  return (
    <section id="services" className="services-section">
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div className="services-grid" />

      <div className="services-glow services-glow-one" />
      <div className="services-glow services-glow-two" />

      <div className="services-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="services-header"
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
          <div className="services-label">
            <span className="services-label-line" />

            <div>
              <Sparkles size={12} />
              <span>02 / SERVICES</span>
            </div>
          </div>

          <div className="services-heading-row">
            <div>
              <h2>
                What I
                <br />
                <span>build.</span>
              </h2>
            </div>

            <div className="services-intro">
              <span>WHAT I DO</span>

              <p>
                From polished interfaces to complete
                full-stack systems, I build digital
                experiences designed to work beautifully
                and reliably.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SERVICES GRID
        ================================================= */}

        <div className="services-list">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                className="service-card"
                initial={{
                  opacity: 0,
                  y: 55,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                }}
              >
                {/* CARD GLOW */}

                <div className="service-card-glow" />

                {/* TOP */}

                <div className="service-top">
                  <div className="service-icon">
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>

                  <span className="service-number">
                    {service.number}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="service-content">
                  <span className="service-subtitle">
                    {service.subtitle}
                  </span>

                  <h3>{service.title}</h3>

                  <p>
                    {service.description}
                  </p>
                </div>

                {/* TAGS */}

                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* FOOTER */}

                <div className="service-footer">
                  <span>
                    EXPLORE SERVICE
                  </span>

                  <div className="service-arrow">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                {/* BOTTOM LINE */}

                <div className="service-line" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;