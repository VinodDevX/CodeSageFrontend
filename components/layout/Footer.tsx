import "./Footer.css";
import Image from "next/image";

import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "API Reference", "Help Center"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}

        <div className="footer-left" style={{ paddingTop: "2px" }}>
          <div className="footer-logo">
            {/* Replace with your logo */}
            <Image
              src="/mainlogo.png.png"
              alt="CodeSage AI"
              width={500}
              height={80}
              className="footer-logo-img"
            />
          </div>

          <p>
            AI-powered code review that helps developers ship better code,
            faster.
          </p>

          <div className="social-icons">
            <a href="#">
              <XIcon />
            </a>

            <a href="#">
              <GitHubIcon />
            </a>

            <a href="#">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Right */}

        <div className="footer-links">
          {footerLinks.map((section) => (
            <div key={section.title} className="footer-column">
              <h4>{section.title}</h4>

              {section.links.map((link) => (
                <a href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        © 2024 CodeSage AI. All rights reserved.
      </div>
    </footer>
  );
}
