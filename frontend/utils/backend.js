import axios from 'axios'

//businesses CRUD
export async function getBusinessById(businessId) {
    const { data } = await axios.get(`/api/businesses/${businessId}`)
    return data
}

export async function postBusiness(business) {
    const { data } = await axios.post('/api/businesses', business)
    return data
}
export async function updateBusiness(business, businessId) {
    const { data } = await axios.put(`/api/businesses/${businessId}`, business)
    return data
}

export async function deleteBusiness(businessId) {
    const { data } = await axios.delete(`/api/businesses/${businessId}`)
    return data
}

// clients CRUD
export async function getClientById(clientId) {
    const { data } = await axios.get(`/api/clients/${clientId}`)
    return data
}

export async function postClient(client) {
    const { data } = await axios.post('/api/clients', client)
    return data
}
export async function updateClient(client, clientId) {
    const { data } = await axios.put(`/api/clients/${clientId}`, client)
    return data
}

export async function deleteClient(clientId) {
    const { data } = await axios.delete(`/api/clients/${clientId}`)
    return data
}

// invoices CRUD
export async function getAllInvoices(businessId) {
    const { data } = await axios.get(`/api/invoices/all/${businessId}`)
    return data
}

export async function getInvoiceById(invoiceId) {
    const { data } = await axios.get(`/api/invoices/${invoiceId}`)
    return data
}

export async function postInvoice(invoice) {
    const { data } = await axios.post('/api/invoices', invoice)
    return data
}
export async function updateInvoice(invoice, invoiceId) {
    const { data } = await axios.put(`/api/invoices/${invoiceId}`, invoice)
    return data
}

export async function deleteInvoice(invoiceId) {
    const { data } = await axios.delete(`/api/invoices/${invoiceId}`)
    return data
}

// service providers CRUD
export async function getServiceProviderById(serviceProviderId) {
    const { data } = await axios.get(`/api/serviceProviders/${serviceProviderId}`)
    return data
}

export async function postServiceProvider(serviceProvider) {
    const { data } = await axios.post('/api/serviceProviders', serviceProvider)
    return data
}
export async function updateServiceProvider(serviceProvider, serviceProviderId) {
    const { data } = await axios.put(`/api/serviceProviders/${serviceProviderId}`, serviceProvider)
    return data
}

export async function deleteServiceProvider(serviceProviderId) {
    const { data } = await axios.delete(`/api/serviceProviders/${serviceProviderId}`)
    return data
}