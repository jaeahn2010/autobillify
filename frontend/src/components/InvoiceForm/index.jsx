import { useState, useEffect } from "react"
import { getClientById, postClient } from "../../../utils/backend"

export default function InvoiceForm({ businessName, serviceProviderName, invoiceNumber, billedDate, clientIds }) {
    const [invoice, setInvoice] = useState({})
    const [clientNamesList, setClientNamesList] = useState([])
    const [clientCreateModal, setClientCreateModal] = useState(false)
    
    let btnStyle = 'border-stone-800 border-2 rounded-xl p-2 my-5 shadow-xl hover:bg-amber-400 hover:scale-125'
    let divStyle = 'flex items-center justify-between my-2'
    let labelStyle = 'text-right w-1/4'
    let inputStyle = 'border-stone-800 border-2 px-2 mx-2 rounded-md w-3/4'

    function handleInputChange(evt) {
        evt.preventDefault()
        console.log(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
    }

    async function getClientsInfo(idsArr) {
        for (let clientId of idsArr) {
            const client = await getClientById(clientId)
            if (!clientNamesList.includes(`${client.clientLastName}, ${client.clientFirstName}`)) setClientNamesList(clientNamesList => clientNamesList.concat(`${client.clientLastName}, ${client.clientFirstName}`))
        }
    }

    useEffect(() => {
        getClientsInfo(clientIds)
    }, [])

    return (
        <form className="border-black border-2 w-3/4 mx-auto">
            <div className={divStyle}>
                <label className={labelStyle} htmlFor="invoiceNumber">INVOICE #</label>
                <input
                    className={inputStyle}
                    type="number"
                    id='invoiceNumber'
                    name='invoiceNumber'
                    defaultValue={invoiceNumber}
                    onChange={handleInputChange}
                />
            </div>
            <div className={divStyle}>
                <label className={labelStyle} htmlFor="billedDate">BILLED DATE</label>
                <input
                    className={inputStyle}
                    type="date"
                    id='billedDate'
                    name='billedDate'
                    defaultValue={billedDate}
                    onChange={handleInputChange}
                />
            </div>
            <div className={divStyle}>
                <label className={labelStyle} htmlFor="businessName">BUSINESS NAME</label>
                <input
                    className={inputStyle}
                    type="text"
                    id='businessName'
                    name='businessName'
                    defaultValue={businessName}
                    onChange={handleInputChange}
                />
            </div>
            <div className={divStyle}>
                <label className={labelStyle} htmlFor="serviceProviderName">SERVICE PROVIDER</label>
                <input
                    className={inputStyle}
                    type="text"
                    id='serviceProviderName'
                    name='serviceProviderName'
                    defaultValue={serviceProviderName}
                    onChange={handleInputChange}
                />
            </div>
            <p className="text-center">SELECT A CLIENT or CREATE A NEW CLIENT</p>
            <div className={divStyle + ' justify-around'}>
                <select
                    className=""
                    name="clientNames"
                    id="clientNames"
                    defaultValue={0}
                    onChange={handleInputChange}
                >
                    <option key={0} value={0} disabled>Select a client</option>
                    {clientNamesList.map(clientName => <option key={clientName} value={clientName}>{clientName}</option>)}
                </select>
                <button className={btnStyle} onClick={(evt) => {
                    evt.preventDefault()
                    setClientCreateModal(true)}
                }>CREATE A NEW CLIENT</button>
            </div>
        </form>
    )
}