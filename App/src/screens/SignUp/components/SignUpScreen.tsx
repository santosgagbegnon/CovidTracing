import { useNavigation, useNavigationState, useRoute } from "@react-navigation/core";
import React, {useState} from "react";
import {  Text, TextInput, View } from "react-native";
import { ScreenView } from "../../../shared/components";
import { Button, Icon } from 'react-native-elements';


interface SignUpProps {
    pressEvent ?: (param : any) => any;// if param is provided for pressEvent, the param holds the data being sent from screen to screen
    nextStackName ?: string;
    expectedRouteParams ?: string [];
    type:"Continue" | "Create Account";
    topic: string;
    keyBoardType?: "default" | "numeric" | "email-address";
}
export function SignUp ({topic, type, nextStackName,keyBoardType ,pressEvent}: SignUpProps) {
    
    const doesNextStackExist = (stackName: string) : boolean => {
        let navState = useNavigationState (state => state['routeNames'])
        return navState.includes (stackName)
    }
    const removeSpace = (str: string) : string => {
        return str.replace(/\s/g, '');
    }

    const navigation = useNavigation ()
    const route= useRoute ()
    //state
    const [state, setState] = useState ("")
    
    //verification process
    //if user specified 'Continue' then nextStackName should be provided else it will throw error
    if (type=== 'Continue' && !nextStackName) {
        throw new Error ("Type:Continue was provided but nextStackName wasn't. Please provide nextStackName: string")
    }
    //if user specified 'Continue' then nextStackName should exist in NavigationState
    if (type==='Continue' && !doesNextStackExist(nextStackName+"")) {
        throw new Error (`Type:Continue was provided but the provided nextStackName: ${nextStackName} didn't match any screen in the navigation`)
    }
    //if type is Create Account then pressEvent should be provided
    if (type ==='Create Account' && !pressEvent ){
        throw new Error (`Type:Create Account was provided but the pressEvent was not. Please provide a function for pressEvent`)
    }
    //if user wants 'Continue' then return title with "Whats your ..." else user wants "Create Account" therefore return title with "Create an account ..."
    let title = (type === 'Continue') ? `What’s your ${topic} ?` : `Create an account ${topic} ?`
    
    let topicSpaceRemoved = removeSpace (topic)
    

    let paramObj : { [key: string]: any } = { }
    paramObj [topicSpaceRemoved] = state
    
    let newParamData = {...route.params, ...paramObj}
    //if press event is given then keep the pressEvent else initialize it a lambda that navigates to next screen specified in nextStackName and provides extra data in the route.params
    pressEvent =  !pressEvent ? () => navigation.navigate ( nextStackName+"", newParamData  ) : pressEvent 

    
    

    return (
        <ScreenView>    
            <View>
                <Text style={{fontSize:29}}>{title}</Text>
                <TextInput
                keyboardType={keyBoardType}  
                style= { 
                    {
                        alignSelf: 'stretch',
                        padding: 10,
                        marginLeft: 10,
                        borderBottomColor:'#000',
                        marginRight:10,
                        borderBottomWidth: 1     //Bottom border thickness
                    }} 
                placeholder= {topic}
                value={state}
                onChangeText={setState} 
                    />
                
                <Button title={type} type="clear" disabled={ state.length === 0 } onPress={ ()=> pressEvent && pressEvent (newParamData) }  />
                <Icon name="arrow-left" type="font-awesome" onPress={ ()=> {navigation.goBack ()} } />
            </View>
        </ScreenView>
    )



}