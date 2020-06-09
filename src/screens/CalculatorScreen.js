import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ButtonView from "../components/ButtonView";

  const CalcScreen = () => {
    const [mathematicalExpression, setMathematicalExpression] = useState('');
    const [answer, setAnswer] = useState('');
    const [history, setHistory] = useState('');
    const scrollToEnd = useRef(null);
    const lastSign = mathematicalExpression.charAt(mathematicalExpression.length - 1);
    const penultimateSign = mathematicalExpression.charAt(mathematicalExpression.length - 2);
    
    const buttonPress = (value) => {
        setAnswer('');
        var zero = 0;
        var number = mathematicalExpression.split(/([-+*/])/);//делит на элы
        lastNumber = number.pop(); //последний эл
        
        if ((mathematicalExpression.length == 0 && value != '-' && isNaN(value))) { //блок ввода знака без ничего
        console.log('1')
        } else if (lastNumber.indexOf(".") > 0 && value == '.') { //2.
            calculateExpression(mathematicalExpression)
        } else if (lastSign == '.' && value == '-') {   //-.
            setMathematicalExpression(mathematicalExpression.replace(/.$/, value));
        } else if (lastSign == "-" && value == "-") {   //--
            setMathematicalExpression(mathematicalExpression);
            if (isNaN(lastSign)) {
                calculateExpression(mathematicalExpression.substring(0,mathematicalExpression.length-1));
            } else {
                calculateExpression(mathematicalExpression);
            }
        } else if (isNaN(value) && isNaN(penultimateSign) && isNaN(lastSign)) {
            setMathematicalExpression(mathematicalExpression);
            calculateExpression(mathematicalExpression.substring(0, mathematicalExpression.length-2));
        } else if (isNaN(lastSign) && isNaN(value) && value != "-") { // smena znaka
            if (value == '.') {
                calculateExpression(mathematicalExpression)
            } else {
                setMathematicalExpression(mathematicalExpression.replace(/.$/, value));
                calculateExpression(mathematicalExpression);
            }
            
            
        } else if (lastNumber == "0" && !isNaN(value)) {
            calculateExpression(mathematicalExpression);
            console.log('7');
        } else {
            setMathematicalExpression(mathematicalExpression+value);
            if (!isNaN(value)) {            //кальк
                calculateExpression(mathematicalExpression+value);
                if(lastSign == '/' && value == zero) {
                    console.log('!zero');
                    //alert("Nie można dzielić przez 0!");

                    setAnswer("Błąd");
                    setHistory("Nie można dzielić przez 0");
                    if(lastSign == '.') {
                        setMathematicalExpression(mathematicalExpression.replace(/.$/, value));
                    }
                }
            } else {
                if (isNaN(lastSign) && isNaN(value)) {
                    calculateExpression(mathematicalExpression.substring(0,mathematicalExpression.length-1))
                } else {
                    calculateExpression(mathematicalExpression);
                }
                
            }
            console.log('nice')
        }  
        if (value == "%" && mathematicalExpression.length > 0) {
            var lenghtLastNumber;
            let count;
            var toPercent;
            lenghtLastNumber = lastNumber.length;
            if (mathematicalExpression.substring(0, mathematicalExpression.length-lenghtLastNumber).slice(-1) == "-" || mathematicalExpression.substring(0, mathematicalExpression.length-lenghtLastNumber).slice(-1) == "+") {
                lastNumber = lastNumber/100;
                toPercent = mathematicalExpression.substring(0, mathematicalExpression.length-lenghtLastNumber);
                const endSign = isNaN(toPercent.slice(-1));
                if (endSign == true) {
                    if (isNaN(toPercent.charAt(toPercent.length-2))) {
                        toPercent = toPercent.substring(0, toPercent.length-2);
                    } else {
                        toPercent = toPercent.substring(0, toPercent.length-1);
                    }
                } else {
                    count = eval(mathematicalExpression);
                }
                count = eval(toPercent);
                count = count*lastNumber;

                setMathematicalExpression(mathematicalExpression.substring(0,mathematicalExpression.length-lenghtLastNumber) + count);
                calculateExpression(mathematicalExpression.substring(0,mathematicalExpression.length-lenghtLastNumber) + count);
            } else {
                count = lastNumber*0.01;
                setMathematicalExpression(mathematicalExpression.substr(0, mathematicalExpression.length-lenghtLastNumber) + count);
            } 
        }
    }

    function calculateExpression(mathematicalExpression){
        let count;
        const endSign = isNaN(mathematicalExpression.slice(-1));
        if (endSign == true) { 
            // mathematicalExpression = mathematicalExpression.replace(/(\s+)?.$/, '');
            mathematicalExpression = mathematicalExpression.replace(/.$/, '');
            count = eval(mathematicalExpression);
            
        } else {
            count = eval(mathematicalExpression); //короче, пока = не нажато, считается автоматически
            
        }
        setAnswer(count); 

    }


    const calculate = () => {
        
        console.log(mathematicalExpression.length)
        if (isNaN(mathematicalExpression.charAt(mathematicalExpression.length - 1))) {
            if (isNaN(mathematicalExpression.charAt(mathematicalExpression.length - 2))) {
                setHistory(history + "\n" + mathematicalExpression.substring(0, mathematicalExpression.length - 2) + "=" + answer);
            } else {
                setHistory(history + "\n" + mathematicalExpression.replace(/.$/, '') + "=" + answer);
            }  
        } else {
            setHistory(history + "\n" + mathematicalExpression + "=" + answer);
        }
        //console.log(count);
        //setHistory(mathematicalExpression + " = " + eval(mathematicalExpression));
        scrollToEnd.current.scrollToEnd();
        setMathematicalExpression('');
        setAnswer('');   
    }
        
    const deleteAll = () => {
        setMathematicalExpression('');
        setAnswer('');
        setHistory('');
    }

    const deletelastSign = () => {
        if (mathematicalExpression.length > 0) {
            setMathematicalExpression(mathematicalExpression.replace(/.$/, ''));
            setAnswer(mathematicalExpression.replace(/.$/, ''));
            if (isNaN(mathematicalExpression.charAt(mathematicalExpression.length - 2)) == true) {
                if (isNaN(mathematicalExpression.charAt(mathematicalExpression.length - 3)) == true) {
                    calculateExpression(mathematicalExpression.substring(0, mathematicalExpression.length-3));
                } else {
                    calculateExpression(mathematicalExpression.substring(0, mathematicalExpression.length-2));
                }
            } else {
                calculateExpression(mathematicalExpression.substring(0, mathematicalExpression.length-1));
            }
        }
        
    }
    
    return (
        <View >
            <View style={style.history}>
                <ScrollView ref={scrollToEnd}>
                <Text style={style.historyText}>
                    {history}
                </Text>
                </ScrollView>
            </View>
            <View style={style.expression}>
                <Text style={style.expressionText}>
                    {mathematicalExpression}
                </Text>
            </View>
            <View style={style.result}>         
                <Text style={style.answer}>{answer}</Text>
            </View>
            <View style={style.container}>
                <View style={style.row}>
                <ButtonView sign='AC' buttonAction buttonPress={deleteAll} />
                <ButtonView sign='D' buttonAction buttonPress={deletelastSign} />
                <ButtonView sign='%' buttonAction buttonPress={buttonPress} />
                <ButtonView sign='/' buttonAction buttonPress={buttonPress} />
                </View>
                <View style={style.row}>
                <ButtonView sign='7' buttonNumber buttonPress={buttonPress}  />
                <ButtonView sign='8' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='9' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='*' buttonAction buttonPress={buttonPress} />
                </View>
                <View style={style.row}>
                <ButtonView sign='4' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='5' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='6' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='-' buttonAction buttonPress={buttonPress} />
                </View>
                <View style={style.row}>
                <ButtonView sign='1' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='2' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='3' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='+' buttonAction buttonPress={buttonPress} />
                </View>
                <View style={style.row}>
                <ButtonView sign='' buttonAction buttonPress={buttonPress} />
                <ButtonView sign='0' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='.' buttonNumber buttonPress={buttonPress} />
                <ButtonView sign='=' buttonAction buttonPress={calculate} />
                </View>
            </View>
        </View>

    );
  
}


const style = StyleSheet.create({


    history: { //верхний контейнер
        backgroundColor: "#c0c0c0",
        height:"30%",
        // alignSelf:"stretch",
        alignItems: 'flex-end',
        justifyContent: 'flex-end'        
    },
    historyText: {
        textAlign: "right",
        fontSize: 30,
        color: "black"
    },
    expression: {
        backgroundColor:"black",
        height:"10%",
        alignSelf:"stretch",
        justifyContent: "flex-end",
    },
    expressionText: {
        textAlign: "right",
        fontSize: 50,
        color: "white"
    },   
    result: { //средний контейнер
        backgroundColor:"#ffffff",
        height:"10%",
        alignSelf:"stretch",
        fontSize:20,
        justifyContent: "flex-end",
    },
    container: { //нижний контейнер
        backgroundColor:"white",
        height:"50%",
        borderWidth: 1

    },
    row: {
        flexDirection: 'row',
        flex: 1,
    },
    text: {
        textAlign: "right",
        fontSize: 50,
        color: "black"
    },
    answer: {
        textAlign: "right",
        fontSize: 30,
        color: "black"
    }
    


})

export default CalcScreen;



