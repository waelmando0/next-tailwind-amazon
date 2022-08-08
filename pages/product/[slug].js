import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../utils/data';
import ReactStars from 'react-stars';

const ProductScreen = () => {
	const { query } = useRouter();
	const { slug } = query;
	const product = data.products.find((x) => x.slug === slug);

	if (!product) {
		return <div>Product Not Found</div>;
	}

	return (
		<section>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<div className='mb-4'>
					<Link href='/'>
						<a className='font-semibold'>← back to products</a>
					</Link>
				</div>
				<div className='grid md:grid-cols-3 gap-4 md:gap-8'>
					<div className='md:col-span-2'>
						<Image
							src={product.image}
							alt={product.name}
							width={640}
							height={640}
							layout='responsive'
						/>
					</div>
					<div>
						<ul>
							<li>
								<h1 className='text-2xl font-semibold'>{product.name}</h1>
							</li>
							<li className='mt-2 text-lg font-medium text-gray-500 '>
								{product.category}
							</li>
							<li className='mt-2 font-medium'>
								{product.rating} of {product.numReviews} reviews
								<ReactStars
									count={5}
									value={product.rating}
									size={24}
									color2={'#ffd700'}
								/>
							</li>
							<li className='mt-2'>
								{product.description} Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Ipsa veniam dicta beatae eos ex error culpa
								delectus rem tenetur, architecto quam nesciunt, dolor veritatis
								nisi minus inventore, rerum at recusandae?
							</li>
						</ul>
						<div className='bg-black text-gray-200 rounded px-4 py-8 mt-8 font-medium'>
							<div className='mb-2 flex justify-between'>
								<div>Price</div>
								<div className='text-lg'>${product.price}</div>
							</div>
							<div className='mb-4 flex justify-between'>
								<div>Status</div>
								<div>
									{product.countInStock > 0 ? 'In Stock' : 'Unavaliable'}
								</div>
							</div>
							<button className='block bg-white hover:bg-gray-100 text-black w-full py-2 rounded '>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductScreen;
