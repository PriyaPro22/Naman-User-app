import { Bike } from 'lucide-react';

export default function RiderModeButton() {
  return (
    <div className="px-4 mb-4">
      <button className="w-full bg-primary-yellow text-primary-text rounded-full py-3.5 flex items-center justify-center gap-2 font-semibold text-base shadow-soft hover:bg-primary-yellow-dark transition-colors active:scale-[0.98]">
        <Bike size={20} />
        RIDER MODE
      </button>
    </div>
  );
}