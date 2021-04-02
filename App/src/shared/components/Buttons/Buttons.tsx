import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const PlainButton = ({ title, onPress, disabled=false }: Props) => {
  return (
    <TouchableOpacity style={plainButtonStyle.button} onPress={onPress} disabled={disabled} >
      <Text style={disabled? plainButtonStyle.disabledText : plainButtonStyle.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({ title, onPress, disabled=false }: Props) => {
  return (
    <TouchableOpacity style={disabled? primaryButtonStyle.disabledButton : primaryButtonStyle.button} onPress={onPress} disabled={disabled}>
      <Text style={disabled? primaryButtonStyle.disabledText : primaryButtonStyle.text}>{title}</Text>
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
  disabledText : {
    color:"#C1BFC2",
    fontWeight:"bold", 
  }
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
  disabledButton : {
    margin: 16,
    padding: 16,
    backgroundColor: "#C1BFC2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledText: {
    color: "#808080",
    fontWeight: "bold",
    fontSize: 18,
  }
});
