import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app_db } from '../../../firebaseConfig'
import { collection, documentId, onSnapshot, query, where, updateDoc, doc, arrayRemove } from 'firebase/firestore'

export function Cart({ navigation, route }){
    const [user, setUser] = useState({})
    const [listing, setListing] = useState([])
    const [removed, setRemoved] = useState(0)

    useEffect(() => {

        const userRef = collection(app_db, 'Users')
    
        const q = query(
            userRef,
            where(documentId(), '==', route.params.paramKey[0])
        )
    
        
    
        const subscriver = onSnapshot(q, {
            next : (snapshot) => {
                const userq = []
                
                snapshot.docs.forEach(doc =>{
                    userq.push({
                        key : doc.id,
                        ...doc.data(),
                       
                    })
                })
                setUser(userq[0])
                console.log(user.Cart)
                console.log(listing)
            
            }
        })

          return () => subscriver()

    },[removed])

    useEffect(() => {

        var cart = user.Cart

        if(user.Cart != undefined || user.Cart != {} || user.Cart != "" || user.Cart != null || user.Cart.length == 0){
            try {
                const listingRef = collection(app_db, 'Listings')

                const q = query(
                    listingRef,
                    where(documentId(), 'in', user.Cart)
                )

                const subscriver = onSnapshot(q, {
                    next : (snapshot) => {
                    const listingq = []
                    snapshot.docs.forEach(doc =>{
                        listingq.push({
                        key : doc.id,
                        ...doc.data(),
                        
                        })
                    })
                    setListing(listingq)
                    console.log(listing)
                    
            
                    
                    }
                })

                return () => subscriver()
        } catch(error){
            let interval = setInterval(() => {
                try{
                    setListing([])
                } catch(error){
                    
                }
            }, 350)
    
            return () => clearInterval( interval )
        }
        }

    },[user, removed])

    const Buy = async () => {

        const userRef = doc(app_db, "Users", route.params.paramKey[0])

        try{
            updateDoc(userRef,{
                Cart: {}

            })
            navigation.navigate("Thanks", {paramKey:[user.Name]})
            } catch(error) {
                console.log(error)
                alert("Ocorreu um erro, tente novamente.")
            }
    }

    const Remove = async (id) => {

        const userRef = doc(app_db, "Users", route.params.paramKey[0])

        try{
            updateDoc(userRef,{
                Cart: arrayRemove(id)

            })
            setRemoved(removed + 1)
            } catch(error) {
                console.log(error)
                alert("Ocorreu um erro, tente novamente.")
            }
    }

    return(
        <SafeAreaView style={styles.itemlist} >
            {listing.length != 0 ? (
            <View style={styles.itemlist} >
                <FlatList
                    data={listing}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.itemcontainer} >
                                <View style={styles.itemarea} >
                                    <View style={styles.itemarea} >
                                        <Image style={styles.itemimage} source={{ uri : item.Image }} />
                                        <View style={styles.itemdetails} >
                                            <Text style={styles.itemtitle} >{item.Title}</Text>
                                            <Text style={styles.itemprice} >R${item.Price}.00</Text>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => Remove(item.key)} style={styles.itemseebutton} >
                                                <Text style={styles.itemseetxt} >Remover</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                        </View>
                    )}
                />
                <View style={styles.bottom} >
                    <TouchableOpacity onPress={() => Buy()} style={styles.buybutton}>
                        <Text style={styles.buytxt} >Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backbutton}>
                        <Text style={styles.buytxt} >Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            ) : (
                <View style={styles.nothing} >
                    <Feather name="shopping-cart" size={175} />
                    <Text style={styles.nothingtxt} >Seu carrinho está vazio.</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.gobackbutton} >
                        <Text style={styles.gobacktxt} >Voltar</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    itemcontainer:{
        backgroundColor: "#F9F9F9", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    itemarea:{
        alignItems: 'center',
        width: "95%",
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    itemimage:{
        height: 155,
        width: 155,
        borderRadius: 10,
        marginBottom: 20
    },
    itemdetails:{
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15
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

    },
    bottom:{
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        paddingBottom: 20,
        backgroundColor: "#F9F9F9",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    buybutton:{
        backgroundColor: "#E06E8B",
        padding: 5,
        width: "90%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    backbutton:{
        backgroundColor: "#38BA9B",
        padding: 5,
        width: "90%",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 5
    },
    buytxt:{
        fontSize: 22,
        color: "#FFF",
        fontWeight: "bold"
    },
    nothing:{
        backgroundColor: "#FFF", 
        borderRadius: 25, 
        width: "100%", 
        flex: 1,
        paddingTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    nothingtxt:{
        fontWeight: "bold",
        width: "85%",
        textAlign: "center",
        fontSize: 25,
        marginTop: 35
    },
    gobackbutton:{
        marginTop: "20%",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
    },
    gobacktxt:{
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        fontSize: 19,
        backgroundColor: "#E06E8B",
        color: "#FFF",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25
    }

})