import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../firebase/config";
import { PlainButton } from "../../shared/components/Buttons";
import { useSignInStatus } from "../../context/SignInContext";
import { UserInfo } from "../../types/types";

export default function SignIn() {
  let navigation = useNavigation();
  let [emailState, setEmailState] = useState<string>("");
  let [passwordState, setPasswordState] = useState<string>("");
  let [signInErrorState, setSignInErrorState] = useState<string>("");
  const {
    toggleSignIn,
    setUserInfo,
  } = useSignInStatus();

  function onSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailState, passwordState)
      .then((response) => {
        const uid: string | undefined = response?.user?.uid;
        if (uid === undefined) {
          throw new Error(
            "Error occured when fetching response from firebase.auth.SignWithUserEmailAndPassword. repsonse.user is null. \nSign.tsx line 38"
          );
        }

        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            if (user === undefined) {
              throw new Error();
            }
            let userInformation: UserInfo = {
              ...user,
              accountType: user.accountType,
              email: user.email,
            };//although user variable contains accountType and email, this is a necessary as TypeScript was complaining when trying to cast user: Object to type UserInfo by simply using {...user}
            setUserInfo(userInformation);
            toggleSignIn({ signInStatus: true });
            //appropriate screen nav is handled in AppNavigation
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        handleSignInError (error)
      });
  }

  const handleSignInError= (error: any) => {
    switch (error.code) {
      case "auth/wrong-password":
        setSignInErrorState("wrong password");
        break;
      case "auth/invalid-email":
        setSignInErrorState("invalid email");
        break;
      case "auth/user-not-found":
        setSignInErrorState("user not found");
        break;
      case "auth/too-many-requests":
        setSignInErrorState("disabled due to many failed login attempts");
      default:
        console.log(error.code);
        console.log(error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screenView} behavior="padding">
      <View
        style={{ width: "90%", alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 43, textAlign: "center" }}>Huella</Text>
        <TextInput
          keyboardType="email-address"
          autoFocus={true}
          style={styles.input}
          placeholder="Email"
          value={emailState}
          onChangeText={(value) => {
            setEmailState(value.trim());
            setSignInErrorState(""); //resetting error code due to new potential input
          }}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={passwordState}
          onChangeText={(value) => {
            setPasswordState(value.trim());
            setSignInErrorState(""); //resetting error code due to new potential input
          }}
        />
        <Text style={styles.errorText}>{signInErrorState}</Text>
        <PlainButton
          title="Sign In"
          disabled={emailState.length === 0 || passwordState.length === 0}
          onPress={onSignIn}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    alignSelf: "stretch",
    padding: 10,
    marginLeft: 10,
    borderBottomColor: "#000",
    marginRight: 10,
    borderBottomWidth: 1,
  },
  errorText: {
    color: "red",
    margin: 15,
  },
});
