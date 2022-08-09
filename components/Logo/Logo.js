import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Logo() {
	return (
		<Link href='/'>
			<a className='text-xl font-bold'>NIKE</a>
		</Link>
	);
}

export default Logo;
