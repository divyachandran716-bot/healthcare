export default function AnalyticsCard({ title, value, change, type }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h4 className="text-gray-500">{title}</h4>
      <h2 className="text-2xl font-bold">{value}</h2>

      {change && (
        <p className={type === "decrease" ? "text-red-500" : "text-green-500"}>
          {type === "decrease" ? "▼" : "▲"} {change}
        </p>
      )}
    </div>
  );
}