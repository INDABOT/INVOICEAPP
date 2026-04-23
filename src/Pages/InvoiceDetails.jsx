import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInvoices } from '../context/InvoiceContext';
import ConfirmModal from '../components/ConfirmModal';

export default function InvoiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, updateInvoice, deleteInvoice } = useInvoices();
  
  // State to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) return <div className="p-10 text-center">Invoice not found</div>;

  const handleMarkAsPaid = () => {
    updateInvoice({ ...invoice, status: 'paid' });
  };

  // The actual delete execution
  const handleConfirmDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/'); // Kick them back to the dashboard so they don't stare at a blank page
  };

  const statusStyles = {
    paid: 'bg-status-paid/10 text-status-paid',
    pending: 'bg-status-pending/10 text-status-pending',
    draft: 'bg-status-draft-light/10 text-status-draft-light dark:bg-status-draft-dark/10 dark:text-status-draft-dark',
  };

  return (
    <div className="mx-auto w-full max-w-3xl pb-20">
      {/* Go Back Link */}
      <Link to="/" className="mb-8 flex w-max items-center gap-6 text-sm font-bold text-ink-dark transition-colors hover:text-ink-gray dark:text-ink-light">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#7C5DFA" strokeWidth="2"/></svg>
        Go back
      </Link>

      {/* Action Bar */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-light-surface p-6 shadow-sm dark:bg-dark-surface">
        <div className="flex w-full items-center justify-between md:justify-start md:gap-5">
          <span className="text-sm text-ink-gray dark:text-ink-blueish">Status</span>
          <div className={`flex w-28 items-center justify-center gap-2 rounded-md py-3 text-sm font-bold capitalize ${statusStyles[invoice.status]}`}>
            <span className="h-2 w-2 rounded-full bg-current"></span>
            {invoice.status}
          </div>
        </div>
        <div className="hidden gap-2 md:flex">
          <button className="rounded-full bg-[#F9FAFE] px-6 py-4 text-sm font-bold text-ink-purple transition-colors hover:bg-ink-blueish dark:bg-dark-border dark:text-ink-blueish dark:hover:bg-white">Edit</button>
          
          {/* Opens the modal instead of deleting immediately */}
          <button onClick={() => setIsModalOpen(true)} className="rounded-full bg-danger px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-danger-hover">Delete</button>
          
          {invoice.status !== 'paid' && (
            <button onClick={handleMarkAsPaid} className="rounded-full bg-primary px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-hover">Mark as Paid</button>
          )}
        </div>
      </div>

      {/* Invoice Main Card */}
      <div className="rounded-lg bg-light-surface p-6 shadow-sm dark:bg-dark-surface md:p-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-0">
          <div>
            <h1 className="text-lg font-bold text-ink-dark dark:text-ink-light"><span className="text-ink-purple">#</span>{invoice.id}</h1>
            <p className="text-sm text-ink-gray dark:text-ink-blueish">{invoice.description}</p>
          </div>
          <div className="text-sm text-ink-gray dark:text-ink-blueish md:text-right">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-3 text-sm text-ink-gray dark:text-ink-blueish">Invoice Date</h3>
              <p className="text-lg font-bold text-ink-dark dark:text-ink-light">{invoice.createdAt}</p>
            </div>
            <div>
              <h3 className="mb-3 text-sm text-ink-gray dark:text-ink-blueish">Payment Due</h3>
              <p className="text-lg font-bold text-ink-dark dark:text-ink-light">{invoice.paymentDue}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm text-ink-gray dark:text-ink-blueish">Bill To</h3>
            <p className="mb-2 text-lg font-bold text-ink-dark dark:text-ink-light">{invoice.clientName}</p>
            <div className="text-sm text-ink-gray dark:text-ink-blueish">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-3 text-sm text-ink-gray dark:text-ink-blueish">Sent to</h3>
            <p className="text-lg font-bold text-ink-dark dark:text-ink-light break-all">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Item Table */}
        <div className="mt-12 overflow-hidden rounded-t-lg bg-[#F9FAFE] p-6 dark:bg-dark-border md:p-8">
          <table className="w-full text-left">
            <thead>
              <tr className="hidden md:table-row">
                <th className="pb-8 text-sm font-medium text-ink-gray dark:text-ink-blueish">Item Name</th>
                <th className="pb-8 text-center text-sm font-medium text-ink-gray dark:text-ink-blueish">QTY.</th>
                <th className="pb-8 text-right text-sm font-medium text-ink-gray dark:text-ink-blueish">Price</th>
                <th className="pb-8 text-right text-sm font-medium text-ink-gray dark:text-ink-blueish">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="font-bold text-ink-dark dark:text-ink-light">
                  <td className="py-4 md:py-8">{item.name}</td>
                  <td className="hidden text-center text-ink-gray dark:text-ink-blueish md:table-cell">{item.quantity}</td>
                  <td className="hidden text-right text-ink-gray dark:text-ink-blueish md:table-cell">£{item.price.toFixed(2)}</td>
                  <td className="text-right">£{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Total Footer */}
        <div className="flex items-center justify-between rounded-b-lg bg-[#373B53] p-6 text-white dark:bg-ink-dark md:px-8">
          <span className="text-sm font-medium">Amount Due</span>
          <span className="text-2xl font-bold md:text-3xl">£{invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Render the Modal at the bottom of the component */}
      <ConfirmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete} 
        invoiceId={invoice.id} 
      />
    </div>
  );
}