import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState} from 'react'
import { app_auth, app_db } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, documentId, updateDoc, arrayUnion } from 'firebase/firestore'

import { Onboarding } from '../../components/onboarding';
import { ItemList } from '../../components/itemlist';

export function Details({ navigation, route }) {
    const [listing, setListing] = useState({})
    const [loaded, setLoaded] = useState(false)
    const width = Dimensions.get("window").width

    useEffect(()=>{

        
        const listingRef = collection(app_db, 'Listings')
    
        const q = query(
            listingRef,
            where(documentId(), '==', route.params.paramKey[0])
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
                setListing(listingq[0])
                console.log(listing)
            
            }
        })

        return() => subscriver()
    
    },[])

    const addCart = async () => {

      const userRef = doc(app_db, "Users", app_auth.currentUser.uid)

      try{
        updateDoc(userRef,{
          Cart: arrayUnion(route.params.paramKey[0])

        })
        navigation.navigate("Cart", {paramKey:[app_auth.currentUser.uid]})
      } catch(error) {
        console.log(error)
        alert("Ocorreu um erro, tente novamente.")
      }

    }

  return (
    <SafeAreaView  style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollcontainer} >
                {listing ? (
                    <View style={styles.content} >
                        <View style={styles.imagearea} >
                          <Image style={[styles.productimage, {width: width}]} source={{uri : listing.Image}} />
                          <Text style={styles.titletxt} >{listing.Title}</Text> 
                        </View>
                        <View style={styles.pricearea} >
                          <Text style={styles.pricetxt} >R${listing.Price}.00</Text>
                          <TouchableOpacity onPress={() => addCart()} style={styles.buybutton} >
                            <Text style={styles.buytxt} >Comprar</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.paymentways} >
                          <Text style={styles.paymenttxt} >Em até 12 vezes de R${(listing.Price / 12).toFixed(2)}</Text>
                        </View>
                        <View style={styles.descriptionarea} >
                          <Text style={styles.descriptiontitle} >Descrição</Text>
                          <View style={styles.descriptiontxtarea} >
                            <Text style={styles.descriptiontxt} >{listing.Description}</Text>
                          </View>
                        </View>
                        
                    </View>
                ) : (

                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <ActivityIndicator size={110} color="#38BA9B" />
                    </View>
                )}
            </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF'
  },
  scrollcontainer: {
    width: "100%",
    display: 'flex',
    backgroundColor: '#FFF',
    alignItems: "center"
  },
  content:{
    flex: 1,
    width: "100%",
    display: 'flex', 
    alignItems: 'center'
  },
  imagearea:{
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  productimage:{
    height: 300,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  titletxt:{
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 10,
    color: "#FFF"
  },
  pricearea:{
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    marginTop: 45,
    flexDirection: 'row',
    paddingStart: 20,
    paddingEnd: 20
  },
  pricetxt:{
    fontWeight: 'bold',
    fontSize: 23,
    maxWidth: "55%",
    backgroundColor: "#000",
    color: "#FFF",
    padding: 5,
    paddingHorizontal: 25,
    borderRadius: 25
  },
  buybutton:{
    backgroundColor: "#E06E8B",
    padding: 5,
    width: "40%",
    alignItems: "center",
    borderRadius: 25
  },
  buytxt:{
    fontWeight: 'bold',
    fontSize: 23,
    color: "#FFF"
  },
  paymentways:{
    width: "100%",
    paddingStart: 20,
    paddingEnd: 20,
    marginTop: 35,
  },
  paymenttxt:{
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: "#38BA9B",
    textAlign: "center",
    padding: 5,
    borderRadius: 25,
    color: "#FFF"
  },
  descriptionarea:{
    backgroundColor: "#38BA9B",
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginTop: 65
  },
  descriptiontitle:{
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    marginVertical: 10
  },
  descriptiontxtarea:{
    backgroundColor:"#FFF",
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  descriptiontxt:{
    width: "90%",
    fontSize: 18,
    fontWeight: '400',
    textAlign: "justify",
    paddingBottom: 50
  }

});
