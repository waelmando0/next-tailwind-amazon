import Link from 'next/link';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Store } from '../../utils/store';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function DesktopNavigation() {
	const { status, data: session } = useSession();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		dispatch({ type: 'CART_RESET' });
		signOut({ callbackUrl: '/login' });
	};

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
					{status === 'loading' ? (
						'Loading'
					) : session?.user ? (
						<Menu as='div' className='relative inline-block'>
							<Menu.Button className='text-blue-600 py-2 px-4'>
								{session.user.name}
							</Menu.Button>
							<Menu.Items className='absolute right-0 top-8 w-56 origin-top-right bg-white border border-gray-100 shadow-lg rounded'>
								<Menu.Item className='hover:bg-gray-200 inline-block w-full px-4 py-2 border-b border-gray-100'>
									<DropdownLink className='drowdown-link' href='/profile'>
										Profile
									</DropdownLink>
								</Menu.Item>
								<Menu.Item className='hover:bg-gray-200 inline-block w-full px-4 py-2 border-b border-gray-100'>
									<DropdownLink className='drowdown-link' href='/order-history'>
										Order History
									</DropdownLink>
								</Menu.Item>
								<Menu.Item className='hover:bg-gray-200 inline-block w-full px-4 py-2'>
									<a href='#' onClick={logoutClickHandler} className='dropdown'>
										Logout
									</a>
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<Link href='/login'>
							<a className='py-2 px-4  hover:text-black'>Login</a>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default DesktopNavigation;
