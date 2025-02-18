import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import Infobox from "../../components/Infobox"

export default function Login() {
  const [animation] = useState(new Animated.Value(0)); // Declaração de Variavel para Animação.
  const [getCPF, setCPF] = useState('');
  const [getSenha, setSenha] = useState('');
  const [geterrorValue,setErrorValue] = useState(null);
  const [getText, setText] = useState('');
  const [getCor, setCor] = useState('#ff0000')

  useEffect(() => {
    const animateUp = Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    const animateDown = Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });
    const animatedLoop = Animated.sequence([animateUp, animateDown]);
    const animatedLoopLooped = Animated.loop(animatedLoop);
    animatedLoopLooped.start();
    return () => {
      animatedLoopLooped.stop();
    };
  }, []);

  const animatedStyles = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      },
    ],
  };

  const Navigator = useNavigation();

  const Change_CPF = (event) => {
    const key = event.nativeEvent.text
    setCPF(key)
  }

  const Change_Senha = (event) => {
    const key = event.nativeEvent.text
    setSenha(key)
  }

  const Go_Periods = async () => {
    await axios.get(`https://cidade-voz-gerencer-ceevyl.vercel.app/getUserByCPF/${getCPF}`).then((response)=>{
      console.log(response.data)
      console.log(response.data['person_config']['Senha'], getSenha)
      if (response.data['person_config']['Senha'] === getSenha ) {

        const Dados = response.data;

        setCor("#44A86C")
        setErrorValue(true)
        setText('Logado Com Sucesso !')
        setTimeout(() => {
            setErrorValue(null);
          setText('')
        }, 3000);

        setTimeout( () => {
          return Navigator.navigate("Periodos", { Dados })
        }, 1000)

        return;
      }
      setErrorValue(true)
      setCor("#ff0000")
      setText('CPF e/ou Senha Inválidos')
      setTimeout(() => {
        setErrorValue(null);
        setText('')
      }, 3000);


    }).catch((err) => {
      console.log(err)
      setCor("#ff0000")
      setErrorValue(true)
      setText('CPF e/ou Senha Inválidos')
      setTimeout(() => {
        setErrorValue(null);
        setText('')
      }, 3000);
    })
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardStyle}
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {geterrorValue && (
        <Infobox message={getText} duration={3000} color={getCor} />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animatable.View
          style={styles.container}
          delay={500}
          animation="fadeIn"
        >
          <View>
            <Text style={styles.Acessar}>ACESSAR</Text>
            <Text style={styles.TextAcessar}>
              Olá, seja bem vindo ao CidadeVoz acesse para mais informações.
            </Text>
          </View>

          <Animated.View style={[styles.container_image, animatedStyles]}>
            <Image
              style={styles.ImageLogoLogin}
              source={require("../../assets/Logo.png")}
            ></Image>

            <Text style={styles.Text_Cidade}>CIDADE</Text>
            <Text style={styles.Text_Voz}>Voz</Text>
          </Animated.View>

          <View style={styles.container_inputs}>
            <TextInput
              caretHidden={true}
              placeholder="CPF"
              onChange={Change_CPF}
              style={styles.inputCPF}
            ></TextInput>

            <TextInput
              caretHidden={true}
              placeholder="Senha"
              onChange={Change_Senha}
              secureTextEntry={true}
              style={styles.inputSenha}
            ></TextInput>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Esqueceu a Senha ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Btn_Logar}
              onPress={Go_Periods}
            >
              <Text style={styles.text_login}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.container_register}
              onPress={async () => await Navigator.navigate("Register")}
            >
              <Text style={styles.text_register}>Não Tem Uma Conta ? </Text>
              <Text style={styles.btnRegister}>Registre-se Já</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Image
              style={styles.conffetiL}
              source={require("../../assets/Left_Conffeti.png")}
            />
          </View>

          <View>
            <Image
              style={styles.conffetiR}
              source={require("../../assets/Right_Conffeti.png")}
            />
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardStyle: {
    flex: 1,
    backgroundColor: "white"  
  },
  conffetiL: {
    position: "absolute",
    width: 6,
    height: 779,
    bottom: -100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  conffetiR: {
    position: "absolute",
    width: 6,
    height: 820,
    bottom: -100,
    left: "98%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  Acessar: {
    fontSize: 20,
    fontWeight: 700,
    paddingLeft: "13%",
    paddingTop: "25%",
  },
  TextAcessar: {
    paddingLeft: "13%",
    paddingRight: "13%",
    paddingTop: "3%",
    fontSize: 13,
  },
  container_image: {
    flexDirection: "row",
  },
  ImageLogoLogin: {
    marginLeft: "13%",
    marginTop: 30,
    width: 100,
    height: 100,
  },
  Text_Cidade: {
    marginTop: 30,
    marginLeft: "6%",
    fontWeight: 700,
    fontSize: 35,
    display: "flex",
    color: "#44A86C",
  },
  Text_Voz: {
    position: "absolute",
    left: "47%",
    top: "53%",
    fontSize: 22,
    color: "#44A86C",
    fontWeight: 300,
  },
  container_inputs: {
    marginLeft: "13%",
    marginTop: "8%",
    marginRight: "13%",
  },
  inputCPF: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    borderRadius: 5,
    height: 35,
    textAlign: "center",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
  },
  inputSenha: {
    marginTop: "5%",
    backgroundColor: "#f5f5f5",
    color: "#000",
    borderRadius: 5,
    height: 35,
    textAlign: "center",
    elevation: Platform.OS === "android" ? 4 : 0,
    ...Platform.select({
      android: {
        shadowOffset: { width: 1, height: 1 },
      },
    }),
  },
  forgotPassword: {
    marginTop: "2%",
    color: "#44A86C",
    fontWeight: 500,
    fontSize: 12,
    textAlign: "right",
  },
  Btn_Logar: {
    marginTop: "17%",
    backgroundColor: "#44A86C",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  text_login: {
    color: "white",
  },
  text_register: {
    marginTop: "3%",
    textAlign: "right",
    color: "#44A86C",
    fontSize: 11,
  },
  container_register: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnRegister: {
    marginTop: "3%",
    fontWeight: "bold",
    color: "#000",
    fontSize: 11,
  },
});
