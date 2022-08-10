import Header from './Header/Header';
import Footer from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
	return (
		<div className='flex flex-col overflow-hidden min-h-screen'>
			<ToastContainer position='bottom-center' limit={1} />

			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default Layout;
