import Image from "next/image";
import "./Integrations.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import githublogo from "@/assets/githublogo.png";
import gitlablogo from "@/assets/gitlablogo.png";
import bitbucketlogo from "@/assets/bitbucketlogo.png";
import vslogo from "@/assets/vslogo.png";
import jenkinslogo from "@/assets/jenkinslogo.png";
import slacklogo from "@/assets/slacklogo.png";
import dockerlogo from "@/assets/dockerlogo.png";
const integrations = [
  {
    name: "GitHub",
    image: githublogo,
  },
  {
    name: "GitLab",
    image: gitlablogo,
  },
  {
    name: "Bitbucket",
    image: bitbucketlogo,
  },
  {
    name: "VS Code",
    image: vslogo,
  },
  {
    name: "Jenkins",
    image: jenkinslogo,
  },
  {
    name: "Slack",
    image: slacklogo,
  },
  {
    name: "Docker",
    image: dockerlogo,
  },
];

export default function Integrations() {
  return (
    <section className="integration-section">
      <div className="integration-container">
        <h2>Seamless Integrations</h2>

        <p className="subtitle">Works with the tools you already use.</p>

        <div className="integration-grid">
          {integrations.map((item) => (
            <div className="integration-card" key={item.name}>
              <div className="logo-box">
                {/* Image yaha lagegi */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={42}
                  height={42}
                />
              </div>

              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="cta-box">
          <div className="cta-content">
            <h3>Ready to write better code?</h3>

            <p>
              Join thousands of developers who trust CodeSage AI
              <br />
              to ship high-quality code, faster.
            </p>

            <button className="cta-btn">
              Get Started Free
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
