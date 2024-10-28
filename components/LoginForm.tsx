import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
const { width } = Dimensions.get('window');
export default function loginForm() {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const handleLogIn = () => {

    console.log('username: ', Username, 'password: ', Password);
    setUsername('');
    setPassword('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Nom d'utilisateur"
        value={Username}
        onChangeText={(text) => setUsername(text)}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <View style={styles.container}>
        <TextInput
          label="Mot de passe"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
        />
      </View>
      <Button mode="contained" onPress={handleLogIn} style={styles.button}>
        Se connecter
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});