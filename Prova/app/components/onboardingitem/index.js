import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";


export function OnboardingItem({ data }){
    const { width } = useWindowDimensions();

    return(
        <View style={[styles.container, {width: width}]} >
            <Image source={{ uri : data.Image }} style={[styles.image]} />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        height: 240,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    image:{
        width: "100%",
        height: 240,
        resizeMode: 'stretch',
    }
})