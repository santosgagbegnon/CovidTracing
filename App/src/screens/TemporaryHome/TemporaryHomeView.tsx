import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface NavigationButtonProps {
  title: string;
  name: string;
}

function NavigationButton({ title, name }: NavigationButtonProps) {
  const navigation = useNavigation();

  return <Button title={title} onPress={() => navigation.navigate(name)} />;
}

export default function TemporaryHomeView() {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <NavigationButton title="Business Profile" name="BusinessProfile" />
      </ScrollView>
    </View>
  );
}
