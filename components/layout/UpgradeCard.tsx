import { Sparkles } from "lucide-react";

export default function UpgradeCard() {
  return (
    <div className="upgrade-hover">
      <div className="upgrade-card">
        <div className="upgrade-icon">
          <Sparkles size={19} />
        </div>

        <h3>Upgrade to Pro</h3>
      </div>

      <div className="upgrade-popover" role="tooltip">
        <div className="upgrade-popover-header">
          <div className="upgrade-icon">
            <Sparkles size={19} />
          </div>
          <h3>Upgrade to Pro</h3>
        </div>

        <p>Unlock advanced AI models, team insights and unlimited reviews.</p>

        <ul className="upgrade-popover-list">
          <li>Unlimited AI code reviews</li>
          <li>Advanced AI models</li>
          <li>Team analytics and insights</li>
          <li>Priority support</li>
        </ul>

        <button type="button" className="upgrade-button">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
