import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CalculatorScreen from './src/screens/CalculatorScreen';



const MainNavigator = createStackNavigator({
  Calculator: {screen: CalculatorScreen},
 
},
  {
    initialRouteName: 'Calculator',
    defaultNavigationOptions: {
      title: 'Kalkulator'
    }
  }
);
export default createAppContainer(MainNavigator);