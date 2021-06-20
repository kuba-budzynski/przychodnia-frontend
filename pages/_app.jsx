import 'react-notifications-component/dist/theme.css';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/globals.css';
import 'instantsearch.css/themes/satellite.css';
import { AppointmentProvider } from '../store/AppointmentContext';
import ReactNotification from 'react-notifications-component';
import { UserProvider } from '@auth0/nextjs-auth0';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [appointment, setAppointment] = useState({});
    const update = (newValue) => setAppointment(newValue);

    return (
        <div className="app-container">
            <AppointmentProvider value={{ appointment, update }}>
                <UserProvider>
                    <ReactNotification />
                    <Component {...pageProps} />
                </UserProvider>
            </AppointmentProvider>
        </div>
    );
}

export default MyApp;
