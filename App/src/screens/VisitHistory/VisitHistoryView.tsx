import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, RefreshControl, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVisitHistory, VisitHistoryItem } from "./useVisitHistory";

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
  const { fetchVisitHistory } = useVisitHistory(customerID);

  const [visits, setVisits] = useState<VisitHistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      console.log("here");
      const visits = await fetchVisitHistory();
      setVisits(visits);
      setRefreshing(false);
    })();
  }, []);

  const onRefresh = useCallback(async () => {
    console.log("here2");
    setRefreshing(true);
    const visits = await fetchVisitHistory();
    setVisits(visits);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: VisitHistoryItem }) => {
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
          <Text style={styles.customerText}>{item.businessName}</Text>
          <Text style={styles.secondaryText}>{item.location}</Text>
          <Text style={styles.secondaryText}>
            {normalize(item.phoneNumber)}
          </Text>
        </View>
        <Text>{hour + " EST"}</Text>
        <Text>{monthAndYear}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={visits}
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
              <Text style={styles.title}>Visit History</Text>
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
  secondaryText: {
    color: "#A1A1A1",
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
