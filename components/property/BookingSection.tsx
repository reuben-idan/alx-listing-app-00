import { useState, useEffect, useRef } from 'react';
import { StarIcon, UserIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

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
  const [cleaningFee, setCleaningFee] = useState<number>(50);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [guests, setGuests] = useState<number>(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState<boolean>(false);
  const guestDropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the guest dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate number of nights when dates change
  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const start = new Date(selectedDates.checkIn);
      const end = new Date(selectedDates.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays || 1);
    } else {
      setTotalNights(1);
    }
  }, [selectedDates]);

  // Calculate pricing when nights or guests change
  useEffect(() => {
    const calculatedServiceFee = Math.round(price * 0.1);
    const calculatedCleaningFee = cleaningFee;
    const subtotal = price * totalNights;
    const total = subtotal + calculatedServiceFee + calculatedCleaningFee;
    
    setServiceFee(calculatedServiceFee);
    setTotalPrice(total);
  }, [price, totalNights, cleaningFee]);

  const handleGuestChange = (type: 'increment' | 'decrement') => {
    setGuests(prev => {
      const newValue = type === 'increment' ? Math.min(16, prev + 1) : Math.max(1, prev - 1);
      return newValue;
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-2xl font-bold text-gray-900">${price.toLocaleString()}</span>
          <span className="text-gray-600"> / night</span>
        </div>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-700">4.89 (24 reviews)</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg overflow-hidden mb-4">
        <div className="border-r border-gray-300 p-3">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Check-in
          </label>
          <input
            type="date"
            name="checkIn"
            value={selectedDates.checkIn}
            onChange={onDateChange}
            className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="p-3">
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Checkout
          </label>
          <input
            type="date"
            name="checkOut"
            value={selectedDates.checkOut}
            onChange={onDateChange}
            className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0 focus:outline-none"
            min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
            disabled={!selectedDates.checkIn}
          />
        </div>
      </div>

      {/* Guest Selection */}
      <div className="relative mb-6" ref={guestDropdownRef}>
        <button 
          className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          type="button"
        >
          <div className="text-sm font-semibold text-gray-700">Guests</div>
          <div className="text-gray-500 text-sm">
            {guests} {guests === 1 ? 'guest' : 'guests'}
          </div>
        </button>
        
        {showGuestDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Guests</h3>
                <p className="text-sm text-gray-500">Maximum of 16 guests</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGuestChange('decrement');
                  }}
                  className={`p-1 rounded-full border ${
                    guests <= 1 ? 'border-gray-200 text-gray-300' : 'border-gray-400 text-gray-700 hover:border-gray-600'
                  }`}
                  disabled={guests <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-medium">{guests}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGuestChange('increment');
                  }}
                  className={`p-1 rounded-full border ${
                    guests >= 16 ? 'border-gray-200 text-gray-300' : 'border-gray-400 text-gray-700 hover:border-gray-600'
                  }`}
                  disabled={guests >= 16}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <button
                type="button"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                onClick={() => setShowGuestDropdown(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reserve Button */}
      <button 
        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg text-center hover:from-rose-600 hover:to-pink-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        onClick={() => {}}
      >
        Reserve
      </button>

      <p className="text-center text-sm text-gray-500 mt-3">
        You won't be charged yet
      </p>

      {/* Price Breakdown */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            ${price.toLocaleString()} x {totalNights} {totalNights === 1 ? 'night' : 'nights'}
          </span>
          <span>${(price * totalNights).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Cleaning fee</span>
          <span>${cleaningFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service fee</span>
          <span>${serviceFee.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BookingSection;
