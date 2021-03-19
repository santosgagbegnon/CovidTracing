import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PrimaryButton, PlainButton } from "./components";

export default function BusinessProfileView() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleAndButtonContainer}>
          <Text style={styles.title}>My Business</Text>
          <PlainButton title="Edit information" />
        </View>
        <Text>Dirty Bird Waffles</Text>
        <Text>150 Elgin St.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Scan customers" />
        <PrimaryButton title="Manually log customers" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
  },
  titleAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
