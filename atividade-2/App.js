import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function App(){

  const [produto, setProduto] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [lista, setLista] = useState([])

  const adicionaLista = () => {

    if(produto.trim().length == 0 || quantidade.trim().length == 0) return

    const novo = {
      id: Date.now().toString(),
      produto: produto,
      quantidade: quantidade
    }

    setLista([...lista, novo])

    setProduto('')
    setQuantidade('')
  }

  const removerLista = (id) => {
    setLista(lista.filter(item => item.id != id))
  }

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.textoItem}>
        • {item.produto} ({item.quantidade})
      </Text>

      <TouchableOpacity
        onPress={() => removerLista(item.id)}
      >
        <Text style={styles.lixeira}>🗑️</Text>
      </TouchableOpacity>
    </View>
  )

  return (

    <SafeAreaProvider style={styles.container}>

      <StatusBar barStyle="dark-content"/>

      <Text style={styles.titulo}>🛒 Lista de Compras</Text>

      <View style={styles.card}>

        <TextInput
          style={styles.input}
          value={produto}
          onChangeText={setProduto}
          placeholder="Produto (ex: Feijão)"
        />

        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Qtd (ex: 2kg)"
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionaLista}
        >
          <Text style={styles.textoBotaoAdd}>
            Adicionar à Lista
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fffbeb"
  },

  titulo:{
    fontSize:28,
    fontWeight:"bold",
    color:"#92400e",
    marginBottom:20
  },

  card:{
    backgroundColor:"#fde68a",
    padding:15,
    borderRadius:15,
    marginBottom:20
  },

  input:{
    height:50,
    backgroundColor:"#fff",
    borderRadius:10,
    paddingHorizontal:15,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#f59e0b"
  },

  botaoAdd:{
    backgroundColor:"#d97706",
    height:50,
    borderRadius:12,
    alignItems:"center",
    justifyContent:"center"
  },

  textoBotaoAdd:{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold"
  },

  item:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:15,
    backgroundColor:"#fff",
    borderRadius:10,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#fde68a"
  },

  textoItem:{
    fontSize:16,
    color:"#78350f"
  },

  lixeira:{
    fontSize:18
  }

})