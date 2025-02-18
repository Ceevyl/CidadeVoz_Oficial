import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Periodos from "../Pages/Periodos";
import SearchCouncilors from "../Pages/SearchCouncilors";
import Change_Profile from "../Pages/Change_Profile";
import Initialize_Chat from "../Pages/Initialize_Chat";
import Selected_vereador from "../Pages/Selected_vereador";
import Postagens from "../Pages/Postagens";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Periodos"
        component={Periodos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchCouncilors"
        component={SearchCouncilors}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeProfile"
        component={Change_Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Initialize_chat"
        component={Initialize_Chat}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="Selected_vereador"
        component={Selected_vereador}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Postagens"
        component={Postagens}
        options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
}
