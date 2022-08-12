import Link from 'next/link';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function loginScreen() {
	const { data: session } = useSession();

	const router = useRouter();
	const { redirect } = router.query;

	useEffect(() => {
		if (session?.user) {
			router.push(redirect || '/');
		}
	}, [router, session, redirect]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	return (
		<section>
			<Head>
				<title>Login</title>
			</Head>
			<div className='py-16 lg:mx-16'>
				<form
					className='max-w-screen-sm mx-auto'
					onSubmit={handleSubmit(submitHandler)}
				>
					<h1 className='mb-4 text-2xl font-medium'>Login</h1>
					<div className='mb-4'>
						<label htmlFor='email'>Email</label>
						<input
							{...register('email', {
								required: 'Please enter email',
								pattern: {
									value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
									message: 'Please enter valid email',
								},
							})}
							id='email'
							type='email'
							className='w-full py-2 pl-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300'
							autoFocus
						/>
						{errors.email && (
							<div className='text-red-500'>{errors.email.message}</div>
						)}
					</div>
					<div className='mb-4'>
						<label htmlFor='password'>Password</label>
						<input
							{...register('password', {
								required: 'Please enter password',
								minLength: {
									value: 6,
									message: 'Password is more than 7 chars',
								},
							})}
							id='password'
							type='password'
							className='w-full py-2 pl-2 border border-gray-300 rounded mt-1  focus:outline-none focus:ring-2 focus:ring-blue-300'
							autoFocus
						/>
						{errors.password && (
							<div className='text-red-500'>{errors.password.message}</div>
						)}
					</div>
					<div className='mb-4'>
						<button className='bg-black py-2 px-4 shadow  hover:opacity-70 text-white rounded'>
							Login
						</button>
					</div>
					<div className='mb-4'>
						Don&apos;t have an account? &nbsp;
						<Link href='/register'>
							<a className='font-medium hover:underline text-blue-600'>
								Register
							</a>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
