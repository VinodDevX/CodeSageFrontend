import Image from "next/image";
import "./Hero.css";
import heross from "@/assets/heross.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">
          <span className="badge-dot"></span>
          AI POWERED
        </span>

        <h1 className="hero-title">
          AI-Powered <br />
          Code Review.
        </h1>

        <h2 className="hero-gradient">Better Developers.</h2>

        <p className="hero-description">
          CodeSage AI analyzes your code, finds issues,
          <br /> and helps you build secure, optimized,
          <br /> and maintainable code.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started Free
            <span>→</span>
          </button>

          <button className="secondary-btn">Live Demo</button>
        </div>

        <div className="trusted">
          <p>TRUSTED BY DEVELOPERS AT</p>

          <div className="companies">
            <span>Google</span>
            <span>Microsoft</span>
            <span>airbnb</span>
            <span>Spotify</span>
            <span>Dropbox</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <Image
          src={heross}
          alt="AI Dashboard"
          width={900}
          height={700}
          className="hero-image"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
