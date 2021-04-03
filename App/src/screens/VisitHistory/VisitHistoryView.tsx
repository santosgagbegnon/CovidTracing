import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  customerID: string;
}
const Sepearator = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: 0.5,
        marginLeft: 16,
      }}
    />
  );
};
export const VisitHistoryView = ({ customerID }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>iejgie</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  titleAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 1,
    alignItems: "center",
  },
  customerTextContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  customerText: {
    fontWeight: "bold",
  },
  timeContainer: {},
  buttonContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

function normalize(phone: string) {
  phone = phone.replace(/[^\d]/g, "");

  //check if number length equals to 10
  if (phone.length == 10) {
    //reformat and return phone number
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}
