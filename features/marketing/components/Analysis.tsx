import "./Analysis.css";
import Image from "next/image";
import analysisimg from "@/assets/analysisimg.png";
const analysisData = [
  {
    title: "Performance",
    description: "Use reduce ( ) instead of for loop.",
    status: "Medium",
    color: "#EAB308",
  },
  {
    title: "Best Practice",
    description: "Prefer const over let.",
    status: "Low",
    color: "#22C55E",
  },
  {
    title: "Code Quality",
    description: "Function is doing one thing well.",
    status: "Low",
    color: "#22C55E",
  },
  {
    title: "Security",
    description: "Validate input items to prevent unexpected behavior.",
    status: "High",
    color: "#EF4444",
  },
];

const Analysis = () => {
  return (
    <section className="analysis-section">
      <div className="analysis-heading">
        <h2>AI That Understands Your Code</h2>
        <p>
          Our AI deeply analyzes your codebase and provides meaningful insights.
        </p>
      </div>

      <div className="analysis-wrapper">
        {/* Left */}
        <div className="code-preview">
          <Image
            src={analysisimg}
            alt="Analysis Preview"
            className="code-image"
            width={700}
            height={450}
          />
        </div>

        {/* Right */}
        <div className="review-panel">
          <div className="tabs">
            <button className="active">Analysis</button>
            <button>Suggestions</button>
          </div>

          {analysisData.map((item, index) => (
            <div className="review-card" key={index}>
              <div className="card-top">
                <h3>{item.title}</h3>

                <span className="badge" style={{ backgroundColor: item.color }}>
                  {item.status}
                </span>
              </div>

              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="score-panel">
          <div className="score-circle">
            <div className="score-inner">
              <h1>92</h1>
              <span>/100</span>
            </div>
          </div>

          <h3>Overall Score</h3>
        </div>
      </div>
    </section>
  );
};

export default Analysis;
