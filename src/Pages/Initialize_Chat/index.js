import { View, StyleSheet, Text, StatusBar, FlatList, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from "react-native-animatable"
import { useState, useEffect } from "react";
import { IconHome_, IconChat, IconPerfil } from "../../Icons";
import axios, { all } from "axios";
import Each_Peoplechat from "../../components/Each_Peoplechat";
import { useNavigation } from "@react-navigation/native";



//fenadante apresentation
export default function Initialize_Chat({ route }) {
	const Navigator = useNavigation();
	const { Dados } = route.params;
	const color = Dados.person_config.Tipo == "Sou vereador" ? "#618CFA" : "#44A86C";
	const [renderData, setRenderData] = useState([]);
	const [searchValue, setSearchValue] = useState('')
  
	const calculate = async () => {
	  let newData = [];
  
	  if (Dados.person_config.Tipo == "Sou vereador") {
		const response = await axios.get("https://cidade-voz-gerencer.vercel.app/getAll");
  
		for (let count = 0; count < response.data.length; count++) {
		  if (response.data[count].person_config.Tipo != "Sou vereador") {

			const Payload = {
			  index: count,
			  Config: response.data[count].person_config,
			};
  
			newData.push(Payload);
		  }
		}
	  } else {
		const response = await axios.get("https://cidade-voz-gerencer.vercel.app/getVereadores");
  
		for (let i = 0; i < response.data.length; i++) {

		  const Payload = {

			index: i,

			Config: response.data[i],

		  };
  
		  newData.push(Payload);
		  
		}
	  }
  
	  setRenderData(newData);
	};

	const handleSearch = () => {
	  const filteredData = renderData.filter((item) =>
		item.Config.Nome.toLowerCase().includes(searchValue.toLowerCase())
	  );
	  return filteredData;
	};
	
  
	useEffect(() => {
		calculate();
	}, []);
  
	return (
	  <View>
		<StatusBar backgroundColor="whitesmoke" />
		<View style={{ marginLeft: 10, marginRight: 10, height: 60, backgroundColor: "whitesmoke", alignItems: "center", justifyContent: "center" }}>
		  <Text style={{ fontWeight: "bold", fontSize: 15, color: color }}>Chat CidadeVoz</Text>
		</View>
		<Animatable.View animation="fadeIn" style={{marginBottom: 10}}>
		  <View style={{ width: '80%', height: 40, backgroundColor: "#fff", marginLeft: '10%', marginRight: '10%', borderRadius: 30, flexDirection: "row", alignItems: "center" }}>
			  <Icon name="search" size={24} color={color} style={{marginLeft: 10}} />
			  <TextInput placeholder="Pesquisar..." onChangeText={(text) => setSearchValue(text) } placeholderTextColor={color} style={{ borderRadius: 30, height: 40, marginLeft: 10, fontSize: 15 }} ></TextInput>
		  </View>
		</Animatable.View>
		<FlatList
		  data={handleSearch()}
		  renderItem={({ item }) => (
			<TouchableOpacity onPress={() => console.log(item)}>
			  <Each_Peoplechat namePeople={item.Config.Nome} />
			</TouchableOpacity>
		  )}
		  style={{height: '75%'}}
		  keyExtractor={(item) => item.index.toString()} // Converta o índice para string
		/>

		<View style={styles.separator}></View>

			<Animatable.View style={styles.backNavigator} animation="zoomIn" duration={1500}>

				<TouchableOpacity onPress={async ()=>{ await Navigator.navigate("Periodos", { Dados } ) }} >
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
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30
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
})

