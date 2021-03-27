import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { backArrow } from "../../images";

interface Props {
  onPress: () => void;
}
export const BackButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingLeft: 16 }}>
      <Image source={backArrow} style={{ width: 42, height: 42 }} />
    </TouchableOpacity>
  );
};
