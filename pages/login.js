import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function loginScreen() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {
		console.log(email, password);
	};

	return (
		<section>
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
									value: 8,
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
						<button className='bg-black py-2 px-4 shadow  hover:opacity-70 text-white'>
							Login
						</button>
					</div>
					<div className='mb-4'>
						Don&apos;t have an account? &nbsp;
						<Link href='/register'>
							<a className='font-medium hover:underline'>Register</a>
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
