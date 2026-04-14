import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// APIs
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { Accelerometer } from 'expo-sensors';

// Ícones
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Navegadores
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// -------------------- HOME (CADASTRO) -------------------- //
function HomeScreen({ navigation }) {
  const [imagem, setImagem] = useState(null);

  const tocarSucesso = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const tocarErro = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      tocarSucesso();
    }
  };

  const criarHeroi = () => {
    if (!imagem) {
      tocarErro();
      return;
    }

    navigation.navigate('Hero', { image: imagem });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.titulo}>🦸 Criar Herói</Text>

      <View style={styles.areaFoto}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVazia]}>
            <MaterialCommunityIcons name="camera-plus" size={50} color="#CBD5E1" />
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.botao} onPress={selecionarImagem}>
        <Text style={styles.txtBotao}>ALTERAR FOTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={criarHeroi}>
        <Text style={styles.txtBotao}>CRIAR HERÓI</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
}


// -------------------- HERO -------------------- //
function HeroScreen({ route, navigation }) {
  const { image } = route.params;

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const [forca, setForca] = useState(0);
  const [agilidade, setAgilidade] = useState(0);
  const [magia, setMagia] = useState(0);

  const _subscribe = () => {
    const sub = Accelerometer.addListener(setData);
    setSubscription(sub);
    Accelerometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const total = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);

  useEffect(() => {
    if (total > 3.5) {
      setForca(Math.floor(Math.random() * 100));
      setAgilidade(Math.floor(Math.random() * 100));
      setMagia(Math.floor(Math.random() * 100));

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [total]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>⚡ Seu Herói</Text>

      <Image source={{ uri: image }} style={styles.foto} />

      <View style={styles.card}>
        <Text style={styles.textoResposta}>💪 {forca}</Text>
        <Text style={styles.textoResposta}>🏃 {agilidade}</Text>
        <Text style={styles.textoResposta}>✨ {magia}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.botao, styles.btnErro]}
      >
        <Text style={styles.txtBotao}>DELETAR HERÓI</Text>
      </TouchableOpacity>
    </View>
  );
}


// -------------------- STACK DO HERÓI -------------------- //
function HeroStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Hero" component={HeroScreen} />
    </Stack.Navigator>
  );
}


// -------------------- OUTRAS TELAS -------------------- //
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🥸 Tela de Perfil</Text>
    </View>
  );
}

function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>⚙️ Configurações</Text>
    </View>
  );
}


// -------------------- APP COM DRAWER -------------------- //
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HeroStack} />
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Configurações" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// -------------------- ESTILOS -------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 20
  },
  foto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginVertical: 20
  },
  fotoVazia: {
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaFoto: {
    marginBottom: 20
  },
  card: {
    backgroundColor: '#6366F1',
    padding: 20,
    borderRadius: 15,
    marginTop: 20
  },
  textoResposta: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  botao: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    marginTop: 15
  },
  txtBotao: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  btnErro: {
    backgroundColor: '#EF4444'
  }
});