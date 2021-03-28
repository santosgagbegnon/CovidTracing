import React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenView } from "../../shared/components/";
import {Button} from "react-native-elements"


export default function SignIn() {
  let navigation = useNavigation  () 
  return (
    <ScreenView>
        <Text> SignIn Page </Text>
        <Button title="Sign In" type="clear" onPress={ ()=> { navigation.navigate ("BusinessHome") } } />
    </ScreenView>
  );
}

// <Tab.Navigator>
// <Tab.Screen name="Home" component={BusinessNavigator} />
// <Tab.Screen name='BusinessProfile' component= {BusinessProfileScreen}/>
// </Tab.Navigator>
