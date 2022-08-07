import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<main className='flex-grow'>
				<div className='max-w-6xl mx-auto px-5 md:px-6'>
					<Component {...pageProps} />
				</div>
			</main>
		</Layout>
	);
}

export default MyApp;
