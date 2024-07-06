import './styles.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HomePage from '../HomePage'
import AuthFormPage from '../AuthFormPage'
import InvoicesPage from '../InvoicesPage'

export default function App() {
	const [menu, setMenu] = useState(false)
	const [loginStatus, setLoginStatus] = useState(false)
	const navigate = useNavigate()

	let authLink = !loginStatus ? 
	<>
		<Link to='/auth/signup'>
			<h1 className='my-5'>Sign Up</h1>
		</Link>
		<Link to='/auth/login'>
			<h1 className='my-5'>Log In</h1>
		</Link>
	</> :
	<>
		<Link to='/invoices'>
			<h1 className='my-5'>My Invoices</h1>
		</Link>
		<button
			onClick={() => {
				if (confirm("Are you sure you would like to log out?")) {
					localStorage.clear()
					setLoginStatus(false)
					navigate('/')
				}
			}}>
			Log Out
		</button>
	</>

	useEffect(() => {
        if (localStorage.autobillifyUserToken) setLoginStatus(true)
    }, [loginStatus])

	return (
		<main className='relative'>
			<div className={`${menu ? 'bg-stone-200' : ''} duration-500 ease-in-out absolute left-0 top-0 hover:cursor-pointer w-1/6 z-1`} onClick={() => setMenu(!menu)}>
				<div className={`${menu ? 'rotate-45 translate-y-[8px]' : ''} border-black border-2 mx-2 mt-6 mb-1 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
				<div className={`${menu ? 'rotate-45' : ''} border-black border-2 mx-2 my-1 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
				<div className={`${menu ? '-rotate-45 -translate-y-[8px]' : ''} border-black border-2 mx-2 mt-1 mb-6 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
			</div>
			<section className='absolute w-1/6 left-0 top-12'>
				<nav className={`${menu ? '' : 'opacity-0'} text-xl pl-2 duration-500 ease-in-out bg-stone-200 h-[100vh]`}>
					<Link to='/'>
						<h1 className='my-5'>Home</h1>
					</Link>
					{authLink}
				</nav>
			</section>
			<section className={`${menu ? 'w-5/6' : 'w-11/12'} absolute right-0`}>
				<Routes>
					<Route
						path='/'
						element={<HomePage/>}
					/>
					<Route
						path='/auth/:formType'
						element={<AuthFormPage setLoginStatus={setLoginStatus}/>}
					/>
					<Route
						path='/invoices'
						element={<InvoicesPage/>}
					/>
				</Routes>
			</section>
		</main>
	)
}