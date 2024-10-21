import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
const { width } = Dimensions.get('window');
export default function loginForm() {
const [Username, setDreamText] = useState('');
const [Password, setDateText] = useState('');
const handleDreamSubmission = () => {
// Logique de traitement de la soumission du rêve
console.log('username: ', Username,'password: ', Password);
// Réinitialisation du formulaire
setDreamText('');
setDateText('');
};
return (
<View style={styles.container}>
<TextInput
label="Nom d'utilisateur"
value={Username}
onChangeText={(text) => setDreamText(text)}
mode="outlined"
multiline
numberOfLines={6}
style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
/>
<View style={styles.container}>
<TextInput
label="Mot de passe"
value={Password}
onChangeText={(text) => setDateText(text)}
mode="outlined"
multiline
numberOfLines={6}
style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
/>
</View>
<Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
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