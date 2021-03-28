import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BusinessNavigator from "./BusinessNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { CustomerHistoryScreen } from "../screens/CustomerHistory";

const Tab = createBottomTabNavigator();

export default function BusinessTabNav() {
    return (
        <React.Fragment>
            <Tab.Navigator
                screenOptions={({ route }) => {
                    return {
                        tabBarVisible: getFocusedRouteNameFromRoute(route) !== "QRScanner",
                    };
                }} >

                <Tab.Screen
                    name="Home"
                    component={BusinessNavigator}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => {
                            return (
                                <Ionicons color={color} size={size} name="person-circle" />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Customers"
                    component={CustomerHistoryScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons color={color} size={size} name="list-outline" />;
                        },
                    }}
                />
            </Tab.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </React.Fragment>
    );
}