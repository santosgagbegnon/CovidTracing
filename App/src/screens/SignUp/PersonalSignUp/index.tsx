import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SignUp } from "../components/SignUpScreen";
import { firebase } from "../../../firebase/config";
import { useSignInStatus } from "../../../context/SignInContext";
import { UserInfo } from "../../../types/types";
import Toast from "react-native-toast-message";
import { Keyboard } from "react-native";

function SignUpFirstName() {
  return (
    <SignUp
      type={"Continue"}
      topic={"first name"}
      nextStackName={"SignUpLastName"}
      keyBoardType="default"
    />
  );
}

function SignUpLastName() {
  return (
    <SignUp
      type={"Continue"}
      topic={"last name"}
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
    let { email, password, firstname, lastname, phonenumber } = data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid: string | undefined = response?.user?.uid;

        if (uid === undefined) {
          new Error(
            "Error occured when fethcing response from firebase.auth.createUserEmailAndPassword. repsonse.user.uid is undefined. \nPersonalSignUp.tsx line 45"
          );
        }

        const data: UserInfo = {
          id: uid,
          accountType: "personal",
          email,
          firstname,
          lastname,
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
            console.log("PersonalSignUp/SignUpPasswrod: line 52");
          });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        console.log("PersonalSignUp/SignUpPasswrod: line 36");
      });
  }

  return (
    <SignUp
      type={"Create Account"}
      secureText={true}
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
  SignUpFirstName,
  SignUpLastName,
  SignUpEmail,
  SignUpNumber,
  SignUpPassword,
};
