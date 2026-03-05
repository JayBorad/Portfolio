"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Full-Stack Developer",
  "Creative Technologist",
  "UI/UX Engineer",
  "3D Web Specialist",
  "Open Source Contributor",
];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIndex]);

  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
        color: "#00a8ff",
        fontWeight: 500,
      }}
    >
      {displayed}
      <span className="typing-cursor" style={{ color: "#00e5ff" }}>
        |
      </span>
    </span>
  );
}

export default function HeroText() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const lineVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: "relative", zIndex: 10, pointerEvents: "none" }}
    >
      <motion.div variants={lineVariants} style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.4rem 1rem",
            borderRadius: "100px",
            background: "rgba(0, 168, 255, 0.06)",
            border: "1px solid rgba(0, 168, 255, 0.2)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00e5ff",
              boxShadow: "0 0 8px rgba(0, 229, 255, 0.8)",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "rgba(0, 229, 255, 0.8)",
              textTransform: "uppercase",
            }}
          >
            Available for Work
          </span>
        </div>
      </motion.div>

      <div style={{ overflow: "hidden", marginBottom: "0.25rem" }}>
        <motion.p
          variants={lineVariants}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.875rem",
            color: "rgba(136, 153, 179, 0.7)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Hello, I'm
        </motion.p>
      </div>

      <div style={{ overflow: "hidden" }}>
        <motion.h1
          variants={lineVariants}
          className="text-hero"
          style={{
            color: "#e8f0fe",
            marginBottom: "0.1em",
          }}
        >
          Jay Borad
        </motion.h1>
      </div>

      <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
        <motion.div
          variants={lineVariants}
          style={{
            height: "3px",
            width: "100%",
            maxWidth: 480,
            background: "linear-gradient(90deg, #00a8ff, #a855f7, transparent)",
            borderRadius: 2,
            marginTop: "0.5rem",
          }}
        />
      </div>

      <motion.div
        variants={lineVariants}
        style={{ marginBottom: "2rem", minHeight: "2rem" }}
      >
        <TypingText />
      </motion.div>

      <motion.p
        variants={lineVariants}
        style={{
          fontSize: "1.1rem",
          color: 'rgba(136, 153, 179, 0.85)',
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}
      >
        I build immersive digital experiences that live at the intersection of
        design and engineering — from 3D web applications to scalable cloud
        systems.
      </motion.p>

      <motion.div
        variants={lineVariants}
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
      >
        <GlowButton
          primary
          onClick={() =>
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View My Work
        </GlowButton>
        <GlowButton
          onClick={() =>
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Get In Touch
        </GlowButton>
      </motion.div>

      <motion.div
        variants={lineVariants}
        style={{
          marginTop: "4rem",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {[
          { value: "20+", label: "Projects" },
          { value: "3+", label: "Years Exp" },
          { value: "5+", label: "Clients" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #00a8ff, #00e5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(136, 153, 179, 0.6)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "0.25rem",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function GlowButton({
  children,
  primary,
  onClick,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        padding: "0.875rem 2rem",
        borderRadius: "100px",
        fontSize: "0.925rem",
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.02em",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        background: primary
          ? "linear-gradient(135deg, #00a8ff, #0080cc)"
          : "transparent",
        border: primary ? "none" : "1px solid rgba(0, 168, 255, 0.3)",
        color: primary ? "#020408" : "#e8f0fe",
        boxShadow: hovered
          ? primary
            ? "0 0 30px rgba(0, 168, 255, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3)"
            : "0 0 20px rgba(0, 168, 255, 0.2)"
          : primary
            ? "0 0 15px rgba(0, 168, 255, 0.3)"
            : "none",
        pointerEvents: "auto",
      }}
    >
      {primary && hovered && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </motion.button>
  );
}
