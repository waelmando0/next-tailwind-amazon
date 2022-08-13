import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/store';
import Head from 'next/head';

export default function placeOrder() {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	const itemsPrice = round2(
		cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	); // 123.4567 => 123.46

	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = round2(itemsPrice * 0.15);
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	const router = useRouter();
	useEffect(() => {
		if (!paymentMethod) {
			router.push('/payment');
		}
	}, [paymentMethod, router]);

	const [loading, setLoading] = useState(false);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post('/api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			});
			setLoading(false);
			dispatch({ type: 'CART_CLEAR_ITEMS' });
			Cookies.set(
				'cart',
				JSON.stringify({
					...cart,
					cartItems: [],
				})
			);
			router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			toast.error(getError(err));
		}
	};

	return (
		<section>
			<Head>
				<title>Place Order</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<CheckoutWizard activeStep={3} />
				<h1 className='mb-4 text-xl font-medium'>Place order</h1>
				{cartItems.length === 0 ? (
					<div>
						Cart is empty. <Link href='/'>Go Shopping</Link>
					</div>
				) : (
					<div className='grid md:grid-cols-4 md:gap-4'>
						<div className='overflow-x-auto md:col-span-3 space-y-4'>
							<div className='p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg font-medium'>Shipping address</h2>
								<div>
									{shippingAddress.fullName}, {shippingAddress.address},{' '}
									{shippingAddress.city}, {shippingAddress.postalCode},{' '}
									{shippingAddress.country}
								</div>
								<div className='mt-2'>
									<Link href='/shipping'>
										<a className='text-blue-600 font-medium'>Edit</a>
									</Link>
								</div>
							</div>
							<div className='p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg font-medium'>Payment Method</h2>
								<div>{paymentMethod}</div>
								<div className='mt-2'>
									<Link href='/payment'>
										<a className='text-blue-600 font-medium'>Edit</a>
									</Link>
								</div>
							</div>
							<div className='overflow-x-auto p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg font-medium'>Order Items</h2>
								<table className='min-w-full'>
									<thead className='border-b'>
										<tr>
											<th className='px-5 text-left'>Item</th>
											<th className='px-5 text-center'>Quantity</th>
											<th className='px-5 text-center'>Price</th>
											<th className='px-5'>Action</th>
										</tr>
									</thead>
									<tbody>
										{cartItems.map((item) => (
											<tr key={item._id} className='border-b'>
												<td>
													<Link href={`/product/${item.slug}`}>
														<a className='flex items-center'>
															<Image
																src={item.image}
																alt={item.name}
																width={50}
																height={50}
															/>
															&nbsp;
															{item.name}
														</a>
													</Link>
												</td>
												<td className='p-5 text-center'>{item.quantity}</td>
												<td className='p-5 text-center'>{item.price}</td>
												<td className='p-5 text-center'>
													${item.quantity * item.price}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<div className='mt-2'>
									<Link href='/cart'>
										<a className='text-blue-600 font-medium'>Edit</a>
									</Link>
								</div>
							</div>
						</div>
						<div>
							<div className='p-5 bg-black/75 text-white'>
								<h2 className='mb-2 text-lg font-medium'>Order Summary</h2>
								<ul>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>Items</div>
											<div>${itemsPrice}</div>
										</div>
									</li>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>Tax</div>
											<div>${taxPrice}</div>
										</div>
									</li>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>Shipping</div>
											<div>${shippingPrice}</div>
										</div>
									</li>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>Total</div>
											<div>${totalPrice}</div>
										</div>
									</li>
									<li>
										<button
											disabled={loading}
											onClick={placeOrderHandler}
											className='block font-medium bg-white hover:bg-gray-100 text-black w-full py-2 rounded'
										>
											{loading ? 'Loading...' : 'Place Order'}
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

placeOrder.auth = true;
