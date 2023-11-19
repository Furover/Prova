import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from 'react-native-vector-icons'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { app_auth, app_db } from '../../../firebaseConfig';

export function Register({ navigation }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false);

    const SignUp = async () => {
        setLoading(true)
        if(nome == ""){
            alert("Preencha o seu nome!")
            setLoading(false)
        } else if(email == "") {
            alert("Preencha o seu email!")
            setLoading(false)
        } else if(senha == "") {
            alert("Preencha a sua senha!")
            setLoading(false)
        } else {
            try{
            
                const response = await createUserWithEmailAndPassword(app_auth, email, senha)

                await setDoc(doc(app_db, "Users", response.user.uid), {
                    Nome : nome,
                    Carrinho: [],


                })

                navigation.navigate("Home")
            } catch (error) {
                console.log("erro: "+error)
                if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
                    alert("Email inválido!")
                } else if(error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
                    alert("Senha fraca, coloque uma com pelo menos 6 caracteres.")
                } else if(error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                    alert("O email já está em uso.")
                } else {
                    alert("Ocorreu um erro com seu cadastro: " + error)
                }
                
            } finally{
                setLoading(false)
            }
        }
    }

  return (
    <SafeAreaView  style={styles.container} >
            <View style={styles.logoarea} >
                <Image style={styles.logo} source={require("../../assets/RestartFullLogoColorized.png")} />
            </View>
            <View style={styles.inputarea} >
                <TextInput value= {nome} onChangeText={(text) => setNome(text)} style={styles.input} placeholder='Nome' autoCapitalize='none' />
                <Feather name="user" style={styles.icon} size={25} color={"#000"} />
            </View>
            <View style={styles.lowerinputarea} >
                <TextInput value= {email} onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='Email' autoCapitalize='none' />
                <Feather name="mail" style={styles.icon} size={25} color={"#000"} />
            </View>
            <View style={styles.lowerinputarea} >
                <TextInput value= {senha} onChangeText={(text) => setSenha(text)} style={styles.input} placeholder='Senha' autoCapitalize='none' secureTextEntry={true} />
                <Feather name="lock" style={styles.icon} size={25} color={"#000"} />
            </View>
            <View style={styles.buttonarea} >
                <TouchableOpacity onPress={() => SignUp()} activeOpacity={0.8} style={styles.register} >
                    <Text style={styles.action} >Cadastrar</Text>
                    <Feather name="upload" style={styles.iconregister} size={30} color={"#FFF"} />
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
                            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '800' }} >Criando Perfil...</Text>
                        </View>
                        <View style={{ alignItems: 'center', width: "100%", height: "75%", justifyContent: 'center' }} >
                            <ActivityIndicator size={90} color="#38BA9B" />
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
  iconregister:{
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: 26
  },
  buttonarea:{
    marginTop: "21%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%"
  },
  register:{
    backgroundColor: "#38BA9B",
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
  }
});
