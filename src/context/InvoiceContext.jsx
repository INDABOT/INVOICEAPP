import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialInvoices } from '../Data/data';

// 1. Create the Context
const InvoiceContext = createContext();

// 2. Create the Provider Component
export function InvoiceProvider({ children }) {
  // Initialize state from LocalStorage, or fallback to our dummy data
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialInvoices;
  });

  // State for the status filter (null means 'show all')
  const [filterStatus, setFilterStatus] = useState(null);

  // Auto-save to LocalStorage whenever the 'invoices' array changes
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Derived state: The list of invoices currently matching the filter
  const filteredInvoices = invoices.filter(invoice => {
    if (!filterStatus) return true;
    return invoice.status === filterStatus;
  });

  // --- CRUD Operations (We will flesh these out later, but we need the shells now) ---
  const addInvoice = (newInvoice) => setInvoices([...invoices, newInvoice]);
  const updateInvoice = (updatedInvoice) => setInvoices(invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
  const deleteInvoice = (id) => setInvoices(invoices.filter(inv => inv.id !== id));

  return (
    <InvoiceContext.Provider value={{
      invoices: filteredInvoices, // We provide the filtered list to the UI
      allInvoicesLength: invoices.length, // Useful for the header count
      filterStatus,
      setFilterStatus,
      addInvoice,
      updateInvoice,
      deleteInvoice
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

// 3. Custom Hook for easy access in any component
export function useInvoices() {
  return useContext(InvoiceContext);
}