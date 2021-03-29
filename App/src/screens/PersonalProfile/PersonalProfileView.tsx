import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PlainButton } from "../../shared/components/Buttons";

export default function PersonalProfileView() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View>
      <ScrollView>
        <Text style={styles.titleText}>My Information</Text>
        <Text>Personal Profile</Text>
        <Text> {JSON.stringify(route.params)}</Text>

        <PlainButton
          title="Sign Out"
          onPress={() => navigation.navigate("Onboarding")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 43,
    textAlign: "center",
  },
});
