import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Layers3,
  Palette,
  Target,
} from "lucide-react";

import "./WhyWorkWithMe.css";

const principles = [
  {
    number: "01",
    icon: Target,
    eyebrow: "THINK BEFORE CODE",
    title: "Problem First",
    description:
      "I start by understanding the problem, the users and the actual goal behind a project before turning ideas into code.",
  },
  {
    number: "02",
    icon: Layers3,
    eyebrow: "BUILT FOR GROWTH",
    title: "Scalable Thinking",
    description:
      "Reusable components, structured architecture and clean code help projects stay easier to maintain and evolve.",
  },
  {
    number: "03",
    icon: Palette,
    eyebrow: "DESIGN × DEVELOPMENT",
    title: "Design Meets Code",
    description:
      "I care about both sides of the experience — how a product works and how it feels when someone interacts with it.",
  },
  {
    number: "04",
    icon: BrainCircuit,
    eyebrow: "REAL WORLD FOCUS",
    title: "Built With Purpose",
    description:
      "Every project should solve something meaningful, whether it is a business website, digital platform or technical product.",
  },
];

const WhyWorkWithMe = () => {
  return (
    <section id="why-me" className="why-me-section">
      {/* Background */}
      <div className="why-me-grid" />

      <div className="why-me-glow why-me-glow-one" />
      <div className="why-me-glow why-me-glow-two" />

      <div className="why-me-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="why-me-header"
          initial={{
            opacity: 0,
            y: 40,
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
          <div className="why-me-label">
            <span className="why-me-label-line" />

            <div>
              <span className="why-me-dot" />
              <span>05 / WHY WORK WITH ME</span>
            </div>
          </div>

          <div className="why-me-heading-row">
            <div className="why-me-title">
              <h2>
                Built with
                <br />
                <span>intention.</span>
              </h2>
            </div>

            <div className="why-me-intro">
              <span>MY APPROACH</span>

              <p>
                Good digital products are not only about technology. They
                need clear thinking, purposeful design and attention to the
                details that people actually experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            PRINCIPLES
        ================================================= */}

        <div className="why-me-principles">
          {principles.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.number}
                className="why-me-card"
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
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                }}
              >
                {/* Card Glow */}
                <div className="why-card-glow" />

                {/* Card Top */}
                <div className="why-card-top">
                  <div className="why-card-icon">
                    <Icon size={21} strokeWidth={1.4} />
                  </div>

                  <span className="why-card-number">
                    {item.number}
                  </span>
                </div>

                {/* Card Content */}
                <div className="why-card-content">
                  <span className="why-card-eyebrow">
                    {item.eyebrow}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>

                {/* Card Bottom */}
                <div className="why-card-bottom">
                  <span>
                    PRINCIPLE {item.number}
                  </span>

                  <div className="why-card-arrow">
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Bottom Line */}
                <div className="why-card-line" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithMe;