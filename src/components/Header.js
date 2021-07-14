import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    let body = document.getElementById("body");

    if (isMobileOpen) {
      body.style = "overflow-y: hidden";
    } else {
      body.style = "overflow-y: scroll";
    }
  }, [isMobileOpen]);

  return (
    <nav className="header">
      <h2 className="logo">THE PLANETS</h2>
      <img
        className="hamburger"
        src={require("../assets/icon-hamburger.svg").default}
        alt="menu"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      />
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={desktopMenuVariants}
        className="desktop-menu"
      >
        {planets.map((planet, i) => {
          return (
            <motion.li
              initial="hidden"
              animate="visible"
              key={i}
              custom={i}
              variants={desktopMenuChildrenVariants}
            >
              <h4>
                <Link to={`/${planet.toLowerCase()}/overview`}>{planet}</Link>
              </h4>
            </motion.li>
          );
        })}
      </motion.ul>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.ul
            className="container mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            {planets.map((planet, i) => {
              return (
                <motion.li
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={mobileMenuChildVariants}
                >
                  <Link
                    to={`/${planet.toLowerCase()}/overview`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <h4>
                      <div className="circle">&nbsp;</div>
                      {planet}
                    </h4>
                    <img src={require("../assets/icon-chevron.svg").default} alt="arrow" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

const desktopMenuVariants = {
  hidden: { opacity: 0, transition: { when: "afterChildren" } },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.9 } },
};

const desktopMenuChildrenVariants = {
  hidden: { y: -200 },
  visible: (i) => ({
    y: 0,
    transition: {
      delay: i * 0.1,
      when: "beforeChildren",
    },
  }),
};

const mobileMenuVariants = {
  hidden: {
    x: -500,
    transition: {
      type: "ease-in-out",
      damping: 8,
    },
  },
  visible: {
    x: 0,
  },
};

const mobileMenuChildVariants = {
  hidden: { x: "-100vw" },
  visible: (i) => ({
    x: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default Header;
