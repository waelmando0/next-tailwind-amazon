import Head from 'next/head';
import ProductItem from '../components/Product/ProductItem';
import data from '../utils/data';
import Product from '../models/Product';
import db from '../utils/db';
import { useContext } from 'react';
import { Store } from '../utils/store';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home({ products }) {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const addToCartHandler = async (product) => {
		const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (product.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock');
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
		toast.success('Product added to the cart');
	};

	return (
		<section>
			<Head>
				<title>NIKE</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<div className='grid grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 md:grid-cols-3'>
					{products.map((product) => (
						<ProductItem
							product={product}
							key={product.slug}
							addToCartHandler={addToCartHandler}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
export default Home;

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
