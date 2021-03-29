import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { PlainButton } from "../../shared/components/Buttons";

export default function SignIn() {
  let navigation = useNavigation();
  let [emailState, setEmailState] = useState("");
  let [passwordState, setPasswordState] = useState("");
  
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
          onChangeText={setEmailState}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={passwordState}
          onChangeText={setPasswordState}
        />
        <Text> {emailState} </Text>
        <Text> {passwordState} </Text>

        <PlainButton
          title="Sign In"
          onPress={() => {
            navigation.navigate("BusinessHome");
          }}
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
});
