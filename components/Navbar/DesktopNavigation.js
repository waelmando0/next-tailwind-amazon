import Link from 'next/link';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../../utils/store';

function DesktopNavigation() {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	return (
		<nav className='hidden md:flex'>
			<ul className='flex items-center justify-center'>
				<li>
					<Link href='/cart'>
						<a className='py-2 px-4  hover:text-black flex items-center'>
							Cart
							{cartItemsCount > 0 && (
								<span className='ml-1 rounded-full bg-red-600 w-6 h-6 text-xs font-bold text-white flex items-center justify-center'>
									{cartItemsCount}
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
}

export default DesktopNavigation;
