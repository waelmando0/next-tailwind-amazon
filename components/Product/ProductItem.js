import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import ReactStars from 'react-stars';

function ProductItem({ product, addToCartHandler }) {
	return (
		<div>
			<div className='w-full overflow-hidden aspect-w-4 aspect-h-4'>
				<Link href={`/product/${product.slug}`}>
					<a>
						<Image
							className='rounded'
							src={product.image}
							alt={product.name}
							objectFit='cover'
							layout='fill'
							priority
						/>
					</a>
				</Link>
			</div>
			<div className='mt-2'>
				<Link href={`/product/${product.slug}`}>
					<a className='font-semibold'>{product.name}</a>
				</Link>
				<h4 className='text-gray-500'>{product.category}</h4>
				<div className='flex items-center justify-between mt-4'>
					<p className='font-semibold'>${product.price}</p>
					<button
						type='button'
						className='py-1.5 px-3 text-xs md:text-base md:py-2 md:px-4 bg-black text-white hover:opacity-70'
						onClick={() => addToCartHandler(product)}
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductItem;
