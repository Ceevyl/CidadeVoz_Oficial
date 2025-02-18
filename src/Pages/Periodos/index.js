import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  FlatList,
  ActivityIndicator
} from "react-native";
import { IconDate, IconBook } from "../../Icons";

import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Periodo_Component from "../../components/Periodo_Component";
import { IconHome_, IconChat, IconPerfil }  from "../../Icons"

import axios from "axios";

export default function Periodos({ route }) {
  const Navigator = useNavigation();
  const { Dados } = route.params;

  const [Data, SetData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  const FazerReq = async () => {
    setIsLoading(true);
    const resposta = await axios.get(
      "https://cidade-voz-gerencer-ceevyl.vercel.app/Periodos"
    );
    setIsLoading(null);
    SetData(resposta.data);
  };

  useEffect(() => {
    FazerReq();
  }, []);

  const render = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          const Selected = item;
          Navigator.navigate("SearchCouncilors", { Dados, Selected });
        }}
      >
        <Periodo_Component Ano={item.ano} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.backgroundGreen} animation="slideInDown">
        <Animatable.Image
          source={require("../../assets/LogoDourada.png")}
          style={styles.logoDourada}
          animation="fadeInLeft"
        />
      </Animatable.View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#44A86C" />
        </View>
      ) : null}
      <FlatList
        data={Data}
        renderItem={render}
        keyExtractor={(item) => item.ano}
        style={styles.flatList}
      />
      <StatusBar backgroundColor="#44A86C" />
      
      <View style={styles.separator}></View>

      <Animatable.View style={styles.backNavigator} animation="zoomIn" duration={1500}>

        <TouchableOpacity>
          <IconHome_ style={styles.iconHome}></IconHome_>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ await Navigator.navigate("Initialize_chat", { Dados } ) }} >
          <IconChat style={styles.iconChat}></IconChat>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ await Navigator.navigate("ChangeProfile", { Dados } ) }}>
          <IconPerfil style={styles.iconPerfil}></IconPerfil>
        </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  backgroundGreen: {
    height: "30%",
    backgroundColor: "#44A86C",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logoDourada: {
    width: 70.95,
    height: 73,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backNavigator: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconHome: {
    marginLeft: 50,
  },
  iconPerfil: {
    marginRight: 50,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: "black"
  }
});
