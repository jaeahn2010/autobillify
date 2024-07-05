import './styles.css'
import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllInvoices } from '../../../utils/backend'

export default function App() {
	const [allInvoices, setAllInvoices] = useState([])
	const [menu, setMenu] = useState(false)

	// async function getAllData() {
	// 	const invoices = await getAllInvoices()
	// 	setAllInvoices(invoices)
	// }

	// useEffect(() => {
    //     getAllData()
    // }, [])

	return (
		<main className='flex flex-col bg-stone-200 p-2'>
			<section className='hover:cursor-pointer w-[100px]' onClick={() => setMenu(!menu)}>
				<div className={`${menu ? 'rotate-45 translate-y-[8px]' : ''} border-black border-2 mx-2 mt-6 mb-1 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
				<div className={`${menu ? 'rotate-45' : ''} border-black border-2 mx-2 my-1 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
				<div className={`${menu ? '-rotate-45 -translate-y-[8px]' : ''} border-black border-2 mx-2 mt-1 mb-6 max-w-[30px] rounded-xl duration-500 ease-in-out`}></div>
			</section>
			<nav className={`${menu ? '' : 'fixed inset-y-0 left-0 -translate-x-[1000px]'} text-xl ml-2 duration-200 ease-in-out`}>
				<Link to='/'>
					<h1 className='my-5'>Home</h1>
				</Link>
				<Link to='/auth/signup'>
					<h1 className='my-5'>Sign Up</h1>
				</Link>
				<Link to='/auth/login'>
					<h1 className='my-5'>Log In</h1>
				</Link>
				<Link to='/invoices'>
					<h1 className='my-5'>My Invoices</h1>
				</Link>
			</nav>
		</main>
	)
}