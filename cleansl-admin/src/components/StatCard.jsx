const StatCard = ({ title, value, icon, trend }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
      <div className="p-2 bg-green-50 rounded-lg text-green-600">
        {icon}
      </div>
    </div>
    <p className="text-xs mt-4 text-green-600 font-medium">{trend}</p>
  </div>
);

export default StatCard;