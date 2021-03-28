import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';

export default function PersonalProfileView() {
    const navigation = useNavigation();
    const route =  useRoute ();
    return (
        <View>
        <ScrollView>
            <Text style= {styles.titleText} >My Information</Text>
            <Text >Personal Profile</Text>
            <Text> {JSON.stringify (route.params) }</Text>

            <Button  title='Sign Out' type='clear' titleStyle= {styles.clearButton} onPress= { () => navigation.navigate ("Onboarding")  }/>
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
  button : {
    backgroundColor: '#473198',
    borderColor: '#473198',
    borderRadius : 8,
    marginTop: 10,
    marginBottom: 10
  },
  clearButton : {
    color : '#473198'
  },
  titleText: {
    fontSize : 43,
    textAlign : 'center'
  }

});