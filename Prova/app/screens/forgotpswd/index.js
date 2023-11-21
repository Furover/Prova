import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app_auth } from '../../../firebaseConfig';

export function ForgotPswd({ navigation, route }) {
    const [email, setEmail] = useState(route.params.paramKey[0])
    const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView  style={styles.container} >
            <View style={styles.logoarea} >
                <Image style={styles.logo} source={require("../../assets/RestartFullLogoColorized.png")} />
            </View>
            <View style={styles.lowerinputarea} >
                <TextInput value= {email} onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='Email' autoCapitalize='none' />
                <Feather name="mail" style={styles.icon} size={25} color={"#000"} />
            </View>
            <View style={styles.buttonarea} >
                <TouchableOpacity activeOpacity={0.8} style={styles.login} >
                    <Text style={styles.action} >Alterar senha</Text>
                    <Feather name="check" style={styles.iconlogin} size={30} color={"#FFF"} />
                </TouchableOpacity>
            </View>

            <Modal
                visible={loading}
                animationType="fade"
                style={{ flex: 1, display: 'flex' }}
                transparent={true}
            >
                <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', backgroundColor: "rgba(0,0,0,0.10)", zIndex: 98 }} ></View>
            </Modal>
            <Modal
                visible={loading}
                animationType="slide"
                style={{ flex: 1, display: 'flex' }}
                transparent={true}
            >
                <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', zIndex: 99, alignItems: 'center' }} >
                    <View style={{ backgroundColor: "#FFF", height: "40%", width: "100%", borderRadius: 25, alignItems: 'center' }} >
                        <View style={{ alignItems: 'center', width: "100%", height: "25%", justifyContent: 'center' }} >
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >Entrando...</Text>
                        </View>
                        <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                            <ActivityIndicator size={90} color="#000" />
                        </View>

                    </View>
                </View>
            </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
    width: 250,
    height: 175
  },
  inputarea:{
    marginTop: "13%",
    justifyContent: 'center',
    width: "90%"
  },
  lowerinputarea:{
    marginTop: "10%",
    justifyContent: 'center',
    width: "90%"
  },
  input:{
    width: "95%",
    backgroundColor: "#F7F7F7",
    borderRadius: 25,
    fontSize: 20,
    paddingVertical: 10,
    paddingRight: 65,
    paddingLeft: 15,
    alignSelf: 'center',
    color: "#000"
  },
  icon:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 35
  },
  iconlogin:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 27
  },
  buttonarea:{
    marginTop: "21%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%"
  },
  login:{
    backgroundColor: "#000",
    width: "95%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 55
  },
  action:{
    color: "#FFF",
    fontSize: 22,
    fontWeight: 'bold'
  },
});
