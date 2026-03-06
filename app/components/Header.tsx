"use client";

import { useState } from "react";

const menuConfig = [
  {
    text: "File",
    children: [
      {
        text: "Exit",
        href: "https://www.google.com",
      },
    ],
  },
  { text: "Edit", children: [] },
  {
    text: "View",
    children: [
      {
        text: "GitHub",
        href: "https://github.com/jzaleski",
      },
      {
        text: "LinkedIn",
        href: "https://www.linkedin.com/in/jonathan-w-zaleski",
      },
    ],
  },
  {
    text: "About",
    children: [
      {
        text: "Resume",
        href: "https://resume.jzaleski.com",
      },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const otherLinks = menuConfig.flatMap(item =>
    item.children
      .filter(child => child.text !== "Exit")
      .map(child => ({ ...child, parent: item.text })),
  );
  const exitLink = menuConfig.flatMap(item => item.children).find(child => child.text === "Exit");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          {menuConfig.map(item => (
            <li
              key={item.text}
              className="nav-item"
              onMouseEnter={() => item.children.length > 0 && setActiveDropdown(item.text)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.children.length > 0 ? "#" : undefined}
                className={`nav-link ${item.children.length === 0 ? "disabled" : ""}`}
              >
                {item.text}
              </a>
              {item.children.length > 0 && (
                <ul className={`dropdown ${activeDropdown === item.text ? "show" : ""}`}>
                  {item.children.map(child => (
                    <li key={child.text}>
                      <a href={child.href} className="dropdown-link">
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ul className="nav-list mobile-only">
          {otherLinks.map(link => (
            <li key={link.text} className="nav-item">
              <a href={link.href} className="nav-link">
                {link.text}
              </a>
            </li>
          ))}
          {exitLink && (
            <li className="nav-item">
              <a href={exitLink.href} className="nav-link">
                {exitLink.text}
              </a>
            </li>
          )}
        </ul>
      </nav>

      <div id="clock">&nbsp;</div>
    </header>
  );
};

export default Header;
