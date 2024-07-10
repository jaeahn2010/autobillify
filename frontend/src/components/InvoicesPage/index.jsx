import { useState, useEffect } from 'react'
import { getCurrentServiceProvider, getBusinessById } from '../../../utils/backend'
import InvoiceForm from '../InvoiceForm'

export default function InvoicesPage() {
    const [currentUser, setCurrentUser] = useState({})
    const [userBusinessName, setUserBusinessName] = useState('')
    const [userInvoices, setUserInvoices] = useState([])
    const [userClientIds, setUserClientIds] = useState([])
    const [userFullName, setUserFullName] = useState('')
    const [displayInvoiceForm, setDisplayInvoiceForm] = useState(false)

    async function getUserInfo() {
        const currentServiceProvider = await getCurrentServiceProvider()
        const { businessName } = await getBusinessById(currentServiceProvider.businessId)
        setUserFullName(`${currentServiceProvider.lastName}, ${currentServiceProvider.firstName}`)
        setUserInvoices(currentServiceProvider.invoices)
        setUserBusinessName(businessName)
        setUserClientIds(currentServiceProvider.clients)
        setCurrentUser(currentServiceProvider)
    }
    
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <p>Business: {userBusinessName}</p>
            <p>Service provider: {userFullName}</p>
            <p>Invoices: {userInvoices.length}</p>
            <p>Clients: {userClientIds.length}</p>
            <button className='border-stone-800 border-2 rounded-xl p-2 my-5 shadow-xl hover:bg-amber-400 hover:scale-125' onClick={() => setDisplayInvoiceForm(!displayInvoiceForm)}>{displayInvoiceForm ? 'CLOSE FORM' : 'CREATE AN INVOICE'}</button>
            {displayInvoiceForm ? <InvoiceForm
                currentUser={currentUser}
                businessName={userBusinessName}
                serviceProviderName={userFullName}
                invoiceNumber={userInvoices.length + 1}
                billedDate={new Date()}
                clientIds={userClientIds}
            /> : ''}
        </div>
    )
}