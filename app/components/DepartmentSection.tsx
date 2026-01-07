import { Home, Monitor, Smartphone, Grid } from 'lucide-react';

export default function DepartmentSection() {
  const departments = [
    {
      name: 'All',
      icon: <Grid size={22} className="text-white" />,
      bgColor: 'bg-primary-text',
    },
    {
      name: 'Home\nAppliances',
      icon: <Home size={22} className="text-primary-text" />,
      bgColor: 'bg-pink-100',
    },
    {
      name: 'Computer',
      icon: <Monitor size={22} className="text-primary-text" />,
      bgColor: 'bg-orange-100',
    },
    {
      name: 'Mobile',
      icon: <Smartphone size={22} className="text-primary-text" />,
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <section className="px-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-primary-text">Department</h2>
        <button className="text-sm font-medium text-primary-yellow hover:text-primary-yellow-dark transition-colors">
          See all
        </button>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-4 gap-4">
        {departments.map((dept, index) => (
          <button
            key={index}
            className="flex flex-col items-center active:scale-[0.95] transition-transform"
          >
            <div className={`w-16 h-16 ${dept.bgColor} rounded-full flex items-center justify-center mb-2 shadow-soft`}>
              {dept.icon}
            </div>
            <span className="text-xs font-medium text-primary-text text-center whitespace-pre-line leading-tight">
              {dept.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}