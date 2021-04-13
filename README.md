# Huella

![huella logo](/App/assets/logo.png)

An app to help small business keep track of customers.


## Starting Huella
### 1. Initializing Dependancies and packages
```
yarn
```

### 2. Start Email BackEnd
Option 1:
```
yarn server 
```
Option 2:
```
cd server/
node index.js


//output should look like this:

//Email Sending Server  🖥
//Listening 👂 at http://localhost:3000
```

### 3. Configure App

#### Create .env file

Within ```./App``` dir create a ```.env``` file


#### Putting Email credentials
> Create a test gmail account and assign it as a less secure account for testing purposes. Instructions can be found [here](https://hotter.io/docs/email-accounts/secure-app-gmail/)

Witin ```.env``` file, copy and paste the content below...
```
EMAIL= #gmail account email
PASSWORD= #gmail account password
```

Populate each row with the appropriate gmail account info

#### Putting Google Place API credentials
>This is required for the location auto-complete functionality in the Business Sign-Up process

Within ```.env``` file, copy and paste the content below...
```
GOOGLE_PLACES_API_KEY= #Google cloud places API key
```
- Create a Google Cloud account [link](https://console.cloud.google.com/) 
- Enable Places API
- Generate API Key in Credentials section
- Copy and paste the API key beside ```GOOGLE_PLACES_API_KEY``` in .env 


#### Find local IP:
[Find Local IP Link Tutorial](https://support.strongvpn.com/hc/en-us/articles/360003778933-How-To-Find-Your-Local-IP-Address-)

>Note: Should be something along the lines of 192.168.X.X


#### Place Local IP in App code to connect to backend

- Open the following file  ```./App/src/screens/CustomerHistory/useCustomerHistory.ts```
- Place you local IP where it says ```LOCAL_IP``` in the ```sendEmail () Function```

e.g

From...
```javascript

const sendEmail = (emails: string[]) => {
   .
   .
   .
    return fetch("http://LOCAL_IP:3000/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emails: emails }),
    })
    .
    .
    .
};
 ```
To...
```javascript

const sendEmail = (emails: string[]) => {
   .
   .
   .
    return fetch("http://192.168.2.X.X:3000/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emails: emails }),
    })
    .
    .
    .
};
 ```

### 4. Starting App

```
yarn start 
```
