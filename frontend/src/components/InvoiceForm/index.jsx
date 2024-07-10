import { useState, useEffect } from "react"
import { getClientById, postClient, updateServiceProvider } from "../../../utils/backend"

export default function InvoiceForm({ currentUser, businessName, serviceProviderName, invoiceNumber, billedDate, clientIds }) {
    const [invoice, setInvoice] = useState({})
    const [clientNamesList, setClientNamesList] = useState([])
    const [clientCreateModal, setClientCreateModal] = useState(false)
    const [newClientInfo, setNewClientInfo] = useState({})
    const [newTags, setNewTags] = useState([])
    
    let btnStyle = 'border-stone-800 border-2 rounded-xl p-2 my-5 shadow-xl hover:bg-amber-400 hover:scale-125'
    let divStyle = 'flex items-center justify-between my-2'
    let labelStyle = 'text-right w-1/4'
    let inputStyle = 'border-stone-800 border-2 px-2 mx-2 rounded-md w-3/4'
    let modalBtnStyle = 'border-stone-200 border-2 rounded-xl p-2 my-5 shadow-xl hover:bg-amber-400 hover:scale-125 hover:text-stone-800'
    let modalDivStyle = 'flex items-center justify-between my-2 w-4/5'
    let modalLabelStyle = 'text-right w-1/4'
    let modalInputStyle = 'text-stone-800 border-stone-400 border-2 px-2 mx-2 rounded-md w-3/4 focus:border-green-600'

    function handleInputChange(evt) {
        evt.preventDefault()
        console.log(evt.target.value)
    }

    function handleNewClientInfo(evt) {
        evt.preventDefault()
        setNewClientInfo({
            ...newClientInfo,
            [evt.target.name]: evt.target.value,
        })
    }

    function handleTags(evt) {
        evt.preventDefault()
        if (/^[a-zA-Z\s]+$/.test(newClientInfo.tags)) {
            if (!newTags.includes(newClientInfo.tags.toLowerCase())) {
                setNewTags(newTags => newTags.concat(newClientInfo.tags))
            } else {
                alert('This tag has already been included.')
            }
        } else {
            alert('Please only input letters for the tags.')
        }
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
        <section className="">
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
        <div className={`${clientCreateModal ? 'block fixed top-1/4 left-1/4 flex flex-col items-center justify-center mx-auto bg-stone-900 bg-opacity-90 w-2/3 h-1/2 border-4 border-amber-400 text-stone-200 overflow-y-auto' : 'hidden'}`}>
            <div className={modalDivStyle}>
                <label className={modalLabelStyle} htmlFor="clientFirstName">CLIENT FIRST NAME</label>
                <input
                    className={modalInputStyle}
                    type="text"
                    id='clientFirstName'
                    name='clientFirstName'
                    defaultValue=''
                    onChange={handleNewClientInfo}
                />
            </div>
            <div className={modalDivStyle}>
                <label className={modalLabelStyle} htmlFor="clientLastName">CLIENT LAST NAME</label>
                <input
                    className={modalInputStyle}
                    type="text"
                    id='clientLastName'
                    name='clientLastName'
                    defaultValue=''
                    onChange={handleNewClientInfo}
                />
            </div>
            <div className={modalDivStyle}>
                <label className={modalLabelStyle} htmlFor="clientType">CLIENT TYPE</label>
                <select
                    className={modalInputStyle}
                    name="clientType"
                    id="clientType"
                    defaultValue={0}
                    onChange={handleNewClientInfo}
                >
                    <option key={0} value={0} disabled>Select a type</option>
                    {['individual', 'company / business / corporation'].map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            <div className={modalDivStyle}>
                <p className={modalLabelStyle}>TAGS:</p>
                <div className='px-2 mx-2 w-3/4 flex'>
                    {newTags.map(tag => <p key={tag} className="flex justify-center items-center border-2 border-stone-200 rounded-xl mx-2 px-2">{tag}</p>)}
                </div>
            </div>
            <div className={modalDivStyle}>
                <label className={modalLabelStyle} htmlFor="clientLastName">NEW TAG</label>
                <input
                    className={modalInputStyle}
                    type="text"
                    id='tags'
                    name='tags'
                    defaultValue=''
                    onChange={handleNewClientInfo}
                />
                <button className={modalBtnStyle} onClick={handleTags}>ADD TAG</button>
            </div>
            <button className={modalBtnStyle} onClick={ async () => {
                const newClient = await postClient({
                    ...newClientInfo,
                    tags: newTags,
                })
                const updatedServiceProvider = await updateServiceProvider({
                    ...currentUser,
                    clients: currentUser.clients.concat(newClient._id)
                }, newClient.serviceProviderId)
            }}>CREATE</button>
            <button className={modalBtnStyle} onClick={() => {
                setNewTags([])
                setNewClientInfo({})
                setClientCreateModal(false)}
            }>CLOSE</button>
        </div>
        </section>
    )
}