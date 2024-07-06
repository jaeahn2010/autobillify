import { useState, useEffect, useTransition } from 'react'
import { getCurrentServiceProvider, getBusinessById } from '../../../utils/backend'

export default function InvoicesPage() {
    const [userBusinessName, setUserBusinessName] = useState('')
    const [userInvoices, setUserInvoices] = useState([])
    const [userFullName, setUserFullName] = useState('')

    async function getUserInfo() {
        const { businessId, firstName, lastName, invoices } = await getCurrentServiceProvider()
        const { businessName } = await getBusinessById(businessId)
        setUserFullName(`${lastName}, ${firstName}`)
        setUserInvoices(invoices)
        setUserBusinessName(businessName)
    }
    
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <p>Business: {userBusinessName}</p>
            <p>Service provider: {userFullName}</p>
            <p>Invoices: {userInvoices.length}</p>
        </div>
        
    )
}