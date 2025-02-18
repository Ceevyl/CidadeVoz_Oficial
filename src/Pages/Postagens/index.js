import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome, Ionicons , MaterialCommunityIcons  } from '@expo/vector-icons';

export default function Postagens({route}){
    const {Dados, Vereador} = route.params;

    console.log(Vereador)
    const color = Dados.person_config.Tipo === "Sou vereador" ? "#618CFA" : "#44A86C"

    return (<View style={styles.container}>
        <AntDesign name="arrowleft" size={28} color="black" style={{ marginLeft: '5%', marginTop: '5%' }} />

        <View style={styles.containerImage} />
        <View style={{marginTop: '10%'}}>
            <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 16 }}>{Vereador.Nome}</Text>
            <Text style={{alignSelf: "center", fontWeight: "bold", color: color}}>{Vereador.Partido}</Text> 
            <Text style={{alignSelf: "center", textAlign:"center" , fontSize: 12 ,marginLeft: 30, marginRight: 30, marginTop: 10}}> Pra ndoiasndoi dada dadaadsdsada asndio nasiodnasiond saiodn isoand ioas</Text>              
        </View>
        <View style={{ justifyContent: "space-between" , flexDirection: "row", marginLeft: 20, marginRight: 20, marginTop: 20}} >
            <TouchableOpacity style={[styles.button, {backgroundColor: color, justifyContent: "center"}]}>
                <Text style={{ fontSize: 12, color: "white" ,alignSelf: "center", justifyContent: "center", textAlign: "center"}}>ESTATÍSTICAS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: color, justifyContent: "center"}]}>
                <Text style={{ fontSize: 12, color: "white" ,alignSelf: "center", justifyContent: "center", textAlign: "center"}}>SUGESTÕES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: color, justifyContent: "center"}]}>
                <Text style={{ fontSize: 12, color: "white" ,alignSelf: "center", justifyContent: "center", textAlign: "center"}}>CHAT</Text>
            </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, width: '90%', height: 1 , backgroundColor: "#1c1c1c", marginLeft: '5%', marginRight: '5%' }}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: "white"
    },
    containerImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#1c1c1c",
        position: "absolute",
        alignSelf: "center",
        marginTop: 15
    },
    button: {
        width: 105,
        height:  27,
        borderRadius: 2
        
    }
})