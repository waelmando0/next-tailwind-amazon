import Link from 'next/link';
import Logo from '../Logo/Logo';
import DesktopNavigation from '../Navbar/DesktopNavigation';
import MobileNavigation from '../Navbar/MobileNavigation';

function Header() {
	return (
		<header className='w-full bg-white shadow z-30'>
			<div className='max-w-6xl mx-auto px-5 sm:px-6'>
				<div className='flex items-center justify-between h-16 '>
					{/* Site Branding */}
					<div className='mr-4 flex items-center'>
						<Logo />
					</div>
					{/* Desktop Navigation */}
					<DesktopNavigation />
					{/* Mobile Navigation */}
					<MobileNavigation />
				</div>
			</div>
		</header>
	);
}

export default Header;
