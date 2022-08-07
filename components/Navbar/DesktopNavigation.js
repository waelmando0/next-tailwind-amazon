import Link from 'next/link';
import React from 'react';

const NavLink = ({ href, text }) => {
	return (
		<li>
			<Link href={href}>
				<a className='py-2 px-4  hover:text-black'>{text}</a>
			</Link>
		</li>
	);
};

const DesktopNavigation = () => {
	return (
		<nav className='hidden md:flex'>
			<ul className='flex items-center justify-center'>
				<NavLink href='/cart' text='Cart' />
				<NavLink href='/login' text='Login' />
			</ul>
		</nav>
	);
};

export default DesktopNavigation;
