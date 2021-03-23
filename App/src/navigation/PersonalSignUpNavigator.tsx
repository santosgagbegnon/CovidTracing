import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import  {SignUpFirstName, SignUpLastName, SignUpEmail, SignUpNumber, SignUpPassword} from '../screens/SignUp/PersonalSignUp';



const Stack = createStackNavigator();

export default function PersonalSignUpNavigator() {
    const navigation = useNavigation ();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUpFirstName" component={SignUpFirstName} /> 
        <Stack.Screen name="SignUpLastName" component={SignUpLastName} /> 
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} /> 
        <Stack.Screen name="SignUpNumber" component={SignUpNumber} />
        <Stack.Screen name="SignUpPassword" component={SignUpPassword} /> 
    </Stack.Navigator>
  );
}
//