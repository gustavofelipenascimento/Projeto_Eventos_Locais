import React, { useState } from "react";
import { View,  ScrollView } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../config/style";
import { Surface, TextInput, Button, Text} from "react-native-paper";
import { Image } from "expo-image";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("News");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Image style={styles.image}
        source={require('../img/logofoda.png')}/>
        <Text style={styles.title}>Login</Text>
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button style={styles.button} onPress={handleLogin} mode="contained-tonal">Logar</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("Register")} mode="contained-tonal">Registrar</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("News")} mode="contained-tonal">Anônimo</Button>
          <Button style={styles.button} onPress={() => navigation.navigate("Location")} mode="contained-tonal">Localização</Button>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </Surface>
    </ScrollView>
  );
}
