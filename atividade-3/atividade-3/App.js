import AsyncStorage from "@react-native-async-storage/async-storage"
import {Text, View, StatusBar, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert} from "react-native"
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useState, useEffect} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const STORAGEY_KEY = "@meus_livros"

export default function App(){
    const [tarefa, setTarefa] = useState("") 
    const [autor, setAutor] = useState("")   
    const [tarefas, setTarefas] = useState([])
    // chamada toda vez que a aplicação carrega
    useEffect( () => {
        (async () => {
            try {
                // recupera o que tem no cookie @meus_livros
                const salvo = await AsyncStorage.getItem(STORAGEY_KEY)
                if (salvo){
                    // recupera o conteúdo do local storage
                    setTarefas(JSON.parse(salvo))
                }
            }
            catch (e){
                Alert.alert("Erro", "Não foi possível carregar os dados")
            }
        })()
    }, [])
    // chamada toda vez que o vetor tarefas é atualizado
    useEffect( () => {
        (async () => {
            try {
                await AsyncStorage.setItem(STORAGEY_KEY, JSON.stringify(tarefas))
            }
            catch (e) {
                Alert.alert("Erro", "Não foi possível salvar os dados")
            }
        })()
     }, [tarefas])
     
    const adicionaTarefa = () => {
        if (!tarefa.trim() || !autor.trim()) return

        const nova = {
            id: Date.now().toString(),
            nome: tarefa,
            autor: autor,
            status: "lendo"                                                                        
        }
        setTarefas([...tarefas, nova])
        setTarefa("")
        setAutor("")
    }

    const alternarStatus = (id) => { // NOVO
        setTarefas(prev =>
            prev.map(t =>
                t.id === id
                    ? { ...t, status: t.status === "lido" ? "lendo" : "lido" }
                    : t
            )
        )
    }

    const renderItem = ({item}) => {
        const isLido = item.status === "lido"

        return (
            <View style={[
                styles.itemLista,
                isLido ? styles.lido : styles.lendo
            ]}>
                <TouchableOpacity style={styles.conteudoItem} onPress={() => alternarStatus(item.id)}>
                    <MaterialCommunityIcons
                        name={isLido ? "check-circle" : "book-open-page-variant"}
                        size={20}
                        color={isLido ? "#16A34A" : "#EAB308"}
                    />
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.textoItem}> {item.nome} </Text>
                        <Text style={styles.autor}> {item.autor} </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removerTarefa(item.id)} style={styles.botaoRemover}>
                    <MaterialCommunityIcons name="trash-can-outline" size={22} color="#EF4444"/>
                </TouchableOpacity>
            </View>
        )
    }

    const removerTarefa = (id) => {
        setTarefas( (prev) => prev.filter( (t) => t.id != id))
    }

    const livrosLidos = tarefas.filter(t => t.status === "lido").length 

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar barStyle="dark-content"/>

            <View style={styles.header}>
                <MaterialCommunityIcons name="database-sync" size={32} color="#6366F1"/>
                <Text style={styles.titulo}> Lista de Leitura </Text>
            </View>

            <Text style={{textAlign: "center", marginBottom: 10}}>
                Você já leu {livrosLidos} livro(s)
            </Text>

            <View style={styles.entrada}>    
                <TextInput 
                    style={styles.caixaEntrada} 
                    placeholder="Título do livro" 
                    value={tarefa} 
                    onChangeText={setTarefa}
                />
            </View>

            <View style={styles.entrada}>    
                <TextInput 
                    style={styles.caixaEntrada} 
                    placeholder="Autor" 
                    value={autor} 
                    onChangeText={setAutor}
                />
                <TouchableOpacity style={styles.botao} onPress={adicionaTarefa}>
                    <MaterialCommunityIcons name="plus" size={28} color="#FFF"/>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={tarefas} 
                keyExtractor={(item) => item.id} 
                renderItem={renderItem}
            />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#F8FAFC", padding: 20
    },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 20 
    },
    titulo: {
        fontSize: 22, fontWeight: "800", color: "#1E293B", marginLeft: 10
    },
    entrada: {
        flexDirection: 'row', marginBottom: 25
    },
    caixaEntrada: {
        flex: 1, height: 55, backgroundColor: "#FFF", borderRadius: 15, paddingHorizontal: 20,
        fontSize: 16, color: "#334155"
    },
    botao: {
        width: 55, height: 55, backgroundColor: "#6366F1", borderRadius: 15, marginLeft: 10, 
        justifyContent: "center", alignItems: "center"
    },
    itemLista: {
        flexDirection: "row", padding: 15, borderRadius: 15, marginBottom: 12,
        alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: "#F1F5F9"
    },
    lendo: { 
        backgroundColor: "#FEF9C3"
    },
    lido: { 
        backgroundColor: "#DCFCE7"
    },
    conteudoItem: {
        flexDirection: "row", alignItems: "center", flex: 1
    },
    textoItem: {
        fontSize: 16, color: "#475569", margin: 5
    },
    autor: { 
        fontSize: 13,
        color: "#64748B",
        marginLeft: 5
    },
    botaoRemover: {
        padding: 5,
    }
})