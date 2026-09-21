interface Props {
  title: string;
  value: number | string;
  unit: string;
  color: string;
  trend: string;
}

export default function StatCard({ title, value, unit, color, trend }: Props) {
  return (
    <div className="stat-card">
      <p>{title}</p>

      <h2 style={{ color }}>
        {value}
        <span>{unit}</span>
      </h2>

      <p>{trend}</p>
    </div>
  );
}
