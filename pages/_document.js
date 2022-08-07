import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<title>Amazon</title>
			</Head>
			<body className='bg-gray-200 text-gray-900 tracking-tight'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
