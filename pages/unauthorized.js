import { useRouter } from 'next/router';
import React from 'react';

export default function unauthorized() {
	const router = useRouter();
	const { message } = router.query;
	return (
		<secion>
			<div className='py-16 lg:mx-16'>
				<h1>Access Denied</h1>
				{message && <div className='mb-4 text-red-500'>{message}</div>}
			</div>
		</secion>
	);
}
