import React from 'react'
import { Bed, AirVent, Wifi, Tv, Utensils, CheckCircle } from 'lucide-react'

interface RoomCardProps {
  type: string;
  capacity: string;
  features: string[];
  price: number;
  imageUrl: string;
  onSelect: () => void;
  isSelected: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  type,
  capacity,
  features,
  price,
  imageUrl,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`relative bg-surface rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] border-2 ${
        isSelected ? 'border-primary ring-4 ring-primary/50' : 'border-border hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 z-10">
          <CheckCircle className="w-5 h-5" />
        </div>
      )}
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={type}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-text mb-2">{type}</h3>
        <p className="text-textSecondary mb-4 flex items-center gap-2">
          <Bed className="w-5 h-5" /> {capacity}
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          {features.map((feature, index) => (
            <span key={index} className="flex items-center gap-1 text-sm bg-background text-textSecondary px-3 py-1 rounded-full border border-border">
              {feature === 'AC' && <AirVent className="w-4 h-4" />}
              {feature === 'Non-AC' && <AirVent className="w-4 h-4 rotate-180" />}
              {feature === 'Free Wifi' && <Wifi className="w-4 h-4" />}
              {feature === 'Smart TV' && <Tv className="w-4 h-4" />}
              {feature === 'Breakfast Included' && <Utensils className="w-4 h-4" />}
              {feature}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-3xl font-extrabold text-primary">
            ${price}<span className="text-lg text-textSecondary font-medium">/night</span>
          </span>
          <button
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              isSelected ? 'bg-accent text-white hover:bg-primary' : 'bg-primary text-white hover:bg-accent'
            }`}
            onClick={onSelect}
          >
            {isSelected ? 'Selected' : 'Select Room'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard