import Link from 'next/link';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

const MobileNavigation = () => {
	return (
		<nav className='flex md:hidden'>
			<Popover>
				{({ open, close }) => (
					<>
						<Popover.Button className='relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none'>
							<span className='sr-only'>Toggle Navigation</span>
							<svg
								aria-hidden='true'
								className='h-3.5 w-3.5 overflow-visible stroke-gray-900'
								fill='none'
								strokeWidth={2}
								strokeLinecap='round'
							>
								<path
									d='M0 1H14M0 7H14M0 13H14'
									className={clsx('origin-center transition', {
										'scale-90 opacity-0': open,
									})}
								/>
								<path
									d='M2 2L12 12M12 2L2 12'
									className={clsx('origin-center transition', {
										'scale-90 opacity-0': !open,
									})}
								/>
							</svg>
						</Popover.Button>
						<Transition.Root>
							<Transition.Child
								as={Fragment}
								enter='duration-150 ease-out'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='duration-150 ease-in'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Popover.Overlay className='fixed inset-0 bg-gray-500/50' />
							</Transition.Child>
							<Transition.Child
								as={Fragment}
								enter='duration-150 ease-out'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='duration-100 ease-in'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Popover.Panel
									as='ul'
									className='absolute inset-x-0 top-16 mt-8 origin-top space-y-4 rounded-xl bg-white p-6 text-lg tracking-tight text-gray-900 shadow-xl ring-1 ring-gray-900/5 mx-5'
								>
									<li>
										<Link href='cart'>
											<a className='block w-full' onClick={() => close()}>
												Cart
											</a>
										</Link>
									</li>
									<li className='border-t border-gray-300/40 pt-4 '>
										<Link href='login'>
											<a className='block w-full' onClick={() => close()}>
												Login
											</a>
										</Link>
									</li>
								</Popover.Panel>
							</Transition.Child>
						</Transition.Root>
					</>
				)}
			</Popover>
		</nav>
	);
};

export default MobileNavigation;
