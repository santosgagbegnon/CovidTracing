import { useNavigation, useRoute } from "@react-navigation/core";
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
  const route = useRoute ();
  return (
    <View>
      <ScrollView>
        <Text> {JSON.stringify (route.params)  }</Text>
  
        <NavigationButton title="Business Profile" name="BusinessProfile" />
      </ScrollView>
    </View>
  );
}
