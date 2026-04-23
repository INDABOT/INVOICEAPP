import React, { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const { filterStatus, setFilterStatus } = useInvoices();

  const statuses = ['draft', 'pending', 'paid'];

  const handleSelect = (status) => {
    // If clicking the same status, clear the filter (show all)
    if (filterStatus === status) {
      setFilterStatus(null);
    } else {
      setFilterStatus(status);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-sm font-bold text-ink-dark dark:text-ink-light"
      >
        Filter <span className="hidden md:inline">by status</span>
        <svg 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          width="11" height="7" viewBox="0 0 11 7" fill="none"
        >
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-10 left-1/2 w-40 -translate-x-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-dark-border z-20">
          <ul className="flex flex-col gap-4">
            {statuses.map((status) => (
              <li key={status} className="flex items-center gap-3 group cursor-pointer" onClick={() => handleSelect(status)}>
                {/* Custom Checkbox */}
                <div className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                  filterStatus === status ? 'bg-primary border-primary' : 'bg-ink-blueish dark:bg-dark border-transparent group-hover:border-primary'
                }`}>
                  {filterStatus === status && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4.5l2.121 2.121 4.95-4.95" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                  )}
                </div>
                <span className="text-sm font-bold capitalize text-ink-dark dark:text-ink-light">
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}