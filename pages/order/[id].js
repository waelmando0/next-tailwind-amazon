import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, order: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			state;
	}
}

export default function OrderScreen() {
	const { query } = useRouter();
	const orderId = query.id;

	const [{ loading, error, order }, dispatch] = useReducer(reducer, {
		loading: true,
		order: {},
		error: '',
	});
	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`);
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
			}
		};
		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order, orderId]);
	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;

	return (
		<section>
			<Head>
				<title>{`Order ${orderId}`}</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<h1 className='mb-4 text-xl'>{`Order ${orderId}`}</h1>
				{loading ? (
					<div>Loading...</div>
				) : error ? (
					<div className='my-3 rounded-lg bg-red-100 p-3 text-red-600'>
						{error}
					</div>
				) : (
					<div className='grid md:grid-cols-4 md:gap-5'>
						<div className='overflow-x-auto md:col-span-3 space-y-4'>
							<div className='overflow-x-auto p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg'>Shipping Address</h2>
								<div>
									{shippingAddress.fullName}, {shippingAddress.address},{' '}
									{shippingAddress.city}, {shippingAddress.postalCode},{' '}
									{shippingAddress.country}
								</div>
								{isDelivered ? (
									<div className='my-3 rounded-lg bg-red-100 p-3 text-red-600'>
										Delivered at {deliveredAt}
									</div>
								) : (
									<div className='my-3 rounded-lg bg-red-100 p-3 text-red-600'>
										Not delivered
									</div>
								)}
							</div>
							<div className='overflow-x-auto p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg'>Payment Method</h2>
								<div>{paymentMethod}</div>
								{isDelivered ? (
									<div className='my-3 rounded-lg bg-red-100 p-3 text-red-600'>
										Paid at {paidAt}
									</div>
								) : (
									<div className='my-3 rounded-lg bg-red-100 p-3 text-red-600'>
										Not Paid
									</div>
								)}
							</div>

							<div className='overflow-x-auto p-5 shadow border rounded'>
								<h2 className='mb-2 text-lg'>Order Items</h2>
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
										{orderItems.map((item) => (
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
							</div>
						</div>
						<div>
							<div className='card p-5'>
								<h2 className='mb-2 text-xl'>Order Summary</h2>
								<ul>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>Items</div>
											<div>${itemsPrice}</div>
										</div>
									</li>
									<li>
										<div className='mb-2 flex justify-between'>
											<div>tax</div>
											<div>${taxPrice}</div>
										</div>
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

OrderScreen.auth = true;
