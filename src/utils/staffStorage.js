const KEY = "medpulse_staff";

/* ---------- GET ---------- */
export const getStaff = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

/* ---------- SAVE ---------- */
export const saveStaff = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

/* ---------- ADD ---------- */
export const addStaff = (member) => {
  const data = getStaff();
  data.push(member);
  saveStaff(data);
};

/* ---------- GET BY ID ---------- */
export const getStaffById = (id) => {
  return getStaff().find(s => s.id === id);
};

/* ---------- UPDATE ---------- */
export const updateStaff = (updated) => {
  const data = getStaff().map(s =>
    s.id === updated.id ? updated : s
  );
  saveStaff(data);
};

/* ---------- DELETE ---------- */
export const deleteStaff = (id) => {
  const data = getStaff().filter(s => s.id !== id);
  saveStaff(data);
};
