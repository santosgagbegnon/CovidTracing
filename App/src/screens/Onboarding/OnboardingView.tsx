import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from 'react-native-elements';

export default function OnboardingView() {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <Text style= {styles.titleText} >Huella</Text>
        <Image source={require ("../../../assets/logo.png")} />
        <Button  title='Personal' buttonStyle = {styles.button} onPress= { () => navigation.navigate ("PersonalSignUp") }/>
        <Button  title='Business' buttonStyle = {styles.button} onPress= { () => navigation.navigate ("BusinessSignUp") }/>
        <Text> Already have an account? </Text>
        <Button  title='Sign In' type='clear' titleStyle= {styles.clearButton} onPress= { () => navigation.navigate ("SignIn")  }/>
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