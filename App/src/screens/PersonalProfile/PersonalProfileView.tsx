import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PlainButton } from "../../shared/components/Buttons";
import { useSignInStatus } from "../../context/SignInContext";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  id: string;
}

export default function PersonalProfileView({
  firstName,
  lastName,
  email,
  phoneNumber,
  id,
}: Props) {
  const { toggleSignIn, setUserInfo } = useSignInStatus();

  const signOut = () => {
    setUserInfo(undefined);
    toggleSignIn({ signInStatus: false });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <View>
        <View style={styles.titleAndButtonContainer}>
          <Text style={styles.title}>My Profile</Text>
          <PlainButton title="Sign out" onPress={signOut} />
        </View>
        <Text>{firstName + " " + lastName}</Text>
        <Text>{email}</Text>
        <Text>{normalize(phoneNumber)}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <QRCode value={id} size={200} />
      </View>
      <Text style={{ textAlign: "center" }}>
        Present this QR code to businesses using{" "}
        <Text style={styles.bold}>Huella</Text> to instantly share your contact
        information.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
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
