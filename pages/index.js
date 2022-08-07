import Head from 'next/head';
import ProductItem from '../components/Product/ProductItem';
import data from '../utils/data';

const Home = ({ products }) => {
	return (
		<section>
			<Head>
				<title>Amazon</title>
			</Head>
			<div className='py-16'>
				<div className='grid grid-cols-2 gap-x-4 gap-y-8 md:gap-y-16 md:grid-cols-3'>
					{data.products.map((product) => (
						<ProductItem product={product} key={product.slug} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Home;
