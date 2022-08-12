import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../utils/store';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<StoreProvider>
				{Component.auth ? (
					<Auth>
						<Layout>
							<main className='flex-grow'>
								<div className='max-w-6xl mx-auto px-5 md:px-6'>
									<Component {...pageProps} />
								</div>
							</main>
						</Layout>
					</Auth>
				) : (
					<Layout>
						<main className='flex-grow'>
							<div className='max-w-6xl mx-auto px-5 md:px-6'>
								<Component {...pageProps} />
							</div>
						</main>
					</Layout>
				)}
			</StoreProvider>
		</SessionProvider>
	);
}

function Auth({ children }) {
	const router = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/unauthorized?message=login required');
		},
	});

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return children;
}

export default MyApp;
