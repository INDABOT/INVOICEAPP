import React from 'react';
import { Link } from 'react-router-dom';

export default function InvoiceCard({ invoice }) {
  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  // Dynamic styling for the Status Badge
  const statusStyles = {
    paid: 'bg-status-paid/10 text-status-paid',
    pending: 'bg-status-pending/10 text-status-pending',
    draft: 'bg-status-draft-light/10 text-status-draft-light dark:bg-status-draft-dark/10 dark:text-status-draft-dark',
  };

  return (
    // Wrapped the entire card in a Link tag
    <Link to={`/invoice/${invoice.id}`} className="block mb-4 focus:outline-none">
      <div className="group flex cursor-pointer flex-col items-center justify-between rounded-lg bg-light-surface p-6 shadow-sm transition-all hover:border hover:border-primary dark:bg-dark-surface md:flex-row">
        
        {/* Left Section: ID & Date & Name */}
        <div className="flex w-full flex-col md:w-auto md:flex-row md:items-center md:gap-10">
          <div className="flex justify-between md:block">
            <span className="font-bold text-ink-dark dark:text-ink-light">
              <span className="text-ink-purple">#</span>{invoice.id}
            </span>
            <span className="text-sm text-ink-gray dark:text-ink-blueish md:hidden">{invoice.clientName}</span>
          </div>
          
          <div className="mt-4 flex w-full justify-between md:mt-0 md:w-auto md:gap-10">
            <span className="text-sm text-ink-gray dark:text-ink-blueish">
              Due {new Date(invoice.paymentDue).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="hidden text-sm text-ink-gray dark:text-ink-blueish md:block">{invoice.clientName}</span>
          </div>
        </div>

        {/* Right Section: Total & Status */}
        <div className="mt-4 flex w-full items-center justify-between md:mt-0 md:w-auto md:gap-10">
          <span className="text-lg font-bold text-ink-dark dark:text-ink-light">
            {formatCurrency(invoice.total)}
          </span>
          
          <div className="flex items-center gap-5">
            {/* Status Badge */}
            <div className={`flex w-28 items-center justify-center gap-2 rounded-md py-3 text-sm font-bold capitalize ${statusStyles[invoice.status]}`}>
              <span className="h-2 w-2 rounded-full bg-current"></span>
              {invoice.status}
            </div>
            
            {/* Arrow Icon (Hidden on mobile) */}
            <svg className="hidden text-primary transition-transform group-hover:translate-x-1 md:block" width="7" height="10" viewBox="0 0 7 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}