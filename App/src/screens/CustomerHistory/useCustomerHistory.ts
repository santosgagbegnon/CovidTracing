import {firebase } from "../../firebase/config"

export interface CustomHistoryItem {
    firstName: string
    lastName: string
    phoneNumber: string
    timestamp: Date
    email: string
}

export const useCustomerHistory = (businessID: string) => {
    const fetchCustomerHistory = () => {
        const userRef = firebase.firestore().collection('users')
        const businessQuery = userRef.where('businesses', 'array-contains', businessID)
        const customerHistoryItems: CustomHistoryItem[] = []
    
        return businessQuery
        .get()
        .then((businessQuerySnapshot) => {

            businessQuerySnapshot.forEach((doc)=> {
                let customer = doc.data()
                let visits = customer.visits as {id: string, timestamp: number}[]
                const filteredVisits = visits.filter((visit) => {
                    return visit.id === businessID
                })
    
                filteredVisits.forEach((visit) => {
                    customerHistoryItems.push({
                        firstName: customer.firstname as string,
                        lastName: customer.lastname as string,
                        phoneNumber: customer.phonenumber as string,
                        timestamp: new Date(visit.timestamp as number),
                        email: customer.email as string
                    })
    
                })
            })
            return customerHistoryItems.sort((left,right) =>  {
                const leftTime = left.timestamp.valueOf()
                const rightTime = right.timestamp.valueOf()
                return rightTime - leftTime
            })
        })
        .catch(() => {
            console.log("Failed business query")
            return customerHistoryItems
        })

    }

    const sendEmail = (emails: string[]) => {
        // POST REQUEST TO BACKEND AND RETURN TRUE/FALSE BASED ON SUCCESS.
        return true
    }
    
    return {fetchCustomerHistory, sendEmail}
}