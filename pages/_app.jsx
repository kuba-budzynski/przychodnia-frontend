import '../styles/globals.css'
import 'react-vertical-timeline-component/style.min.css';
import 'react-notifications-component/dist/theme.css'
import ReactNotification from 'react-notifications-component'

function MyApp({ Component, pageProps }) {
  return(
    <div className="app-container">
      <ReactNotification />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
