import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SignUp } from "../components/SignUpScreen";
import { firebase } from "../../../firebase/config";

function SignUpBusinessName() {
  return (
    <SignUp
      type={"Continue"}
      topic={"business name"}
      nextStackName={"SignUpLocation"}
      keyBoardType="default"
    />
  );
}

function SignUpLocation() {
  return (
    <SignUp
      type={"Continue"}
      topic={"location"}
      nextStackName={"SignUpEmail"}
      keyBoardType="default"
    />
  );
}

function SignUpEmail() {
  return (
    <SignUp
      type={"Continue"}
      topic={"email"}
      nextStackName={"SignUpNumber"}
      keyBoardType="email-address"
    />
  );
}

function SignUpNumber() {
  return (
    <SignUp
      type={"Continue"}
      topic={"phone number"}
      nextStackName={"SignUpPassword"}
      keyBoardType="numeric"
    />
  );
}

function SignUpPassword() {
  let navigation = useNavigation();

  function onCreateAccount(data: any) {
    let { email, password, businessname, location, phonenumber } = data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user ? response.user : { uid: undefined };

        if (isObjectEmpty(user)) {
          new Error(
            "Error occured when fethcing response from firebase.auth.createUserEmailAndPassword. repsonse.user is null. \nPersonalSignUp.tsx line 45"
          );
        }
        let uid = user.uid;

        const data = {
          id: uid,
          accountType: "business",
          email,
          businessname,
          location,
          phonenumber,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            alert(
              `Succsesfully, registered the following... \nuser: ${email}\nbusinessname: ${businessname}\nlocation: ${location}\nphonenumber: ${phonenumber}\naccountType: business`
            );
            navigation.navigate("BusinessHome", { user: data });
          })
          .catch((error) => {
            alert(error);
            console.log(error);
            console.log("SignUp/BusinessSignUp: line 52");
          });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        console.log("SignUp/BusinessSignUp: line 36");
      });
  }

  return (
    <SignUp
      type={"Create Account"}
      topic={"password"}
      pressEvent={onCreateAccount}
      keyBoardType="default"
    />
  );
}

function isObjectEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

export {
  SignUpBusinessName,
  SignUpLocation,
  SignUpEmail,
  SignUpNumber,
  SignUpPassword,
};
