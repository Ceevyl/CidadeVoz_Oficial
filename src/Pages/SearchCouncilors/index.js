import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { IconDataSearch } from '../../Icons';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Each_Vereador from '../../components/Each_Vereador';
import { FlatList } from 'react-native-gesture-handler';
import Periodo_Component from '../../components/Periodo_Component';
// import { IconHome_, IconChat, IconPerfil }  from "../../Icons"
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SearchCouncilors = ({ route }) => {
  const { Dados, Selected } = route.params;
  const [Data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(null)

  const Navigator = useNavigation()

  const FazerReq = async () => {
    setIsLoading(true)
    const resposta = await axios.get('https://cidade-voz-gerencer-ceevyl.vercel.app/getVereadores');
    setIsLoading(false)
    setData(resposta.data);
    p
  };

  useEffect(() => {
    FazerReq();
  }, []);

  const handleSearch = () => {
    const filteredData = Data.filter((item) => item.Nome.toLowerCase().includes(searchValue.toLowerCase()));
    return filteredData;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#44A86C" />

      <Animatable.View style={styles.topImage} animation="bounce">
        <IconDataSearch />
        <Text style={styles.h1Periodo}>PERÍODO</Text>
        <Text style={styles.timePeriodo}>
          {Selected.ano} - {Number(Selected.ano + 4)}
        </Text>
      </Animatable.View>

      <Animatable.View style={styles.MainSearch} animation="lightSpeedIn">
        <View style={styles.searchContainer}>
          {/* <Icon name="search" size={22} style={styles.searchIcon} /> */}
          <TextInput
            style={styles.inputSearch}
            placeholder="Pesquisar..."
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
        </View>
      </Animatable.View>

      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#44A86C" />
        </View>
      )}

      <FlatList
        data={handleSearch()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={ () => {
              const Vereador = item;
              Navigator.navigate("Selected_vereador", { Dados, Vereador })
          } }>
            <Each_Vereador Nome={item.Nome} Partido={item.Partido} Images={item.Imagem} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.Cpf}
        contentContainerStyle={styles.flatListContainer}
      />

      <View style={styles.separator}/>

      <Animatable.View style={styles.backNavigator} animation="zoomIn" duration={1500}>
        <TouchableOpacity onPress={async () => await Navigator.navigate("Periodos", { Dados, Selected })}>
          {/* <IconHome_ style={styles.iconHome}></IconHome_> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ await Navigator.navigate("Initialize_chat", { Dados } ) }} >
          {/* <IconChat style={styles.iconChat}></IconChat> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ await Navigator.navigate("ChangeProfile", { Dados }) }}>
          {/* <IconPerfil style={styles.iconPerfil}></IconPerfil> */}
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topImage: {
    backgroundColor: '#44A86C',
    height: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  h1Periodo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
  timePeriodo: {
    color: '#fff',
    paddingTop: 3,
    fontSize: 25,
    fontWeight: '400',
  },
  MainSearch: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: '2%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    width: '80%',
    height: 48,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
    marginBottom: 0,
    color: '#888',
  },
  inputSearch: {
    flex: 1,
    fontSize: 16,
  },
  loaderContainer: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
  },
  backNavigator: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconHome: {
    marginLeft: 50,
  },
  iconPerfil: {
    marginRight: 50,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: "black",
  }
});

export default SearchCouncilors;
