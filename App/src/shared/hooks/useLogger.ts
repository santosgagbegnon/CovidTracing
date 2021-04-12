import {firebase } from "../../firebase/config"

export const useLogger = (businessID: string) => {    
    const logExistingCustomer = (customerID: string) => {
        if (customerID.includes('//') || businessID.includes('//')) return false

        const businessInfo = {id: businessID, timestamp: Date.now()}
        const customerInfo = {id: customerID, timestamp: Date.now()}

        return updateCustomerReference(customerID, businessInfo)
        .then(() => {
            return updateBusinessReference(businessID, customerID, customerInfo).catch(() => {return false})
        })
        .catch(() => {
            return false
        })
    }

    const logNewCustomer = (firstName: string, lastName: string, phoneNumber: string, email: string) => {
        const businessInfo = {id: businessID, timestamp: Date.now()}
        const newCustomer = {firstname: firstName, lastname: lastName, phonenumber: phoneNumber, accountType: 'personal', email: email, visits: [businessInfo], businesses: [businessID]}
        return updateNewCustomerReference(newCustomer)
        .then((customerID) => {
            return updateBusinessReference(businessID, customerID, {id: customerID, timestamp: Date.now()}).catch(() => {return false})
        })
        .catch(()=> {
            return false
        })
    }

    const updateNewCustomerReference = (customerInfo: object) => {
        const userRef = firebase.firestore().collection('users')
        return userRef
        .add(customerInfo)
        .then((customerRef) => {
            return customerRef.update({id: customerRef.id}).then(() => {
                return customerRef.id
            })
        })
    }

    const updateCustomerReference = (customerID: string, businessInfo: object) => {
        const userRef = firebase.firestore().collection('users')

        return userRef
        .doc(customerID)
        .update({
            visits: firebase.firestore.FieldValue.arrayUnion(businessInfo),
            businesses: firebase.firestore.FieldValue.arrayUnion(businessID)
        })
    }

    const updateBusinessReference = (businessID: string, customerID: string, customerInfo: object) => {
        const userRef = firebase.firestore().collection('users')

        return userRef
        .doc(businessID)
        .update({
            visits: firebase.firestore.FieldValue.arrayUnion(customerInfo),
            customers: firebase.firestore.FieldValue.arrayUnion(customerID)
        })
        .then(() => {
            return true
        })
    }

    return {logExistingCustomer, logNewCustomer}
}