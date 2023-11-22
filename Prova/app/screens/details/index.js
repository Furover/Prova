import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState} from 'react'
import { app_auth, app_db } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, documentId} from 'firebase/firestore'

import { Onboarding } from '../../components/onboarding';
import { ItemList } from '../../components/itemlist';

export function Details({ navigation, route }) {
    const [listing, setListing] = useState({})
    const [loaded, setLoaded] = useState(false)

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
    
    },[loaded])

  return (
    <SafeAreaView  style={styles.container}>
            <ScrollView>
                {listing ? (
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Text>{listing.Title}</Text>
                    </View>
                ) : (

                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <Text>Carregando...</Text>
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
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  searcharea:{
    width: "100%",
    borderColor: "#F2F2F2",
    borderBottomWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 20,
    paddingEnd: 20,
    paddingVertical: 15,

  },
  searchinput:{
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    fontSize: 20,
    width: "100%",
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 60,
    color: "#000"

  },
  searchicon:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 35
  },
  logo:{
    width: 50,
    height: 37.45
  },
  greetings:{
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    paddingStart: 20,
    paddingEnd: 20,


  },
  greetingstext:{
    fontSize: 25,
    fontWeight: '700',
    width: "50%"
  },
  filter:{
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row'
  },
  filtertext:{
    fontSize: 20,
    fontWeight: '700',
    color: "#FFF",
    marginRight: 10
  },
  filtericon:{

  },
  carousel:{
    marginTop: 40,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#000"
  },
  carouseltxt:{
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: "#FFF"
  },
  items:{
    marginTop: 90,
    backgroundColor: "#E06E8B",
    flex: 1,
    width: "100%",
    alignItems: 'center',
    borderRadius: 25
  },
  itemstxt:{
    marginVertical: 5,
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold'
  }

});
