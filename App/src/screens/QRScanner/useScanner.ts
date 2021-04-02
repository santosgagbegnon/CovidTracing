import {firebase } from "../../firebase/config"

export const useScanner = (businessID: string) => {    
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

    return {logExistingCustomer}
}