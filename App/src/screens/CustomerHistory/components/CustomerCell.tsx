import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { checkmarkIcon } from "../images";
import { CustomHistoryItem } from "../useCustomerHistory";

interface Props {
  customer: CustomHistoryItem;
  checked: boolean;
  onPress?: () => void;
}
export const CustomerCell = ({ customer, checked, onPress }: Props) => {
  const hour = customer.timestamp.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  const monthAndYear = customer.timestamp.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.itemContainer}>
        <View>
          <View style={styles.customerTextContainer}>
            <Text style={styles.customerText}>
              {customer.firstName + " " + customer.lastName}
            </Text>
            <Text style={styles.customerText}>
              {normalize(customer.phoneNumber)}
            </Text>
          </View>
          <Text>{hour + " EST"}</Text>
          <Text>{monthAndYear}</Text>
        </View>
        {checked && (
          <View style={{ justifyContent: "center" }}>
            <Image
              source={checkmarkIcon}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  customerTextContainer: {
    paddingBottom: 16,
  },
  customerText: {
    fontWeight: "bold",
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
