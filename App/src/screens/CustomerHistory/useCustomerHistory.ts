import { firebase } from "../../firebase/config";
import{useSignInStatus} from "../../context/SignInContext" 

export interface CustomHistoryItem {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  timestamp: Date;
  email: string;
}

export const useCustomerHistory = (businessID: string) => {
    const {userInfo} = useSignInStatus ()
    const businessName = userInfo?.businessname ?? "";
  const fetchCustomerHistory = () => {
    const userRef = firebase.firestore().collection("users");
    const businessQuery = userRef.where(
      "businesses",
      "array-contains",
      businessID
    );
    const customerHistoryItems: CustomHistoryItem[] = [];

    return businessQuery
      .get()
      .then((businessQuerySnapshot) => {
        businessQuerySnapshot.forEach((doc) => {
          let customer = doc.data();
          let visits = customer.visits as { id: string; timestamp: number }[];
          const filteredVisits = visits.filter((visit) => {
            return visit.id === businessID;
          });

          filteredVisits.forEach((visit) => {
            customerHistoryItems.push({
              firstName: customer.firstname as string,
              lastName: customer.lastname as string,
              phoneNumber: customer.phonenumber as string,
              timestamp: new Date(visit.timestamp as number),
              email: customer.email as string,
            });
          });
        });
        return customerHistoryItems.sort((left, right) => {
          const leftTime = left.timestamp.valueOf();
          const rightTime = right.timestamp.valueOf();
          return rightTime - leftTime;
        });
      })
      .catch(() => {
        console.log("Failed business query");
        return customerHistoryItems;
      });
  };

  const sendEmail = (emails: string[]) => {
    // POST REQUEST TO BACKEND AND RETURN TRUE/FALSE BASED ON SUCCESS.
    return fetch("http://192.168.2.15:3000/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ business:businessName ,emails: emails }),
    })
      .then((data) => data)
      .catch((error) => console.log(error));
  };

  return { fetchCustomerHistory, sendEmail };
};
