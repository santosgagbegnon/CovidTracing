import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title: string;
  onPress?: () => void;
}

export const PlainButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={plainButtonStyle.button} onPress={onPress}>
      <Text style={plainButtonStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={primaryButtonStyle.button} onPress={onPress}>
      <Text style={primaryButtonStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const plainButtonStyle = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#473198",
    fontWeight: "bold",
  },
});

const primaryButtonStyle = StyleSheet.create({
  button: {
    margin: 16,
    padding: 16,
    backgroundColor: "#473198",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
