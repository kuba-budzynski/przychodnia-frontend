import 'react-notifications-component/dist/theme.css';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/globals.css';

import ReactNotification from 'react-notifications-component';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
    return (
        <div className="app-container">
            <UserProvider>
                <ReactNotification />
                <Component {...pageProps} />
            </UserProvider>
        </div>
    );
}

export default MyApp;
