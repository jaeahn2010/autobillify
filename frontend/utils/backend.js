import axios from 'axios'

//businesses CRUD
export async function getAllBusinesses() {
    const { data } = await axios.get(`/api/businesses/all`)
    return data
}

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
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.post('/api/clients', client, authHeader)
    return data
}
export async function updateClient(client, clientId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/clients/${clientId}`, client, authHeader)
    return data
}
export async function deleteClient(clientId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/clients/${clientId}`, authHeader)
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
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.post('/api/invoices', invoice, authHeader)
    return data
}
export async function updateInvoice(invoice, invoiceId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.put(`/api/invoices/${invoiceId}`, invoice, authHeader)
    return data
}

export async function deleteInvoice(invoiceId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.delete(`/api/invoices/${invoiceId}`, authHeader)
    return data
}

// service providers CRUD
export async function getCurrentServiceProvider() {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.get(`/api/serviceProviders`, authHeader)
    return data
}

export async function postServiceProvider(serviceProvider) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.post('/api/serviceProviders', serviceProvider, authHeader)
    return data
}
export async function updateServiceProvider(serviceProvider, serviceProviderId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.put(`/api/serviceProviders/${serviceProviderId}`, serviceProvider, authHeader)
    return data
}

export async function deleteServiceProvider(serviceProviderId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('autobillifyUserToken') } }
    const { data } = await axios.delete(`/api/serviceProviders/${serviceProviderId}`, authHeader)
    return data
}

// signup & login
export async function signUp(serviceProvider) {
    const { data } = await axios.post('/api/serviceProviders/signup', serviceProvider)
    return data
}

export async function logIn(serviceProvider) {
    const { data } = await axios.post('/api/serviceProviders/login', serviceProvider)
    return data
}