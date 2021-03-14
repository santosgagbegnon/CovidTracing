import React from "react";
import { ViewProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ViewProps {
  children?: React.ReactNode;
}

export default function ScreenView({
  style,
  children,
  ...restOfViewProps
}: Props) {
  return (
    <SafeAreaView {...restOfViewProps} style={[style, styles.screenView]}>
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
