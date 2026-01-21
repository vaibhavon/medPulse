const KEY = "medpulse_appointments";

export const getAppointments = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const saveAppointments = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));

export const addAppointment = (appointment) => {
  const data = getAppointments();
  data.push(appointment);
  saveAppointments(data);
};

export const deleteAppointment = (id) => {
  const data = getAppointments().filter(a => a.id !== id);
  saveAppointments(data);
};

export const updateAppointment = (updated) => {
  const data = getAppointments().map(a =>
    a.id === updated.id ? updated : a
  );
  saveAppointments(data);
};
