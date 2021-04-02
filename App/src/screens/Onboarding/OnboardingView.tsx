import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PlainButton, PrimaryButton } from "../../shared/components/Buttons/";

export default function OnboardingView() {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <Text style={styles.titleText}>Huella</Text>
        <Image source={require("../../../assets/logo.png")} />
        <PrimaryButton
          title="Personal"
          onPress={() => navigation.navigate("PersonalSignUp")}
        />
        <PrimaryButton
          title="Business"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />
        <Text> Already have an account? </Text>
        <PlainButton
          title="Sign In"
          onPress={() => navigation.navigate("SignIn")}
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
