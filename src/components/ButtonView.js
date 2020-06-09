import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ButtonView = props => {
    if (props.buttonNumber) {
        return (
            <TouchableOpacity style={style.button}>
                <Text style={style.StyleNumber} onPress={() => {props.buttonPress(props.sign)}}>
                    {props.sign}
                </Text>
            </TouchableOpacity>
        );
    } 
    else if (props.buttonAction) {
        return (
            <TouchableOpacity style={style.button} onPress={() => {props.buttonPress(props.sign)}}>
                <Text style={style.StyleOperation}>
                    {props.sign}
                </Text>
        </TouchableOpacity>
        );
    }
        
    }
    


const style = StyleSheet.create(
    {
        button: {
            flex: 1,
            alignItems: 'center',
            //alignSelf: 'stretch',
            borderColor: "grey",
            justifyContent: 'center',
            borderWidth: 1,
            
        },
        StyleNumber: { //кнопки(0-9)
            color:"black",
            fontSize: 25,
            padding: 40
        },
        StyleOperation: { //операции
            color:"red",
            fontSize: 25
        },
    }
)
export default ButtonView;
