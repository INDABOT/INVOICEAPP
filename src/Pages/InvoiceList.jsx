import React, { useState } from 'react';
import InvoiceCard from '../components/InvoiceCard';
import Filter from '../components/Filter';
import InvoiceForm from '../components/InvoiceForm';
import { useInvoices } from '../context/InvoiceContext';

export default function InvoiceList() {
  const { invoices, allInvoicesLength } = useInvoices();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header Section - Matches Page 2 & 10 of Figma */}
      <header className="mb-14 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink-dark dark:text-ink-light md:text-4xl">Invoices</h1>
          <p className="mt-2 text-sm font-medium text-ink-gray">
            <span className="hidden md:inline">There are </span>{allInvoicesLength} total invoices.
          </p>
        </div>
        
        <div className="flex items-center gap-4 md:gap-10">
          <Filter />
          
          <button onClick={() => setIsFormOpen(true)}  className="flex items-center gap-2 rounded-full bg-primary p-2 pr-4 text-sm font-bold text-white transition-colors hover:bg-primary-hover md:gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71h2.58z" fill="currentColor"/></svg>
            </div>
            New <span className="hidden md:inline">Invoice</span>
          </button>
        </div>
      </header>

      {/* Invoice List Area */}
      <div className="flex-1">
        {invoices.length > 0 ? (
          invoices.map(invoice => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        ) : (
          /* Empty State - Matches Page 3 & 11 */
          <div className="mt-20 flex flex-col items-center text-center">
            <div className="mb-10 h-48 w-60 bg-ink-blueish/20 rounded-3xl flex items-center justify-center text-ink-gray">Empty State Graphic</div>
            <h2 className="mb-6 text-2xl font-bold text-ink-dark dark:text-ink-light">There is nothing here</h2>
            <p className="text-ink-gray max-w-[220px]">Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started</p>
          </div>
        )}
      </div>

      {/* Invoice Form Slide-out */}
      <InvoiceForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  );
}