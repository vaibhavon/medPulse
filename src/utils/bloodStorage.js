const BLOOD_KEY = "medpulse_blood_stock";
const DONOR_KEY = "medpulse_blood_donors";

/* -------- BLOOD STOCK -------- */

export const getBloodStock = () =>
  JSON.parse(localStorage.getItem(BLOOD_KEY)) || [];

export const saveBloodStock = (data) =>
  localStorage.setItem(BLOOD_KEY, JSON.stringify(data));

export const updateBloodUnit = (type, units) => {
  const stock = getBloodStock();
  const index = stock.findIndex(b => b.type === type);

  if (index !== -1) stock[index].units = units;
  else stock.push({ type, units });

  saveBloodStock(stock);
};

/* -------- DONORS -------- */

export const getDonors = () =>
  JSON.parse(localStorage.getItem(DONOR_KEY)) || [];

export const saveDonors = (data) =>
  localStorage.setItem(DONOR_KEY, JSON.stringify(data));

export const addDonor = (donor) => {
  const donors = getDonors();
  donors.push(donor);
  saveDonors(donors);
};

export const deleteDonor = (id) => {
  const donors = getDonors().filter(d => d.id !== id);
  saveDonors(donors);
};
