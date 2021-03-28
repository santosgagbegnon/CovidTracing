import { useNavigation} from "@react-navigation/core"
import React, {useState} from "react"
import {SignUp} from '../components/SignUpScreen'
import {firebase} from "../../../firebase/config";


function SignUpFirstName () {
    return (
        <SignUp  type={"Continue"} topic={"first name"} nextStackName={"SignUpLastName"} keyBoardType="default"/>
    )
}

function SignUpLastName () {
    return (
        <SignUp  type={"Continue"} topic={"last name"} nextStackName={"SignUpEmail"} keyBoardType="default"/>
    )
}

function SignUpEmail () {
    return (
        <SignUp  type={"Continue"} topic={"email"} nextStackName={"SignUpNumber"} keyBoardType="email-address"/>
    )
}

function SignUpNumber () {
    return (
        <SignUp  type={"Continue"} topic={"phone number"} nextStackName={"SignUpPassword"} keyBoardType="numeric"/>
    )
}

function SignUpPassword () {
    let navigation = useNavigation () 

    function onCreateAccount (data: any) {
        let {email, password, firstname, lastname, phonenumber}= data
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then ( (response ) => {
            const user = response.user ? response.user : {uid : undefined}
            
            if (isObjectEmpty (user)) {
                new Error ("Error occured when fethcing response from firebase.auth.createUserEmailAndPassword. repsonse.user is null. \nPersonalSignUp.tsx line 45")
            }
            let uid = user.uid
            
            const data = {
                id: uid,
                accountType:"personal",
                email,
                firstname,
                lastname,
                phonenumber
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    alert (`Succsesfully, registered the following... \nuser: ${email}\nfirstname: ${firstname}\nlastname: ${lastname}\nphonenumber: ${phonenumber}\naccountType: personal`)
                    navigation.navigate('PersonalHome', {user: data})
                })
                .catch((error) => {
                    alert(error)
                    console.log (error)
                    console.log ("PersonalSignUp/SignUpPasswrod: line 52")
                });
        } ).catch((error) => {
            alert( error)
            console.log (error)
            console.log ("PersonalSignUp/SignUpPasswrod: line 36")
        }) 
    
    }


    return (
        <SignUp  type={"Create Account"} topic={"password"} pressEvent={ onCreateAccount } keyBoardType="default"/>
    )
}

function isObjectEmpty ( obj:  { } ) {

    return Object.keys (obj).length === 0 
}

export {SignUpFirstName, SignUpLastName, SignUpEmail, SignUpNumber, SignUpPassword}