import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { IconImageDefault } from "../../Icons"; 






export default function Each_Vereador({ Nome, Partido, Images }){

    if (Nome.length > 15){
        Nome = Nome.slice(0, 15) + "...";
    }

    return (
        <Animatable.View style={styles.container} animation="zoomIn" >
            <Animatable.View animation="flipInY" duration={1000} delay={500} style={styles.border}>
                { Images != "N/A" ? <Animatable.Image animation="flipInY" style={styles.Image} source={ Images }/> : <IconImageDefault style={styles.iconezin}></IconImageDefault> }
            </Animatable.View>
            <Animatable.View animation="fadeIn" duration={1000} delay={500} style={styles.NomeEPartido}>
                <Text style={styles.Nome}>{Nome || "João"}</Text>
                <Text  style={styles.partido}>{Partido || "PSL"}</Text>
            </Animatable.View>
            <TouchableOpacity>
                <Animatable.Text animation="fadeIn" duration={1000} delay={500} style={styles.verperfil}>VER PERFIL</Animatable.Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 326,
        height: 60,
        backgroundColor: "#D9D9D9",
        marginLeft: '5%',
        marginRight: "5%",
        marginTop: '1%',
        borderRadius: 20,
    },
    Image : {
        width: 34,
        height: 34,
        borderRadius: 30,
        marginLeft: 1.5,
        marginTop: 1.5
    },
    border: {
        width: 37,
        height: 37,
        marginLeft: '10%',
        marginTop: '4%',
        borderRadius: 30,
        backgroundColor: "#44A86C",
    },
    NomeEPartido: {
        position: "absolute",
        marginLeft: '27%',
        marginTop: '3%',
        width: 90,
        height: 30
    },
    Nome: {
        fontWeight: "bold",
        marginTop: 1
    },
    partido: {
        fontWeight: 300
    },
    verperfil: {
        position: "absolute",
        marginTop: -28,
        marginLeft: '70%',
        fontWeight: "bold"
    },
    iconezin: {
        marginLeft: 1.4
    }

})