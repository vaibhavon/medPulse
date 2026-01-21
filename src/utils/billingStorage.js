const KEY = "medpulse_invoices";

/* ---------- GET ---------- */
export const getInvoices = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

/* ---------- SAVE ---------- */
export const saveInvoices = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

/* ---------- ADD ---------- */
export const addInvoice = (invoice) => {
  const data = getInvoices();
  data.push(invoice);
  saveInvoices(data);
};

/* ---------- UPDATE ---------- */
export const updateInvoice = (updated) => {
  const data = getInvoices().map(inv =>
    inv.id === updated.id ? updated : inv
  );
  saveInvoices(data);
};

/* ---------- DELETE ---------- */
export const deleteInvoice = (id) => {
  const data = getInvoices().filter(inv => inv.id !== id);
  saveInvoices(data);
};
