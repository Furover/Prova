import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Initial({ navigation }) {
  return (
    <SafeAreaView  style={styles.container}>
            <View style={styles.logoarea} >
                <Image style={styles.logo} source={require("../../assets/RestartFullLogoColorized.png")} />
            </View>
            <View style={styles.buttonarea} >
                <TouchableOpacity onPress={() => navigation.navigate("Register")} activeOpacity={0.8} style={styles.register} >
                    <Text style={styles.action} >Criar conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} activeOpacity={0.8} style={styles.login} >
                    <Text style={styles.action} >Login</Text>
                </TouchableOpacity>
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
    justifyContent: 'center'
  },
  logo:{
    width: 350,
    height: 245
  },
  buttonarea:{
    marginTop: "33%",
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%"
  },
  register:{
    backgroundColor: "#38BA9B",
    width: "90%",
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 55
  },
  login:{
    backgroundColor: "#000",
    width: "90%",
    alignItems: 'center',
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
