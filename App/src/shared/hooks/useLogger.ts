import {firebase } from "../../firebase/config"

export const useLogger = (businessID: string) => {    
    const logExistingCustomer = (customerID: string) => {
        if (customerID.includes('//') || businessID.includes('//')) return false

        const businessInfo = {id: businessID, timestamp: Date.now()}
        const customerInfo = {id: customerID, timestamp: Date.now()}

        return updateCustomerReference(customerID, businessInfo)
        .then(() => {
            return updateBusinessReference(businessID, customerInfo).catch(() => {return false})
        })
        .catch(() => {
            return false
        })
    }

    const logNewCustomer = (firstName: string, lastName: string, phoneNumber: string) => {
        const businessInfo = {id: businessID, timestamp: Date.now()}
        const newCustomer = {firstname: firstName, lastname: lastName, phonenumber: phoneNumber, accountType: 'personal', email: '-', visits: [businessInfo]}
        return updateNewCustomerReference(newCustomer)
        .then((cusomterID) => {
            return updateBusinessReference(businessID, {id: cusomterID, timestamp: Date.now()}).catch(() => {return false})
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
            visits: firebase.firestore.FieldValue.arrayUnion(businessInfo)
        })
    }

    const updateBusinessReference = (businessID: string, customerInfo: object) => {
        const userRef = firebase.firestore().collection('users')

        return userRef
        .doc(businessID)
        .update({
            visitors: firebase.firestore.FieldValue.arrayUnion(customerInfo)
        })
        .then(() => {
            return true
        })
    }

    return {logExistingCustomer, logNewCustomer}
}