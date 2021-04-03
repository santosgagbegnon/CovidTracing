import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHistoryItem, useCustomerHistory } from "./useCustomerHistory";

interface Props {
  businessID: string;
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
export const CustomerHistoryView = ({ businessID }: Props) => {
  const { fetchCustomerHistory } = useCustomerHistory(businessID);

  const [customers, setCustomers] = useState<CustomHistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const customers = await fetchCustomerHistory();
      setCustomers(customers);
      setRefreshing(false);
    })();
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const customers = await fetchCustomerHistory();
    setCustomers(customers);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: CustomHistoryItem }) => {
    const hour = item.timestamp.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });
    const monthAndYear = item.timestamp.toLocaleDateString("en-US", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    return (
      <View style={styles.itemContainer}>
        <View style={styles.customerTextContainer}>
          <Text style={styles.customerText}>
            {item.firstName + " " + item.lastName}
          </Text>
          <Text style={styles.customerText}>{normalize(item.phoneNumber)}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text>{hour + " EST"}</Text>
          <Text>{monthAndYear}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={customers}
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp.toUTCString()}
        ItemSeparatorComponent={Sepearator}
        ListFooterComponent={Sepearator}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Text style={styles.title}>Customer History</Text>
            </View>
          );
        }}
      />
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
