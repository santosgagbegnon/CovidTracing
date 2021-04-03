import {firebase } from "../../firebase/config"

export interface VisitHistoryItem {
    businessName: string
    location: string
    phoneNumber: string
    timestamp: Date
}

export const useVisitHistory = (customerID: string) => {
    const fetchVisitHistory = () => {
        const userRef = firebase.firestore().collection('users')
        const customerQuery = userRef.where('customers', 'array-contains', customerID)
        const visitHistoryItems: VisitHistoryItem[] = []
    
        return customerQuery
        .get()
        .then((customerQuerySnapshot) => {
            customerQuerySnapshot.forEach((doc)=> {
                let business = doc.data()
                let visits = business.visits as {id: string, timestamp: number}[]
                const filteredVisits = visits.filter((visit) => {
  
                    return visit.id === customerID
                })
    
                filteredVisits.forEach((visit) => {
                    visitHistoryItems.push({
                        businessName: business.businessname as string,
                        location: business.location as string,
                        phoneNumber: business.phonenumber as string,
                        timestamp: new Date(visit.timestamp as number)
                    })
    
                })
            })
            return visitHistoryItems.sort((left,right) =>  {
                const leftTime = left.timestamp.valueOf()
                const rightTime = right.timestamp.valueOf()
                return rightTime - leftTime
            })
        })
        .catch(() => {
            console.log("Failed customer query")
            return visitHistoryItems
        })

    }
    return {fetchVisitHistory}
}