import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState} from 'react'
import { app_auth, app_db } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, documentId} from 'firebase/firestore'

import { Onboarding } from '../../components/onboarding';
import { ItemList } from '../../components/itemlist';

export function Home({ navigation, route }) {
    const [user, setUser] = useState({})
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false)
    const [username, setUserName] = useState("...")

    useEffect(()=>{

        
        console.log("pedi user")
        const userRef = collection(app_db, 'Users')
    
        const q = query(
            userRef,
            where(documentId(), '==', app_auth.currentUser.uid)
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
                setLoaded(true)

                if(loaded){
                    var name = user.Name
                    var first = name.split(' ')[0]
                    setUserName(first)
                }
            
            }
        })

        return() => subscriver()
    
    },[loaded])

    const handleSearch = () => {
      if(search != ""){
        navigation.navigate("Search", {paramKey:[search]})
      }
    }

  return (
    <SafeAreaView  style={styles.container}>
            <View style={styles.searcharea} >
                <TextInput onSubmitEditing={() => handleSearch()} value= {search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                <TouchableOpacity onPress={() => handleSearch()} style={styles.searchbutton} >
                  <Feather name="search" style={styles.searchicon} size={25} color={"rgba(0,0,0,0.75)"} />
                </TouchableOpacity>
            </View>
            <ScrollView>
            <ScrollView>
              <View style={styles.greetings} >
                  <Text style={styles.greetingstext} >Olá {username}!</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Cart", {paramKey:[app_auth.currentUser.uid]})} activeOpacity={0.8} style={styles.cart} >
                      <Text style={styles.carttxt} >Carrinho</Text>
                      <Feather name="shopping-cart" style={styles.carticon} size={23} color={"#FFF"} />
                  </TouchableOpacity>
              </View>
              <View style={styles.carousel} >
                  <Text style={styles.carouseltxt} >Destaques</Text>
                  <Onboarding/>
              </View>
              <View style={styles.filterarea} >
                <TouchableOpacity activeOpacity={0.8} style={styles.filterbutton} >
                  <Text style={styles.filtertext} >Filtros</Text>
                  <Feather style={styles.filtericon} name="filter" color={"#FFF"} size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.items} >
                  <Text style={styles.itemstxt} >Anúncios</Text>
                  <ItemList navigation={navigation} />
              </View>
              </ScrollView>
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
  searchbutton:{
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center'
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
  cart:{
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row'
  },
  carttxt:{
    fontSize: 20,
    fontWeight: '700',
    color: "#FFF",
    marginRight: 15
  },
  carticon:{
  },
  carousel:{
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#000"
  },
  carouseltxt:{
    marginVertical: 6,
    fontWeight: 'bold',
    fontSize: 20,
    color: "#FFF"
  },
  filterarea:{
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 35,
    width: "100%",
    paddingStart: 20,
    paddingEnd: 20
  },
  filterbutton:{
    width: "100%",
    backgroundColor: "#000",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,

  },
  filtertext:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18
  },
  filtericon:{
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 20

  },
  items:{
    marginTop: 0,
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
