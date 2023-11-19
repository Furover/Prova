import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useEffect, useState} from 'react'
import { app_auth, app_db } from '../../../firebaseConfig'
import { doc , collection, query, where, onSnapshot, Firestore, documentId} from 'firebase/firestore'

import { Onboarding } from '../../components/onboarding';

export function Home({ navigation }) {
    const [user, setUser] = useState({})
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false)
    const [username, setUserName] = useState("")

    useEffect(()=>{

        
    
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
                    var nome = user.Nome
                    var first = nome.split(' ')[0]
                    setUserName(first)
                }
            
            }
        })

        return() => subscriver()
    
    },[user])

  return (
    <SafeAreaView  style={styles.container}>
            <View style={styles.searcharea} >
                <TextInput value= {search} onChangeText={(text) => setSearch(text)} style={styles.searchinput} placeholder='Pesquisar' autoCapitalize='none' />
                <Feather name="search" style={styles.searchicon} size={25} color={"rgba(0,0,0,0.75)"} />
            </View>
            <View style={styles.greetings} >
                <Text style={styles.greetingstext} >Olá {username}!</Text>
                <TouchableOpacity style={styles.filter} >
                    <Text style={styles.filtertext} >Filtros</Text>
                    <Feather name="filter" style={styles.filtericon} size={23} color={"#FFF"} />
                </TouchableOpacity>
            </View>
            <View style={styles.carousel} >
            </View>
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
  action:{
    color: "#000",
    fontSize: 22,
    fontWeight: 'bold'
  }
});
