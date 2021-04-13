import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/core";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { PlainButton } from "../../../shared/components/Buttons";

interface SignUpProps {
  pressEvent?: (param: any) => any; // if param is provided for pressEvent, the param holds the data being sent from screen to screen
  nextStackName?: string;
  expectedRouteParams?: string[];
  type: "Continue" | "Create Account";
  topic: string;
  keyBoardType?: "default" | "numeric" | "email-address";
  secureText?: boolean;
}
export function SignUp({
  topic,
  type,
  secureText = false,
  nextStackName,
  keyBoardType,
  pressEvent,
}: SignUpProps) {
  const doesNextStackExist = (stackName: string): boolean => {
    let navState = useNavigationState((state) => state["routeNames"]);
    return navState.includes(stackName);
  };
  const removeSpace = (str: string): string => {
    return str.replace(/\s/g, "");
  };

  const navigation = useNavigation();
  const route = useRoute();
  //state
  const [state, setState] = useState("");

  //verification process
  //if user specified 'Continue' then nextStackName should be provided else it will throw error
  if (type === "Continue" && !nextStackName) {
    throw new Error(
      "Type:Continue was provided but nextStackName wasn't. Please provide nextStackName: string"
    );
  }
  //if user specified 'Continue' then nextStackName should exist in NavigationState
  if (type === "Continue" && !doesNextStackExist(nextStackName + "")) {
    throw new Error(
      `Type:Continue was provided but the provided nextStackName: ${nextStackName} didn't match any screen in the navigation`
    );
  }
  //if type is Create Account then pressEvent should be provided
  if (type === "Create Account" && !pressEvent) {
    throw new Error(
      `Type:Create Account was provided but the pressEvent was not. Please provide a function for pressEvent`
    );
  }
  //if user wants 'Continue' then return title with "Whats your ..." else user wants "Create Account" therefore return title with "Create an account ..."
  let title =
    type === "Continue"
      ? `What’s your ${topic} ?`
      : `Create an account ${topic} ?`;

  let topicSpaceRemoved = removeSpace(topic);

  let paramObj: { [key: string]: any } = {};
  paramObj[topicSpaceRemoved] = state;

  let newParamData = { ...route.params, ...paramObj };
  //if press event is given then keep the pressEvent else initialize it a lambda that navigates to next screen specified in nextStackName and provides extra data in the route.params
  pressEvent = !pressEvent
    ? () => navigation.navigate(nextStackName + "", newParamData)
    : pressEvent;

  let inputBox =
    topic === "location" ? (
      <GooglePlacesAutocomplete
        placeholder={topic}
        suppressDefaultStyles={true}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en", // language of the results
        }}
        onPress={(data) => setState(data.description + "")}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        styles={{
          textInputContainer: {
            alignSelf: "stretch",
            padding: 10,
            marginLeft: 10,
            borderBottomColor: "#000",
            marginRight: 10,
            borderBottomWidth: 1, //Bottom border thickness
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderTopWidth: 0.5,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            height: 44,
            flexDirection: "row",
          },
          separator: {
            height: 0.5,
            backgroundColor: "#c8c7cc",
          },
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
        }//reason why styles is put here is cause the styles.prop only accepts an object, therefore it's less costly
        }
      />
    ) : (
      <TextInput
        keyboardType={keyBoardType}
        secureTextEntry={secureText}
        autoFocus={true}
        style={styles.input}
        placeholder={topic}
        value={state}
        onChangeText={(text) => setState(text.trim())}
      />
    );

  return (
    <KeyboardAvoidingView style={styles.screenView} behavior="padding">
      <View>
        <Text style={{ fontSize: 29 }}>{title}</Text>
        {inputBox}

        <PlainButton
          title={type}
          disabled={state.length === 0}
          onPress={() => pressEvent && pressEvent(newParamData)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    alignSelf: "stretch",
    padding: 10,
    marginLeft: 10,
    borderBottomColor: "#000",
    marginRight: 10,
    borderBottomWidth: 1, //Bottom border thickness
  },
});
