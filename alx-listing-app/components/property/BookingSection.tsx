import { useState, useEffect } from 'react';
import { StarIcon } from "@heroicons/react/24/solid";

interface BookingSectionProps {
  price: number;
  selectedDates: {
    checkIn: string;
    checkOut: string;
  };
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({ 
  price, 
  selectedDates,
  onDateChange 
}) => {
  const [totalNights, setTotalNights] = useState<number>(1);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [guests, setGuests] = useState<number>(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const start = new Date(selectedDates.checkIn);
      const end = new Date(selectedDates.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays || 1);
    }
  }, [selectedDates]);

  useEffect(() => {
    // Calculate service fee (10% of total)
    const calculatedServiceFee = Math.round(price * 0.1);
    setServiceFee(calculatedServiceFee);
    
    // Calculate total price
    const calculatedTotal = (price * totalNights) + calculatedServiceFee;
    setTotalPrice(calculatedTotal);
  }, [price, totalNights]);

  const handleGuestChange = (type: 'increment' | 'decrement') => {
    setGuests(prev => {
      const newValue = type === 'increment' ? prev + 1 : Math.max(1, prev - 1);
      return newValue;
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-2xl font-semibold">${price}</span>
          <span className="text-gray-600"> night</span>
        </div>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="ml-1 text-sm">4.89 (24 reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg overflow-hidden mb-4">
        <div className="border-r border-gray-300 p-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
          <input
            type="date"
            name="checkIn"
            value={selectedDates.checkIn}
            onChange={onDateChange}
            className="w-full text-sm focus:outline-none"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="p-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">CHECKOUT</label>
          <input
            type="date"
            name="checkOut"
            value={selectedDates.checkOut}
            onChange={onDateChange}
            className="w-full text-sm focus:outline-none"
            min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
            disabled={!selectedDates.checkIn}
          />
        </div>
      </div>

      <div className="relative mb-4">
        <button 
          className="w-full text-left p-3 border border-gray-300 rounded-lg"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
        >
          <div className="text-sm font-medium">Guests</div>
          <div className="text-gray-500 text-sm">{guests} {guests === 1 ? 'guest' : 'guests'}</div>
        </button>
        
        {showGuestDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-gray-500">Ages 13+</div>
              </div>
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
                  onClick={() => handleGuestChange('decrement')}
                >
                  -
                </button>
                <span className="mx-4">{guests}</span>
                <button 
                  className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center"
                  onClick={() => handleGuestChange('increment')}
                >
                  +
                </button>
              </div>
            </div>
            <button 
              className="w-full text-right text-sm font-medium text-indigo-600"
              onClick={() => setShowGuestDropdown(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <button 
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition duration-200 mb-4"
        onClick={() => alert('Booking functionality would be implemented here')}
      >
        Reserve
      </button>

      <div className="text-center text-sm text-gray-500 mb-4">
        You won't be charged yet
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 underline">${price} x {totalNights} {totalNights === 1 ? 'night' : 'nights'}</span>
          <span>${price * totalNights}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 underline">Service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
