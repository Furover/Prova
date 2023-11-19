import { View, Text, StyleSheet, Image, Dimensions } from "react-native";


export function OnboardingItem({ data }){
    const width = Dimensions.get("window").width;

    return(
        <View style={[styles.container, {width: width}]} >
            <Image source={{ uri : data.Image }} style={[styles.image, { width: width }]} />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image:{
        height: "100%",
        resizeMode: 'stretch',
        borderRadius: 20
    }
})