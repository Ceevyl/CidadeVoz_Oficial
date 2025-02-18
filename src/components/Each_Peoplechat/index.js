import { View, Text, Image, StyleSheet } from "react-native";





export default function Each_Peoplechat( {image, namePeople} ){
    return (
        <View style={styles.container} >
                {/* User Avatar */}
          <Image
            source={{
              uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
            }}
            style={[{ width: 50, height: 50 }, styles.image]}
          />
    
                {/* Content Container */}
          <View style={styles.content}>
                    <View style={styles.row} >
                <Text style={styles.name}>{namePeople}</Text>
              </View>
          </View>
        </View>
      );
    };
    


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
        marginHorizontal: 10,
        marginVertical: 5,
        height: 70,
    },
    image: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 30,
        marginRight: 10,
    },
    content: {
        flex: 1,
        borderBottomColor: "lightgray",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: "row",
        marginBottom: 5,
    },
    name: {
        fontWeight: "bold",
        flex: 1,
    },
    subTitle: {
        color: "grey",
    },
});