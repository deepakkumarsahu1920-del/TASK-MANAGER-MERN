const cards = [
  { key: 'total', label: 'Total Tasks', color: 'bg-indigo-50 text-indigo-700' },
  { key: 'completed', label: 'Completed', color: 'bg-green-50 text-green-700' },
  { key: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700' },
  { key: 'overdue', label: 'Overdue', color: 'bg-red-50 text-red-700' }
];

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((c) => (
        <div key={c.key} className={`rounded-xl p-4 shadow-sm ${c.color}`}>
          <p className="text-sm font-medium">{c.label}</p>
          <p className="text-2xl font-bold">{stats?.[c.key] ?? 0}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
