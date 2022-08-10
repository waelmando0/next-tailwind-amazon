import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../utils/store';
import { SessionProvider, useSession } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				<Layout>
					<main className='flex-grow'>
						<div className='max-w-6xl mx-auto px-5 md:px-6'>
							<Component {...pageProps} />
						</div>
					</main>
				</Layout>
			</StoreProvider>
		</SessionProvider>
	);
}

export default MyApp;
