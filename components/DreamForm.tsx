import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
export default function DreamForm() {
const [dreamText, setDreamText] = useState('');
const [dateText, setDateText] = useState('');
const [isLucidDream, setIsLucidDream] = useState(false);
const [tagsText, setTagsText] = useState([]);
const [newTag, setNewTag] = useState('');
const addTag = () => {
    tagsText.push(newTag)
    setNewTag()
}
const removeTag = (tagToRemove) => {
    setTagsText(tagsText.filter(tag => tag !== tagToRemove));
};
const handleClearAsyncStorage = async () => {
    AsyncStorage.clear();
}
const handleDreamSubmission = async () => {
    try {
    // Récupérer le tableau actuel depuis AsyncStorage
    const existingData = await AsyncStorage.getItem('dreamFormDataArray');
    const formDataArray = existingData ? JSON.parse(existingData) : [];
    // Ajouter le nouveau formulaire au tableau
    formDataArray.push(
        {
            "DreamText": dreamText,
            "isLucidDream": isLucidDream,
            "TagsText": tagsText, 
            }
    );
    console.log("🚀 ~ handleDreamSubmission ~ formDataArray:", formDataArray)
    // Sauvegarder le tableau mis à jour dans AsyncStorage
    await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
    console.log(
    'AsyncStorage: ',
    AsyncStorage.getItem('dreamFormDataArray')
    );
    } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
    }
    setDreamText('');
    setIsLucidDream(false);
    setTagsText([])
    };
    return (
<View style={styles.container}>
<TextInput
label="Rêve"
value={dreamText}
onChangeText={(text) => setDreamText(text)}
mode="outlined"
multiline
numberOfLines={6}
style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
/>
<View style={styles.container}>
<TextInput
label="Date(DD/MM/YYYY)"
value={dateText}
onChangeText={(text) => setDateText(text)}
mode="outlined"
multiline
numberOfLines={6}
style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
/>
<View style={styles.tagsContainer}>
        <TextInput
          label="Tags"
          value={newTag}  // Affiche les tags dans une seule ligne séparés par des virgules
          onChangeText={(text) => setNewTag(text)} // Permet d'entrer plusieurs tags séparés par des virgules
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input, { flex: 1 }]}
        />
        <Button mode="contained" onPress={() => addTag()} style={styles.addButton}>
          Ajouter un tag
        </Button>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {tagsText.map((tag, index) => (
                     <Chip 
                     key={index} 
                     style={{ margin: 5 }} 
                     onClose={() => removeTag(tag)} // Supprime le tag au clic
                 >
                     {tag}
                 </Chip>
                ))}
            </View>
</View>
<View style={styles.checkboxContainer}>
<Checkbox.Item
label="Rêve Lucide"
status={isLucidDream ? 'checked' : 'unchecked'}
onPress={() => setIsLucidDream(!isLucidDream)}
/>
</View>
<Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
Soumettre
</Button>
<Button mode="contained" onPress={handleClearAsyncStorage} style={styles.button}>
clear async storage
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
tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 10,
  },
  chipContainer: {
    marginTop: 16,
  },
  chip: {
    margin: 4,
  },
});