import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PlainButton } from "../../shared/components/Buttons";
import { useSignInStatus } from "../../context/SignInContext";

export default function PersonalProfileView() {
  const navigation = useNavigation();
  const {
    toggleSignIn,
    userInfo,
    setUserInfo,
  } = useSignInStatus();
  return (
    <View>
      <ScrollView>
        <Text style={styles.titleText}>My Profile</Text>
        <Text>{`${userInfo?.firstname} ${userInfo?.lastname}`}</Text>
        <Text>{`${userInfo?.email}`}</Text>
        <Text>{`${userInfo?.phonenumber}`}</Text>

        <PlainButton
          title="Sign Out"
          onPress={() => {
            setUserInfo(undefined);
            toggleSignIn({ signInStatus: false });
            //appropriate screen nav is handled in AppNavigation
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  
});
