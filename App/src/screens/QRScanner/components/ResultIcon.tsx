import React from "react";
import { Image } from "react-native";
import { failedIcon, successIcon } from "../../../shared/images";

interface Props {
  success: boolean;
}

export const ResultIcon = ({ success }: Props) => {
  const source = success ? successIcon : failedIcon;
  return <Image source={source} style={{ width: 50, height: 50 }} />;
};
