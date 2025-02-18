import { View, Text, StyleSheet, Image, TouchableOpacity, Touchable, StatusBar } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from "react-native-animatable"
import { IconImageDefault_Perfil, IconChat,IconHome_,IconPerfil, IconAlterarSenha, IconAlterarFoto, IconSugestion, IconClose } from "../../Icons"
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from "react";
import FormData from 'form-data';
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";


// Função para formatar o CPF
function formatarCPF(cpf) {
  if (!cpf) return '';
  cpf = cpf.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatData(date){
    return date.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3' )
}

function formatCityAndState(city, state){
    if (city.length > 8){
        city = city.slice(0, 8) + "...";
    }

    const formated = city + " - " + state;

    return formated;
}

export default function Change_Profile({ route }) {
    const [panel, setPanel] = useState(null)
    const [atualSenha, setAtualSenha] = useState();
    const [confirmAtualSenha, setConfirmAtualSenha] = useState();
    const [getSelectedImage, setSelectedImage] = useState('N/A');
    const { Dados } = route.params;

    const color = Dados.person_config.Tipo == "Sou vereador" ? "#618CFA" : "#44A86C"
    
    const cpf = Dados.cpf;
    const data = "00/00/0000"
    const city = "Monte Mor"
    const state = "SP"
    const Nome = Dados.person_config.Nome;
    const Navigator = useNavigation()

    const formatedCpf = formatarCPF(cpf)
    const formatedDate = formatData(data)
    const formatedCityAndState = formatCityAndState(city, state)
 
    const alterarSenha = async () => {
      if (!panel){
        return setPanel(true)
      }else {
        return setPanel(false)
      }
    }

    const ChangeTextSenha = async(text) => {
      setAtualSenha(text)
    }
    
    const ChangeTextConfirmSenha = async(text) => {
      setConfirmAtualSenha(text)
    }

    const updateSenha = async (senha) => {
      const response = await axios.get(`https://cidade-voz-gerencer.vercel.app/getUserByCPF/${cpf}`)
      let myData = response.data;

      myData.person_config.Senha = senha;

      axios.post( "https://cidade-voz-gerencer.vercel.app/updateSenha", { myData: myData } ).then( response => {
        console.log(response.data);
      } )
    }

    const ConfirmSenha = async () => {
      if ( atualSenha != "" && confirmAtualSenha != "" ) {

        if ( atualSenha === confirmAtualSenha ){
          updateSenha(confirmAtualSenha)
        }else {
          return alert("As Senhas Não Coincidem !")
        }

      }else {
        return alert("Os Campos Não Podem Estar Vazios !")
      }

    }

    return (
      <Animatable.View style={styles.container} animation="pulse">
        <StatusBar backgroundColor={color}></StatusBar>
        <LinearGradient
          colors={[color, '#fff', "#a3a3a3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
           <Image style={styles.Images} source={require("../../assets/republicabr.png")} />
            <View style={styles.header}>
                <View style={[styles.radius, { backgroundColor: color }]}>
                    {/* {getSelectedImage != "N/A" ? <Image style={styles.perfilimage} source={ { uri: getSelectedImage } } /> : <IconImageDefault_Perfil />} */}
                </View>
              <Text style={styles.Nome}>{Nome}</Text>
              <Text style={styles.Cpf}>{formatedCpf}</Text>
  
              <View style={styles.mainHeader_names}>
                <Text style={styles.textNascimento} >NASCIMENTO</Text>      
                <Text style={styles.textCidadeNatal} >CIDADE NATAL</Text>    
              </View>
  
              <View style={styles.mainHeader_values}>
                <Text style={styles.textNascimento} >{formatedDate}</Text>      
                <Text style={styles.textCidadeNatalNew} >{formatedCityAndState}</Text>    
              </View>
            </View>

          <View style={[styles.division, {backgroundColor: color}]}></View>

          <View style={styles.containerButton}>

            <TouchableOpacity style={[styles.button_alterar_senha, { backgroundColor: color }]} onPress={alterarSenha}>
                <IconAlterarSenha style={{ position: "absolute", marginLeft: 10 }}/>
                <Text style={ { marginLeft: 40, color: "white", fontWeight: "bold" } }>ALTERAR SENHA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button_alterar_senha, { backgroundColor: color }]} >
                <IconAlterarFoto style={{ position: "absolute", marginLeft: 10 }} />
                <Text style={ { marginLeft: 40, color: "white", fontWeight: "bold" } }>ALTERAR FOTO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button_alterar_senha, { backgroundColor: color }]}>
                <IconSugestion style={{ position: "absolute", marginLeft: 10 }}/>
                <Text style={ { marginLeft: 40, color: "white", fontWeight: "bold" } }>SUGESTÕES</Text>
            </TouchableOpacity>

            { panel && (<Animatable.View animation="flipInY" style={ {position: "absolute", marginLeft: '18%', marginRight: '30%', bottom: 5 , zIndex: 2} }>
              
                <View style={{width: 240, height: 240, backgroundColor: "#2f2f2f", borderRadius: 30}}>
                    <Text style={{textAlign: "center", alignContent: "center", justifyContent: "center", marginTop: 30, fontWeight: "bold", fontSize: 20, color: "white" }}>Trocar Senha</Text>
                    <View style={{width: '80%', height: 40, backgroundColor: "#fff", marginLeft: '10%', marginRight: '10%', borderRadius: 30, marginTop: 25, alignItems: "center", justifyContent:"center" }}>
                        <TextInput onChangeText={ChangeTextSenha} placeholder="Nova Senha" style={{alignItems: "center", textAlign: "center", justifyContent: "center", alignContent:"center"}}></TextInput>
                    </View>

                    <View style={{width: '80%', height: 40, backgroundColor: "#fff", marginLeft: '10%', marginRight: '10%', borderRadius: 30, marginTop: 10, alignItems: "center", justifyContent:"center" }}>
                        <TextInput onChangeText={ChangeTextConfirmSenha} placeholder="Confirme a Senha" style={{alignItems: "center", textAlign: "center", justifyContent: "center", alignContent:"center"}}></TextInput>
                    </View>
                    
                    <TouchableOpacity onPress={ConfirmSenha} style={{ width: '80%', height: 40, marginLeft: '10%', marginRight: '10%', backgroundColor: "#ffcb74", marginTop: 15, borderRadius: 30, justifyContent: "center" }}>
                        <Text style={{color: "#000", fontWeight: "bold", textAlign: "center"}}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: "absolute",marginTop: 10, marginLeft: 15 }} onPress={alterarSenha}>
                      <IconClose></IconClose>
                    </TouchableOpacity>
                </View>
                
            </Animatable.View>) }

          </View>

        </LinearGradient>

       

     
      <View style={styles.separator}></View>

      <Animatable.View style={styles.backNavigator} animation="zoomIn" duration={1500}>

        <TouchableOpacity>
          <IconHome_ style={[styles.iconHome]}></IconHome_>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ await Navigator.navigate("Initialize_chat", { Dados } ) }} >
          <IconChat style={styles.iconChat}></IconChat>
        </TouchableOpacity>

        <TouchableOpacity onPress={async ()=>{ console.log("Ja está na Pagina") }}>
          <IconPerfil style={styles.iconPerfil}></IconPerfil>
        </TouchableOpacity>

        </Animatable.View>

      </Animatable.View>
    )
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: '100%',
    height: '100%'
  },
  header: {
    zIndex: 0
  },
  Images: {
    position: "absolute",
    width: '100%',
    opacity: 0.09,
    zIndex: 0
  },
  radius: {
    borderRadius: 50,
    width: 62,
    height: 62,
    backgroundColor: "#317600",
    marginTop: 68,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 149,
    zIndex: 1
  },
  perfilimage: {
    borderRadius: 50,
    width: 62,
    height: 62
  },
  Nome: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15
  },
  Cpf: {
    fontWeight: '300',
    textAlign: "center",
    fontSize: 12
  },
  mainHeader_names: {
    flexDirection: "row",
    height: 14,
    marginTop: 20,
    alignContent: "center",
    alignItems: "center"
  },
  mainHeader_values:{
    flexDirection: "row",
    height: 40,
    alignContent: "center",
    alignItems: "center"
  },
  textNascimento: {
    marginLeft: 31,
    fontWeight: "bold",
    color: "black",
    fontSize: 13,
  },
  textCidadeNatal: {
    marginLeft: '35%',
    fontWeight: "bold",
    color: "black",
    fontSize: 13,
  },
  textCidadeNatalNew:{
    marginLeft: '39%',
    fontWeight: "bold",
    color: "black",
    fontSize: 13,
  },
  teste: {
    width: 130,
    height: 130,
    backgroundColor: "red"
  },
  backNavigator: {
    width: "100%",
    height: 55,
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
  },
  division: {
    width: '90%',
    height: 2,
    backgroundColor: "#44A86C",
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 25
  },
  button_alterar_senha: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 5,
    height: 43,
    backgroundColor: "#44A86C",
    borderRadius: 3,
    justifyContent: "center"
  }
})
