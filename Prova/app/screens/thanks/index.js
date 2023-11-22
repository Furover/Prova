import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app_db } from '../../../firebaseConfig'
import { collection, documentId, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore'

export function Thanks({ navigation, route }){
    const username = route.params.paramKey[0]
    
    return(
        <SafeAreaView style={styles.itemlist} >
                <View style={styles.thankyou} >
                    <Feather name="thumbs-up" size={175} color={"#38BA9B"} />
                    <Text style={styles.thankyoutxt} >Obrigado pela compra {username}!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.gobackbutton} >
                        <Text style={styles.gobacktxt} >Voltar para home</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    itemlist:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15
    },
    thankyou:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    thankyoutxt:{
        fontWeight: "bold",
        width: "90%",
        textAlign: "center",
        fontSize: 25,
        marginTop: 35
    },
    gobackbutton:{
        marginTop: "25%",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
    },
    gobacktxt:{
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        fontSize: 19,
        backgroundColor: "#38BA9B",
        color: "#FFF",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25
    }

})