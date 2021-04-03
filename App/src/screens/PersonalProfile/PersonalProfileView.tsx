import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PlainButton } from "../../shared/components/Buttons";
import { useSignInStatus } from "../../context/SignInContext";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function PersonalProfileView({
  firstName,
  lastName,
  email,
  phoneNumber,
}: Props) {
  const { toggleSignIn, setUserInfo } = useSignInStatus();

  const signOut = () => {
    setUserInfo(undefined);
    toggleSignIn({ signInStatus: false });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleAndButtonContainer}>
          <Text style={styles.title}>My Profile</Text>
          <PlainButton title="Sign out" onPress={signOut} />
        </View>
        <Text>{firstName + " " + lastName}</Text>
        <Text>{email}</Text>
        <Text>{normalize(phoneNumber)}</Text>
      </View>
      <Text>
        Present this QR code to businesses using Huella to instantly share your
        contact information.
      </Text>
    </SafeAreaView>
  );
}

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
