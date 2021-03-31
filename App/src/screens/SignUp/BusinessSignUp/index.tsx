import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SignUp } from "../components/SignUpScreen";
import { firebase } from "../../../firebase/config";
import { UserInfo } from "../../../types/types";
import { useSignInStatus } from "../../../context/SignInContext";
import Toast from "react-native-toast-message";
import { Keyboard } from "react-native";

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
  const {
    userInfo,
    isSignedIn,
    toggleSignIn,
    setUserInfo,
  } = useSignInStatus();
  function onCreateAccount(data: any) {
    let { email, password, businessname, location, phonenumber } = data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid: string | undefined = response?.user?.uid;

        if (uid === undefined) {
          new Error(
            "Error occured when fetching response from firebase.auth.createUserEmailAndPassword. repsonse.user.uid is undefined. \nPersonalSignUp.tsx line 45"
          );
        }

        const data: UserInfo = {
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
            Keyboard.dismiss(); //keyboard would often persist during screen nav if user didnt press return
            setUserInfo(data);
            toggleSignIn({ signInStatus: true });
            Toast.show({
              type: "success",
              position: "top",
              text1: "Registration Success",
              text2: `${data.email} registration was successful`,
            });
            //appropriate screen nav is handled in AppNavigation
            
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
      secureText={true}
      pressEvent={onCreateAccount}
      keyBoardType="default"
    />
  );
}
export {
  SignUpBusinessName,
  SignUpLocation,
  SignUpEmail,
  SignUpNumber,
  SignUpPassword,
};
