import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "../../shared/components/Buttons";
import { CustomerCell } from "./components";
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
  const { fetchCustomerHistory, sendEmail } = useCustomerHistory(businessID);

  const [customers, setCustomers] = useState<CustomHistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [checkedEmails, setCheckedEmails] = useState<
    { email: string; timestamp: Date }[]
  >([]);

  useEffect(() => {
    (async () => {
      const customers = await fetchCustomerHistory();
      setCustomers(customers);
      setRefreshing(false);
    })();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const customers = await fetchCustomerHistory();
    setCustomers(customers);
    setRefreshing(false);
  }, []);

  const onPressSendEmail = () => {
    // This will becomes const success = await sendEmail(checkedEmails)
    const success = sendEmail(checkedEmails.map((customer) => customer.email));

    if (success) {
      Toast.show({
        text1: "Email sent",
        position: "top",
        type: "success",
      });
    } else {
      Toast.show({
        text1: "Failed to send email",
        position: "top",
        type: "error",
      });
    }
    setCheckedEmails([]);
  };

  const renderItem = ({ item }: { item: CustomHistoryItem }) => {
    const emailAndTimestamp = { email: item.email, timestamp: item.timestamp };
    console.log(checkedEmails, emailAndTimestamp);
    return (
      <CustomerCell
        checked={checkedEmails.some(
          (emails) => emails.timestamp == item.timestamp
        )}
        customer={item}
        onPress={() => {
          if (
            !checkedEmails.some((emails) => emails.timestamp == item.timestamp)
          ) {
            setCheckedEmails((prev) => prev.concat([emailAndTimestamp]));
          } else {
            setCheckedEmails((prev) =>
              prev.filter((current) => {
                return current.timestamp !== emailAndTimestamp.timestamp;
              })
            );
          }
        }}
      />
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
      {checkedEmails.length > 0 && (
        <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <PrimaryButton title="Send email alert" onPress={onPressSendEmail} />
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
