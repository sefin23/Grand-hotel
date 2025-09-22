import React from 'react'
import { PlusCircle, MinusCircle, Utensils } from 'lucide-react'

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ id, name, price, quantity, onAdd, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-background p-4 rounded-xl border border-border shadow-sm">
      <div className="flex items-center gap-3">
        <Utensils className="w-6 h-6 text-primary" />
        <div>
          <h4 className="text-lg font-semibold text-text">{name}</h4>
          <p className="text-textSecondary">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onRemove(id)}
          className="p-1 rounded-full bg-error/20 text-error hover:bg-error/40 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={quantity === 0}
        >
          <MinusCircle className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold text-text w-8 text-center">{quantity}</span>
        <button
          onClick={() => onAdd(id)}
          className="p-1 rounded-full bg-success/20 text-success hover:bg-success/40 transition-colors duration-200"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default FoodItem