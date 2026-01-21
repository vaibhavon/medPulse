const KEY = "medpulse_patients";

/* ---------- GET ---------- */
export const getPatients = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

/* ---------- SAVE ---------- */
export const savePatients = (patients) => {
  localStorage.setItem(KEY, JSON.stringify(patients));
};

/* ---------- ADD ---------- */
export const addPatient = (patient) => {
  const patients = getPatients();
  patients.push({ 
    ...patient, 
    history: [],
    nextAppointment: null
  });
  savePatients(patients);
};

/* ---------- GET BY ID ---------- */
export const getPatientById = (id) => {
  return getPatients().find(p => p.id === id);
};

/* ---------- UPDATE ---------- */
export const updatePatient = (updatedPatient) => {
  const patients = getPatients().map(p =>
    p.id === updatedPatient.id ? updatedPatient : p
  );
  savePatients(patients);
};

/* ---------- DELETE ---------- */
export const deletePatient = (id) => {
  const patients = getPatients().filter(p => p.id !== id);
  savePatients(patients);
};

/* ---------- MEDICAL HISTORY ---------- */
export const addMedicalHistory = (id, record) => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === id);

  if (index === -1) return;

  patients[index].history.push(record);
  savePatients(patients);
};

/* ---------- GET MEDICAL HISTORY ---------- */
export const getMedicalHistory = (id) => {
  const patient = getPatientById(id);
  return patient ? patient.history : [];
};
