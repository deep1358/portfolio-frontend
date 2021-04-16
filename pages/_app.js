import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import "react-datepicker/dist/react-datepicker.css"
import "react-toastify/dist/ReactToastify.css"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function MyApp({ Component, pageProps }) {
  // console.log(process.env.AUTH0_CLIENT_SECRET);
  return <Component {...pageProps} />;
}

export default MyApp;
