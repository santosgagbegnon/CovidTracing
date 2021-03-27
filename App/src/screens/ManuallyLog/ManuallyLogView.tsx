import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  NativeSyntheticEvent,
  TextInputTextInputEventData,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PlainButton } from "../BusinessProfile/components";

const ManuallyLogView = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const logCustomer = () => {
    Keyboard.dismiss();

    console.log(
      `New customer - ${customerName.trim()} & ${customerNumber.trim()}`
    );
  };

  const onNameChange = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setCustomerName(event.nativeEvent.previousText + event.nativeEvent.text);
  };

  const onNumberChange = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setCustomerNumber(event.nativeEvent.previousText + event.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.textInputTitle}>Full name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Customer name"
          onTextInput={onNameChange}
        />
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.textInputTitle}>Phone number</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Customer phone number"
          keyboardType="number-pad"
          onTextInput={onNumberChange}
        />
      </View>
      <PlainButton title="Log customer" onPress={logCustomer} />
    </View>
  );
};

export default ManuallyLogView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  nameContainer: { paddingBottom: 22 },
  numberContainer: { paddingBottom: 32 },
  textInputTitle: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 0,
  },
  textInput: {
    height: 40,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
});
