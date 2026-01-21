const KEY = "medpulse_inquiries";

/* GET */
export const getInquiries = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

/* SAVE */
export const saveInquiries = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));

/* ADD */
export const addInquiry = (inquiry) => {
  const data = getInquiries();
  data.push(inquiry);
  saveInquiries(data);
};

/* UPDATE STATUS */
export const updateInquiry = (updated) => {
  const data = getInquiries().map(q =>
    q.id === updated.id ? updated : q
  );
  saveInquiries(data);
};

/* DELETE */
export const deleteInquiry = (id) => {
  const data = getInquiries().filter(q => q.id !== id);
  saveInquiries(data);
};
