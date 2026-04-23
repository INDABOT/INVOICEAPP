import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, invoiceId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-6 animate-fade-in">
      {/* Background click closes the modal */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-[480px] rounded-lg bg-white p-8 shadow-2xl dark:bg-dark-surface md:p-12">
        <h2 className="mb-4 text-2xl font-bold text-ink-dark dark:text-ink-light">
          Confirm Deletion
        </h2>
        
        <p className="mb-8 text-sm leading-loose text-ink-gray dark:text-ink-blueish">
          Are you sure you want to delete invoice <span className="font-bold text-ink-dark dark:text-ink-light">#{invoiceId}</span>? This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="rounded-full bg-light px-6 py-4 text-sm font-bold text-ink-purple transition-colors hover:bg-ink-blueish dark:bg-dark-border dark:text-ink-blueish dark:hover:bg-white"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="rounded-full bg-danger px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-danger-hover"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}