import { createContext, useContext } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ value, children }) => {
    return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export const useAppointmentContext = () => {
    return useContext(AppointmentContext);
};
