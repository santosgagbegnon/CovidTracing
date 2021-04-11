import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PlainButton, PrimaryButton } from "../../shared/components/Buttons/";

export default function OnboardingView() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.titleText}>Huella</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{ height: 150 }}
        />
      </View>
      <View style={{ alignItems: "stretch" }}>
        <PrimaryButton
          title="Personal"
          onPress={() => navigation.navigate("PersonalSignUp")}
        />
        <PrimaryButton
          title="Business"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignSelf: "center",
          paddingTop: 64,
        }}
      >
        <Text> Already have an account? </Text>
        <PlainButton
          title="Sign In"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    paddingTop: 32,
    fontSize: 43,
    textAlign: "center",
    fontWeight: "500",
  },
});
