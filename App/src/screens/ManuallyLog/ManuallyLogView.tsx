import React, { useCallback, useState } from "react";
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
import Toast from "react-native-toast-message";
import { useLogger } from "../../shared/hooks/useLogger";

interface Props {
  businessID: string;
}

const ManuallyLogView = ({ businessID }: Props) => {
  const { logNewCustomer } = useLogger(businessID);
  const [customerFirstName, setCustomerFristName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const logCustomer = useCallback(async () => {
    console.log(customerFirstName, customerLastName.trim(), customerNumber);
    const success = await logNewCustomer(
      customerFirstName.trim(),
      customerLastName.trim(),
      customerNumber.trim()
    );
    Keyboard.dismiss();
    if (success) {
      Toast.show({
        text1: "Customer logged.",
        position: "bottom",
        type: "success",
      });
    } else {
      Toast.show({
        text1: "Failed to log customer.",
        position: "bottom",
        type: "error",
      });
    }
  }, [customerFirstName, customerLastName, customerNumber]);

  const onFirstNameChange = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setCustomerFristName(
      event.nativeEvent.previousText + event.nativeEvent.text
    );
  };

  const onLastNameChange = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setCustomerLastName(
      event.nativeEvent.previousText + event.nativeEvent.text
    );
  };

  const onNumberChange = (
    event: NativeSyntheticEvent<TextInputTextInputEventData>
  ) => {
    setCustomerNumber(event.nativeEvent.previousText + event.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.textInputTitle}>First name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Customer first name"
          onTextInput={onFirstNameChange}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.textInputTitle}>Last name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Customer last name"
          onTextInput={onLastNameChange}
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
