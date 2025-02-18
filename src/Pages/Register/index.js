import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

export default function Register() {
  const scrollRef = useRef(null);
  const Navigator = useNavigation();
  const [moodRadio, setMood] = useState("");
  const [getRadioValue, setRadioValue] = useState(null);
  const [getName, setName] = useState('');
  const [getCPF, setCPF] = useState('');
  const [getSenha, setSenha] = useState('');
  const [getConfSenha, setConfSenha] = useState('');
  const [getEmail, setEmail] = useState('');

  const Change_Name = (event) => {
    const key = event.nativeEvent.text
    setName(key)
  }

  const Change_CPF = (event) => {
    const key = event.nativeEvent.text
    setCPF(key)
  }

  const Change_Senha = (event) => {
    const key = event.nativeEvent.text
    setSenha(key)
  }

  const Chang_Conf_Senha = (event) => {
    const key = event.nativeEvent.text
    setConfSenha(key)
  }

  const Change_Email = (event) => {
    const key = event.nativeEvent.text
    setEmail(key)
  }

  const Register_Func = async () => {
    const cpf = getCPF;
    const Payload = {
      Nome: getName,
      Senha: getSenha,
      Email: getEmail,
      Tipo: moodRadio,
      Imagem: "N/A",
      Chat: [],
      Sugestoes: []
    };



    await axios.post('https://cidade-voz-gerencer-ceevyl.vercel.app/register', {
      CPF: cpf,
      MyData: Payload
    }).then( response => {
        console.log(response.data.message)
    } ).catch( error => {
      console.log(error)
    })

      if ( moodRadio == "Sou vereador"){
        await axios.post('https://cidade-voz-gerencer.vercel.app/addvereadortoperiodo', {
          MyData: Payload,
          CPF: cpf
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
        console.error(error);
    }); 
      }

  }
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Animatable.View
              style={styles.container_Register}
              animation="slideInLeft"
            >
              <Text style={styles.Registrar}>REGISTRO</Text>
              <Text style={styles.RegistroSubText}>
                Registre-se agora e aproveite recursos exclusivos!
              </Text>
            </Animatable.View>

            <Animatable.View
              style={styles.Register_inputs}
              animation="slideInLeft"
            >
              <TextInput
                placeholder="Nome Completo"
                caretHidden={true}
                onChange={Change_Name}
                style={styles.Input_Nome}
              />

              <TextInput
                placeholder="CPF"
                caretHidden={true}
                onChange={Change_CPF}
                style={styles.Input_CPF}
              />

              <TextInput
                placeholder="Senha"
                secureTextEntry={true}
                caretHidden={true}
                onChange={Change_Senha}
                style={styles.Input_Senha}
              />

              <TextInput
                placeholder="Confirmar Senha"
                secureTextEntry={true}
                caretHidden={true}
                onChange={Chang_Conf_Senha}
                style={styles.Input_ConfirmSenha}
              />

              <TextInput
                placeholder="Email"
                caretHidden={true}
                onChange={Change_Email}
                style={styles.Input_Email}
              />
            </Animatable.View>

            <Animated.View style={styles.wrapperRadio}>
              {["Sou cidadão","Sou vereador"].map((ocupacao) => (
                <Animated.View key={ocupacao} style={styles.moodRadio}>
                  <View style={styles.textOcupacao}>
                    <Text style={styles.ocupacao}>{ocupacao}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.radioCidadao}
                    onPress={async () => {
                      setMood(ocupacao)
                      console.log(moodRadio)
                    }}
                  >
                    {moodRadio === ocupacao && (
                      <Animated.View style={styles.inner} />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </Animated.View>

            <Animatable.View animation="fadeIn" delay={300}>
              <TouchableOpacity style={styles.Btn_Registrar} onPress={Register_Func}>
                <Text style={styles.Text_Registro}>CRIAR CONTA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => await Navigator.navigate("Login") }
              >
                <Text style={styles.Text_Acessar_White}>
                  {" "}
                  Já Possui uma Conta ?{" "}
                  <Text style={styles.Text_Acessar_App}>Acessar</Text>{" "}
                </Text>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="slideInLeft">
              <Image
                style={styles.conffetiL}
                source={require("../../assets/Left_Conffeti.png")}
              />
            </Animatable.View>

            <Animatable.View animation="slideInRight">
              <Image
                style={styles.conffetiR}
                source={require("../../assets/Right_Conffeti.png")}
              />
            </Animatable.View>
            
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  conffetiL: {
    position: "absolute",
    width: 6,
    height: 850,
    bottom: -100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  conffetiR: {
    position: "absolute",
    width: 6,
    height: 850,
    bottom: -100,
    left: "98%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "space-around",
  },
  container_Register: {
    backgroundColor: "#fff",
  },
  Registrar: {
    fontSize: 20,
    fontWeight: 700,
    paddingLeft: "13%",
    paddingTop: "25%",
  },
  RegistroSubText: {
    paddingLeft: "13%",
    paddingRight: "13%",
    paddingTop: "3%",
    fontSize: 13,
  },
  Register_inputs: {
    paddingTop: 30,
    paddingLeft: "13%",
    paddingRight: "13%",
  },
  Input_Nome: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#44A86C",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
    borderRadius: 5,
    height: 35,
  },
  Input_CPF: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#44A86C",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
    borderRadius: 5,
    height: 35,
    marginTop: "10%",
  },
  Input_Senha: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#44A86C",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
    borderRadius: 5,
    height: 35,
    marginTop: "10%",
  },
  Input_ConfirmSenha: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#44A86C",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
    borderRadius: 5,
    height: 35,
    marginTop: "10%",
  },
  Input_Email: {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "#44A86C",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
    borderRadius: 5,
    height: 35,
    marginTop: "10%",
  },
  Btn_Registrar: {
    marginLeft: "13%",
    marginRight: "13%",
    marginTop: 20,
    height: "22%",
    backgroundColor: "#44A86C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  Text_Registro: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  Text_Acessar_White: {
    paddingLeft: "13%",
    paddingRight: "13%",
    paddingTop: "3%",
    textAlign: "center",
    fontSize: 13,
  },
  Text_Acessar_App: {
    color: "#44A86C",
    fontWeight: "bold",
  },
  inner: {
    width: 9,
    height: 9,
    backgroundColor: "#44A86C",
    borderRadius: 12,
    justifyContent: "center",
    margin: "15%",
  },
  radioCidadao: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: "8%",
    marginLeft: "15%",
  },

  wrapperRadio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "8%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  moodRadio: {
    marginLeft: 35,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  ocupacao: {
    fontSize: 11,
    textTransform: "capitalize",
  },
  textOcupacao: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 7,
  },
});
