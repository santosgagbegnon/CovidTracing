import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PersonalProfileScreen } from "../screens/PersonalProfile";
import { VisitHistoryScreen } from "../screens/VisitHistory";

const Tab = createBottomTabNavigator();

export default function PersonalTabNav() {
  return (
    <React.Fragment>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={PersonalProfileScreen}
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
          name="Visits"
          component={VisitHistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons color={color} size={size} name="list-outline" />;
            },
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}
