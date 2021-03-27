import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const CustomerHistoryView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer History</Text>
      </View>
    </SafeAreaView>
  );
};

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
