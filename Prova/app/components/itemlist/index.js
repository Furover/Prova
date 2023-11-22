import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { app_db } from '../../../firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'

export function ItemList({ navigation }){
    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsRef = collection(app_db, 'Listings')

        const subscriver = onSnapshot(productsRef, {
            next : (snapshot) => {
              const productsq = []
              snapshot.docs.forEach(doc =>{
                productsq.push({
                  key : doc.id,
                  ...doc.data(),
                  
                })
              })
              setProducts(productsq)
              
    
              
            }
          })

          return () => subscriver()

    },[])

    return(
        <View style={styles.itemlist} >
            <FlatList
                data={products}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.itemcontainer} >
                    {item ? (
                            <View style={styles.itemarea} >
                                <View style={styles.itemarea} >
                                    <Image style={styles.itemimage} source={{ uri : item.Image }} />
                                    <Text style={styles.itemtitle} >{item.Title}</Text>
                                    <Text style={styles.itemprice} >R${item.Price}.00</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Details", { paramKey:[item.key] })} style={styles.itemseebutton} >
                                        <Text style={styles.itemseetxt} >Ver Anúncio</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    ) : (
                        <View style={[styles.itemarea, {height: 200}]} >
                            <ActivityIndicator size={100} color="#E06E8B" />
                        </View>
                    )}
                    </View>
                )}
            />
        </View>
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
    itemcontainer:{
        backgroundColor: "#F9F9F9", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        marginTop: 10,
        marginHorizontal: 5,
        marginBottom: 20,
        alignItems: 'center'
    },
    itemarea:{
        alignItems: 'center',
        width: "95%",
        marginVertical: 10,
    },
    itemimage:{
        height: 155,
        width: 155,
        borderRadius: 10,
        marginBottom: 20
    },
    itemtitle:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        width: "100%",
        minHeight: 40
    },
    itemprice:{
        padding: 5,
        width: "100%",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: "#E06E8B",
        color: "#FFF",
        borderRadius: 25,
    },
    itemseebutton:{
        width: "100%",
        marginTop: 11,
    },
    itemseetxt:{
        padding: 7,
        width: "100%",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: "#38BA9B",
        color: "#FFF",
        borderRadius: 25

    }
})