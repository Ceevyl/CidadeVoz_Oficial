import * as Animatable from "react-native-animatable"
import { View, Text, StatusBar,TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons , MaterialCommunityIcons  } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Selected_vereador({route}){

    const { Dados, Vereador } = route.params;
    console.log(Vereador)
    const color = Dados.person_config.Tipo === "Sou vereador" ? "#618CFA" : "#44A86C"
    const Navigator = useNavigation();

    return (
        <Animatable.View style={{backgroundColor: "white", width: '100%',height: '100%'}} animation="pulse">
            <StatusBar backgroundColor="#fff"></StatusBar>

            <View style={{justifyContent: "space-between", flexDirection: "row", marginLeft: 15, marginTop: 20}}>
                <TouchableOpacity onPress={()=>{Navigator.goBack()}}>
                    <AntDesign name="arrowleft" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{width: 92, height: 92, backgroundColor: "#D9D9D9", borderRadius: 50, alignSelf: "center"}}/>

            <View style={{alignSelf: "center"}}>
                <Text style={{textAlign: "center", marginTop: 10, fontWeight: "bold", fontSize: 16}}>{Vereador.Nome}</Text>
                <Text style={{textAlign: "center", marginTop: 5, fontSize: 12}}>Escolha a Opção Que Deseja Explorar</Text>
            </View>

            <View style={{alignSelf: "center", backgroundColor: "gold" ,height: 1 ,width: '50%', marginTop: 23}}/>

            <Animatable.View style={{alignItems: "center", marginTop: 23}}>

                <TouchableOpacity style={ { width: '80%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } onPress={async () => { await Navigator.navigate("Postagens", { Dados, Vereador } ) }} >
                    <View style={ { width: '90%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } >
                        <FontAwesome name="user" size={32} color={color} style={{position: "absolute", marginTop: 12, marginLeft: 15}} />            
                        <Text style={{fontWeight: "bold", position: "absolute", marginLeft: 60, marginTop: 10}}>Perfil</Text>
                        <Text style={{position: "absolute",  marginLeft: 60, marginTop: 28, fontSize: 11, fontWeight: '300'}}>Postagens</Text>
                        <Text style={{fontWeight: "bold", position: "absolute", marginTop: 20, alignSelf: "flex-end"}}>VEJA MAIS...</Text>
                    </View>
                </TouchableOpacity>
                

                <TouchableOpacity style={ { width: '80%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8, marginTop: 10 } }>
                    <View style={ { width: '90%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } >
                        <Ionicons name="stats-chart" size={32} color={color} style={{position: "absolute", marginTop: 12, marginLeft: 15}} />            
                        <Text style={{fontWeight: "bold", position: "absolute", marginLeft: 60, marginTop: 10}}>Estatísticas</Text>
                        <Text style={{position: "absolute",  marginLeft: 60, marginTop: 28, fontSize: 11, fontWeight: '300'}}>Analise tudo</Text>
                        <Text style={{fontWeight: "bold", position: "absolute", marginTop: 20, alignSelf: "flex-end"}}>VEJA MAIS...</Text>
                    </View>
                </TouchableOpacity>      
                
                <TouchableOpacity style={ { width: '80%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8, marginTop: 10 } }>
                    <View style={ { width: '90%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } >
                        <AntDesign name="message1" size={32} color={color} style={{position: "absolute", marginTop: 12, marginLeft: 15}} />            
                        <Text style={{fontWeight: "bold", position: "absolute", marginLeft: 60, marginTop: 10}}>Comissões</Text>
                        <Text style={{position: "absolute",  marginLeft: 60, marginTop: 28, fontSize: 11, fontWeight: '300'}}>Descrição</Text>
                        <Text style={{fontWeight: "bold", position: "absolute", marginTop: 20, alignSelf: "flex-end"}}>VEJA MAIS...</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={ { width: '80%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8, marginTop: 10 } }>
                    <View style={ { width: '90%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } >
                        <Ionicons name="book" size={32} color={color} style={{position: "absolute", marginTop: 12, marginLeft: 15}} />            
                        <Text style={{fontWeight: "bold", position: "absolute", marginLeft: 60, marginTop: 10}}>História</Text>
                        <Text style={{position: "absolute",  marginLeft: 60, marginTop: 28, fontSize: 11, fontWeight: '300'}}>Descrição</Text>
                        <Text style={{fontWeight: "bold", position: "absolute", marginTop: 20, alignSelf: "flex-end"}}>VEJA MAIS...</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={ { width: '80%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8, marginTop: 10 } }>
                    <View style={ { width: '90%', height: 60, backgroundColor: "#D9D9D9", borderRadius: 8 } } >
                        <MaterialCommunityIcons name="podium" size={32} color={color} style={{position: "absolute", marginTop: 12, marginLeft: 15}} />            
                        <Text style={{fontWeight: "bold", position: "absolute", marginLeft: 60, marginTop: 10}}>Ranking</Text>
                        <Text style={{position: "absolute",  marginLeft: 60, marginTop: 28, fontSize: 11, fontWeight: '300'}}>Veja o Ranking</Text>
                        <Text style={{fontWeight: "bold", position: "absolute", marginTop: 20, alignSelf: "flex-end"}}>VEJA MAIS...</Text>
                    </View>
                </TouchableOpacity>    

                  

                

            </Animatable.View>

        </Animatable.View>
    )
}