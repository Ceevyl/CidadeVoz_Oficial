import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'react-native';
import Routes from './src/Routes';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      <Routes></Routes>
    </NavigationContainer>
  )
}
