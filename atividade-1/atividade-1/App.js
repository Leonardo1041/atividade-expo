import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function App(){
  const [clicou, setClicou] = useState(false)
  const [cliques, setCliques] = useState(0)

  const alternaMensagem = () => {
    setClicou(valor => !valor)
    setCliques(valor => valor + 1)
  }

  // Estados da gorjeta
  const [valorConta, setValorConta] = useState("")
  const [resultado, setResultado] = useState("")

  // Função para calcular gorjeta
  const calcularGorjeta = () => {
    const conta = parseFloat(valorConta)

    if (!isNaN(conta) && conta > 0) {
      const gorjeta = conta * 0.10
      const totalComGorjeta = conta + gorjeta
      setResultado(`Gorjeta (10%): R$ ${gorjeta}
Total com gorjeta: R$ ${totalComGorjeta}`)
    } else {
      setResultado("Digite um valor válido!")
    }
  }

  // Função para limpar
  const limparCampos = () => {
    setValorConta("")
    setResultado("")
  }

  return (
    <SafeAreaProvider style={styles.container}>

      <Text style={styles.titulo}>Calculadora de Gorjeta</Text>
      <View style={styles.card}>

        <Text style={styles.label}>Digite o valor da conta:</Text>

        <TextInput style={styles.input} placeholder="Ex: 100.00" keyboardType="numeric" value={valorConta} onChangeText={setValorConta} />

        <TouchableOpacity style={styles.botao} onPress={calcularGorjeta} >
          <Text style={styles.textoBotao}>Calcular Gorjeta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        <Text style={styles.resultado}>{resultado}</Text>

      </View>

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#295E9E"
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  botao: {
    backgroundColor: "#292929",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },
  botaoLimpar: {
    backgroundColor: "#888"
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold"
  },
  resultado: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
})