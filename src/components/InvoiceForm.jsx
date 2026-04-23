import React, { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';

export default function InvoiceForm({ isOpen, setIsOpen, editInvoice = null }) {
  const { addInvoice, updateInvoice } = useInvoices();

  const [formData, setFormData] = useState(editInvoice || {
    id: Math.random().toString(36).substr(2, 6).toUpperCase(),
    clientName: '',
    clientEmail: '',
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    clientAddress: { street: '', city: '', postCode: '', country: '' },
    createdAt: new Date().toISOString().split('T')[0],
    paymentTerms: 30,
    description: '',
    items: [],
    status: 'pending',
    total: 0
  });

  // New State to track validation errors
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const updateNested = (section, field, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    // Clear error as user types
    if (errors[`${section}.${field}`]) setErrors(prev => ({ ...prev, [`${section}.${field}`]: null }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setFormData({ ...formData, items: newItems, total: newItems.reduce((acc, i) => acc + i.total, 0) });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { name: '', quantity: 1, price: 0, total: 0 }] });
    if (errors.items) setErrors(prev => ({ ...prev, items: null }));
  };

  // --- VALIDATION ENGINE ---
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const checkEmpty = (val, key) => {
      if (!val || val.toString().trim() === '') {
        newErrors[key] = "can't be empty";
        isValid = false;
      }
    };

    // Check all nested and top-level fields
    checkEmpty(formData.senderAddress.street, 'senderAddress.street');
    checkEmpty(formData.senderAddress.city, 'senderAddress.city');
    checkEmpty(formData.senderAddress.postCode, 'senderAddress.postCode');
    checkEmpty(formData.senderAddress.country, 'senderAddress.country');
    
    checkEmpty(formData.clientName, 'clientName');
    checkEmpty(formData.clientEmail, 'clientEmail');
    checkEmpty(formData.clientAddress.street, 'clientAddress.street');
    checkEmpty(formData.clientAddress.city, 'clientAddress.city');
    checkEmpty(formData.clientAddress.postCode, 'clientAddress.postCode');
    checkEmpty(formData.clientAddress.country, 'clientAddress.country');
    
    checkEmpty(formData.createdAt, 'createdAt');
    checkEmpty(formData.description, 'description');

    // Check if items exist
    if (formData.items.length === 0) {
      newErrors.items = "- An item must be added";
      isValid = false;
    } else {
      // Validate item names (optional strictness, but good practice)
      formData.items.forEach((item, idx) => {
        if (!item.name || item.name.trim() === '') {
          newErrors[`items.${idx}.name`] = "can't be empty";
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e, status = 'pending') => {
    e.preventDefault();
    
    // ONLY validate if we are NOT saving as a draft
    if (status !== 'draft') {
      if (!validateForm()) return; 
    }

    const finalData = { ...formData, status };
    editInvoice ? updateInvoice(finalData) : addInvoice(finalData);
    setIsOpen(false);
  };

  // --- UI HELPERS ---
  // A mini-component to keep our JSX clean and automatically render red text
  const Label = ({ text, errorKey }) => (
    <div className="flex items-center justify-between mb-2">
      <label className={`text-sm font-medium ${errors[errorKey] ? 'text-danger' : 'text-ink-gray dark:text-ink-blueish'}`}>
        {text}
      </label>
      {errors[errorKey] && <span className="text-[10px] font-bold text-danger">{errors[errorKey]}</span>}
    </div>
  );

  // Helper to add the red border if an error exists
  const getInputClass = (errorKey) => {
    return `input ${errors[errorKey] ? 'border-danger focus:border-danger outline-none ring-1 ring-danger' : ''}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-[72px] z-40 flex lg:left-[103px] lg:top-0">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative flex h-full w-full max-w-[719px] flex-col bg-white shadow-2xl dark:bg-dark lg:rounded-r-3xl transition-colors">
        
        <div className="flex-1 overflow-y-auto p-6 md:p-14">
          <h2 className="mb-12 text-2xl font-bold text-ink-dark dark:text-ink-light">
            {editInvoice ? `Edit #${editInvoice.id}` : 'New Invoice'}
          </h2>

          <form className="space-y-12 pb-10">
            {/* BILL FROM */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-primary">Bill From</h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div className="col-span-2 md:col-span-3">
                  <Label text="Street Address" errorKey="senderAddress.street" />
                  <input type="text" className={getInputClass('senderAddress.street')} value={formData.senderAddress.street} onChange={(e) => updateNested('senderAddress', 'street', e.target.value)} />
                </div>
                <div className="col-span-1">
                  <Label text="City" errorKey="senderAddress.city" />
                  <input type="text" className={getInputClass('senderAddress.city')} value={formData.senderAddress.city} onChange={(e) => updateNested('senderAddress', 'city', e.target.value)} />
                </div>
                <div className="col-span-1">
                  <Label text="Post Code" errorKey="senderAddress.postCode" />
                  <input type="text" className={getInputClass('senderAddress.postCode')} value={formData.senderAddress.postCode} onChange={(e) => updateNested('senderAddress', 'postCode', e.target.value)} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label text="Country" errorKey="senderAddress.country" />
                  <input type="text" className={getInputClass('senderAddress.country')} value={formData.senderAddress.country} onChange={(e) => updateNested('senderAddress', 'country', e.target.value)} />
                </div>
              </div>
            </section>

            {/* BILL TO */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-primary">Bill To</h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div className="col-span-2 md:col-span-3">
                  <Label text="Client's Name" errorKey="clientName" />
                  <input type="text" className={getInputClass('clientName')} value={formData.clientName} onChange={(e) => { setFormData({...formData, clientName: e.target.value}); setErrors({...errors, clientName: null}); }} />
                </div>
                <div className="col-span-2 md:col-span-3">
                  <Label text="Client's Email" errorKey="clientEmail" />
                  <input type="email" className={getInputClass('clientEmail')} value={formData.clientEmail} onChange={(e) => { setFormData({...formData, clientEmail: e.target.value}); setErrors({...errors, clientEmail: null}); }} />
                </div>
                <div className="col-span-2 md:col-span-3">
                  <Label text="Street Address" errorKey="clientAddress.street" />
                  <input type="text" className={getInputClass('clientAddress.street')} value={formData.clientAddress.street} onChange={(e) => updateNested('clientAddress', 'street', e.target.value)} />
                </div>
                <div className="col-span-1">
                  <Label text="City" errorKey="clientAddress.city" />
                  <input type="text" className={getInputClass('clientAddress.city')} value={formData.clientAddress.city} onChange={(e) => updateNested('clientAddress', 'city', e.target.value)} />
                </div>
                <div className="col-span-1">
                  <Label text="Post Code" errorKey="clientAddress.postCode" />
                  <input type="text" className={getInputClass('clientAddress.postCode')} value={formData.clientAddress.postCode} onChange={(e) => updateNested('clientAddress', 'postCode', e.target.value)} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label text="Country" errorKey="clientAddress.country" />
                  <input type="text" className={getInputClass('clientAddress.country')} value={formData.clientAddress.country} onChange={(e) => updateNested('clientAddress', 'country', e.target.value)} />
                </div>
              </div>
            </section>

            {/* DATES & DESCRIPTION */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label text="Invoice Date" errorKey="createdAt" />
                <input type="date" className={getInputClass('createdAt')} value={formData.createdAt} onChange={(e) => setFormData({...formData, createdAt: e.target.value})} />
              </div>
              <div>
                <Label text="Payment Terms" errorKey="paymentTerms" />
                <select className="input" value={formData.paymentTerms} onChange={(e) => setFormData({...formData, paymentTerms: Number(e.target.value)})}>
                  <option value={1}>Net 1 Day</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={30}>Net 30 Days</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label text="Project Description" errorKey="description" />
                <input type="text" className={getInputClass('description')} value={formData.description} onChange={(e) => { setFormData({...formData, description: e.target.value}); setErrors({...errors, description: null}); }} />
              </div>
            </div>

            {/* ITEM LIST */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-[#777F98]">Item List</h3>
              {formData.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 items-end gap-4">
                  <div className="col-span-12 md:col-span-4">
                    <Label text="Item Name" errorKey={`items.${idx}.name`} />
                    <input type="text" className={getInputClass(`items.${idx}.name`)} value={item.name} onChange={(e) => updateItem(idx, 'name', e.target.value)} />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <div className="mb-2 block text-sm font-medium text-ink-gray dark:text-ink-blueish">Qty.</div>
                    <input type="number" className="input px-2" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', Number(e.target.value))} />
                  </div>
                  <div className="col-span-4 md:col-span-3">
                    <div className="mb-2 block text-sm font-medium text-ink-gray dark:text-ink-blueish">Price</div>
                    <input type="number" className="input px-2" value={item.price} onChange={(e) => updateItem(idx, 'price', Number(e.target.value))} />
                  </div>
                  <div className="col-span-3 pb-4 font-bold text-ink-gray md:col-span-2">
                    {(item.quantity * item.price).toFixed(2)}
                  </div>
                  <button type="button" onClick={() => setFormData({...formData, items: formData.items.filter((_, i) => i !== idx)})} className="col-span-1 flex justify-center pb-4 text-ink-gray hover:text-danger">
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor"><path d="M11.583 3.556v10.667c0 .896-.728 1.623-1.624 1.623H3.04a1.623 1.623 0 01-1.623-1.623V3.556h10.166zm-6.22 2.73a.75.75 0 00-.75.75v5.556a.75.75 0 001.5 0V7.036a.75.75 0 00-.75-.75zm3.11 0a.75.75 0 00-.75.75v5.556a.75.75 0 001.5 0V7.036a.75.75 0 00-.75-.75zM10.14 1.15l.394.394h2.153v1.5H.312v-1.5h2.153l.394-.394h5.13z"/></svg>
                  </button>
                </div>
              ))}
              <button type="button" onClick={addItem} className="w-full rounded-full bg-[#F9FAFE] py-4 font-bold text-ink-purple transition-colors hover:bg-ink-blueish dark:bg-dark-border dark:text-ink-blueish">
                + Add New Item
              </button>
              
              {/* GLOBAL ERRORS */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-8 text-[10px] font-bold text-danger">
                  {Object.keys(errors).some(k => k !== 'items' && !k.startsWith('items.')) && <p>- All fields must be added</p>}
                  {errors.items && <p>{errors.items}</p>}
                </div>
              )}
            </section>
          </form>
        </div>

        {/* STICKY FOOTER */}
        <div className="flex items-center justify-between bg-white p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] dark:bg-dark-surface md:px-14 lg:rounded-br-3xl transition-colors">
          {editInvoice ? (
            <>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-light px-6 py-4 text-sm font-bold text-ink-purple dark:bg-dark-border dark:text-ink-blueish">Cancel</button>
              <button type="button" onClick={(e) => handleSubmit(e, formData.status)} className="rounded-full bg-primary px-6 py-4 text-sm font-bold text-white hover:bg-primary-hover">Save Changes</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full bg-light px-6 py-4 text-sm font-bold text-ink-purple">Discard</button>
              <div className="flex gap-2">
                <button type="button" onClick={(e) => handleSubmit(e, 'draft')} className="rounded-full bg-[#373B53] px-4 py-4 text-sm font-bold text-ink-gray md:px-6 hover:bg-ink-dark">Save as Draft</button>
                <button type="button" onClick={(e) => handleSubmit(e, 'pending')} className="rounded-full bg-primary px-4 py-4 text-sm font-bold text-white md:px-6 hover:bg-primary-hover">Save & Send</button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}