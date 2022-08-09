import Head from 'next/head';
import ProductItem from '../components/Product/ProductItem';
import data from '../utils/data';

function Home({ products }) {
	return (
		<section>
			<Head>
				<title>NIKE</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<div className='grid grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 md:grid-cols-3'>
					{data.products.map((product) => (
						<ProductItem product={product} key={product.slug} />
					))}
				</div>
			</div>
		</section>
	);
}

export default Home;
