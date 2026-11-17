import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import "./About.css";

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    number: "01",
    title: "CREATIVE",
    text: "Ideas into interfaces",
  },
  {
    number: "02",
    title: "SCALABLE",
    text: "Systems built to grow",
  },
  {
    number: "03",
    title: "PRECISE",
    text: "Details that matter",
  },
];

/* =========================================================
   ABOUT
========================================================= */

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-background-grid" />

      <motion.div
        className="about-background-glow"
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="about-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="about-header"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="about-section-number">
            <span>01</span>
            <div />
          </div>

          <div className="about-section-label">
            <Sparkles size={13} />
            <span>ABOUT ME</span>
          </div>
        </motion.div>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="about-intro-grid">

          <motion.div
            className="about-title-wrapper"
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
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2 className="about-title">
              I turn ideas into
              <br />
              <span>digital reality.</span>
            </h2>
          </motion.div>

          <motion.div
            className="about-introduction"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
          >
            <div className="about-introduction-line" />

            <div>
              <span className="about-kicker">
                WHO I AM
              </span>

              <p>
                I'm Sufiyan Khan, a full-stack developer
                focused on building modern digital
                experiences where thoughtful design,
                clean code and technology come together.
              </p>
            </div>
          </motion.div>

        </div>

        {/* =================================================
            STORY + VISUAL
        ================================================= */}

        <div className="about-story-grid">

          {/* STORY */}

          <motion.div
            className="about-story"
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
              duration: 0.9,
              delay: 0.1,
            }}
          >
            <span className="about-mini-label">
              THE WAY I BUILD
            </span>

            <h3>
              I don't just build
              <br />
              websites.
              <br />
              <span>I build experiences.</span>
            </h3>

            <p>
              I approach every project from both sides
              of the screen — creating interfaces that
              feel refined while building the systems
              behind them to be reliable, maintainable
              and scalable.
            </p>

            <motion.a
              href="#services"
              className="about-explore-link"
              whileHover={{
                x: 7,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <span>EXPLORE WHAT I DO</span>

              <span className="about-explore-icon">
                <ArrowUpRight size={15} />
              </span>
            </motion.a>
          </motion.div>

          {/* VISUAL CARD */}

          <motion.div
            className="about-visual-wrapper"
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="about-visual-card"
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
            >
              <div className="visual-card-glow" />

              {/* TOP */}

              <div className="visual-card-top">
                <div className="visual-card-icon">
                  <Code2 size={17} />
                </div>

                <div className="visual-card-status">
                  <span />
                  <span>BUILD MODE</span>
                </div>
              </div>

              {/* CENTER */}

              <div className="developer-orbit">

                <motion.div
                  className="developer-orbit-ring ring-one"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="developer-orbit-ring ring-two"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="developer-core">
                  <Layers3 size={30} />
                </div>

              </div>

              {/* CODE */}

              <div className="developer-code">
                <span>
                  <i>const</i>{" "}
                  <b>developer</b> = {"{"}
                </span>

                <span>
                  <small>name:</small>{" "}
                  <em>"Sufiyan"</em>
                </span>

                <span>
                  <small>focus:</small>{" "}
                  <em>"Digital"</em>
                </span>

                <span>
                  <small>mindset:</small>{" "}
                  <em>"Build"</em>
                </span>

                <span>
                  {"};"}
                </span>
              </div>

              {/* FOOTER */}

              <div className="visual-card-footer">
                <span>FULL-STACK</span>
                <span>DEVELOPER</span>

                <ArrowUpRight size={14} />
              </div>

            </motion.div>
          </motion.div>

        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div className="about-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.number}
              className="about-stat"
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
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <span className="stat-number">
                {stat.number}
              </span>

              <div className="stat-info">
                <span>{stat.title}</span>
                <small>{stat.text}</small>
              </div>

              <ArrowUpRight
                className="stat-arrow"
                size={15}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;