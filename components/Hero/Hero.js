import React from 'react';

const Hero = () => {
	return (
		<section>
			<div className='py-36 md:py-16'>
				<div className='max-w-md md:max-w-xl'>
					<h1 className='text-4xl leading-9 md:text-5xl md:leading-tight'>
						Front-End Ui Developer <br />
						Designing Websites / apps
					</h1>
					<p className='text-base leading-6 tracking-wide	opacity-80 mt-6'>
						If you’re looking for a freelance designer to help bring an idea to
						life and you’re on a tight timeline—let’s jam.
					</p>
				</div>
				<div className='hidden md:inline-block mt-10'>
					<a
						href='mailto:wmmando@gmail.com'
						target='_blank'
						className='inline-block leading-[50px] rounded-3xl px-8 bg-white hover:opacity-80 text-gray-900 font-medium mr-8'
					>
						wmmando@gmail.com
					</a>
					<a
						href='tel:wmmando@gmail.com'
						target='_blank'
						className='inline-block leading-[50px]'
					>
						text (011) 568-130 64
					</a>
				</div>
				<div className='text-xs mt-5 flex items-center'>
					<span className='bg-[#95cd71] w-2.5 h-2.5 rounded-full mr-2.5'></span>
					<span className='opacity-80 tracking-wide'>
						Available for Freelance / Remotly
					</span>
				</div>
			</div>
		</section>
	);
};

export default Hero;
