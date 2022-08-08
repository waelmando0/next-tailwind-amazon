import Link from 'next/link';
import React from 'react';
import { useContext } from 'react';
import { Store } from '../../utils/store';

const DesktopNavigation = () => {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	return (
		<nav className='hidden md:flex'>
			<ul className='flex items-center justify-center'>
				<li>
					<Link href='/cart'>
						<a className='py-2 px-4  hover:text-black flex items-center'>
							Cart
							{cart.cartItems.length > 0 && (
								<span className='ml-1 rounded-full bg-red-600 w-6 h-6 text-xs font-bold text-white flex items-center justify-center'>
									{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
								</span>
							)}
						</a>
					</Link>
				</li>
				<li>
					<Link href='/login'>
						<a className='py-2 px-4  hover:text-black'>Login</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default DesktopNavigation;
