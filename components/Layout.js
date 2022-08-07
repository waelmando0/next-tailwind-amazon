import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
	return (
		<div className='flex flex-col overflow-hidden min-h-screen'>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
