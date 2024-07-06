import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { signUp, logIn, getAllBusinesses } from '../../../utils/backend'

export default function AuthFormPage({ setLoginStatus }) {
    const { formType } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [allBusinesses, setAllBusinesses] = useState([])
    const handleInputChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        const userData = formType === 'login' ? await logIn(formData) : await signUp(formData)
        localStorage.setItem('autobillifyUserToken', userData.token)
        localStorage.setItem('autobillifyUserEmail', userData.email)
        localStorage.setItem('autobillifyUserFirstName', userData.firstName)
        localStorage.setItem('autobillifyUserLastName', userData.lastName)
        setLoginStatus(true)
        navigate('/')
    }

    async function getBusinessesInfo() {
        const businessInfo = await getAllBusinesses()
        setAllBusinesses(businessInfo)
    }

    let actionText = formType === 'login' ? 'Log In' : 'Sign Up'
    let labelStyle = 'block text-stone-100 font-bold mb-2'
    let inputStyle = 'w-full p-2 text-stone-900 rounded-md focus:outline-none focus:border-green-500 focus:border-2'
    let signUpInputSections = formType === 'login' ? ''
    : <>
        <div>
            <label className={labelStyle} htmlFor="firstName">
                First Name
            </label>
            <input
                className={inputStyle}
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First name"
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label className={labelStyle} htmlFor="lastName">
                Last Name
            </label>
            <input
                className={inputStyle}
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last name"
                onChange={handleInputChange}
            />
        </div>
        <div>
            {allBusinesses.length
            ? <select
                name="businessId"
                id="businessName"
                defaultValue={0}
                onChange={handleInputChange}
            >
                <option key={0} value={0} disabled>Select a business</option>
                {allBusinesses.map(business => <option key={business._id} value={business._id}>{business.businessName}</option>)}
            </select>
            : ''}
        </div>
    </>

    useEffect(() => {
        getBusinessesInfo()
    }, [])

    return (
        <section className="flex items-center justify-center h-3/4">
            <div className="bg-stone-600 rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl text-center font-bold text-stone-100 mb-8">{actionText}</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className={labelStyle} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={inputStyle}
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className={labelStyle} htmlFor="password">
                            Password
                        </label>
                        <input
                            className={inputStyle}
                            id="password"
                            name="password"
                            type="password"
                            minLength="8"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    {signUpInputSections}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-500 text-stone-100 rounded-md hover:bg-green-400 transition duration-300">
                            {actionText}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}