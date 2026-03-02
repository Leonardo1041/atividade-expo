import {Text, StyleSheet, View, Button} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState} from 'react'
export default function App(){
  // cria um estado com o hook useState
  const [clicou, setClicou] = useState(false)
  const [cliques, setCliques] = useState(0)
  const alternaMensagem = () => {
    setClicou ((valor) => !valor)
    setCliques ((valor) => valor + 1)
  }
  return (
    <SafeAreaProvider style={styles.container}>
        <Text style={styles.titulo}> Olá, React Native </Text>
        <Text style={styles.mensagem}>
        {
          clicou ? "Você clicou no botão": "Clique no BOTÃO"
        }
        </Text>
        <Text style={styles.mensagem}>
          Você clicou = {cliques}
        </Text>
        <View style={styles.containerBotao}>
          <Button 
          title={clicou ? "Resetar": "Clique aqui"}
          onPress={alternaMensagem}/>
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#295E9E"
  },
  containerBotao: {
    width: 200,
    marginTop: 30
  },
  titulo: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12
  },
  mensagem: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center"
  }
})