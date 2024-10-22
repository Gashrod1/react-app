import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Button, Chip, SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [dateText, setDateText] = useState('');
  const [beforeEmotionText, setBeforeEmotionText] = useState('');
  const [afterEmotionText, setAfterEmotionText] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [tagsText, setTagsText] = useState([]);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim()) {
      setTagsText([...tagsText, newTag.trim()]);
      setNewTag(''); // Réinitialiser correctement newTag
    }
  };

  const findHashtagIdByLabel = async (hashtag) => {
    try {
      const existingDreams = await AsyncStorage.getItem('dreamFormDataArray');
      let dreamsData = existingDreams ? JSON.parse(existingDreams) : [];
      for (let dream of dreamsData) {
        for (let hashtagKey in dream.hashtags) {
          const hashtagStored = dream.hashtags[hashtagKey];
          if (hashtagStored.label === hashtag) {
            return hashtagStored.id;
          }
        }
      }
      const newId = `hashtag-${Math.random().toString(36).substr(2, 9)}`;
      return newId;
    } catch (error) {
      console.error('Erreur lors de la gestion des hashtags:', error);
      return null;
    }
  };

  const removeTag = (tagToRemove) => {
    setTagsText(tagsText.filter((tag) => tag !== tagToRemove));
  };

  const handleClearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];
      formDataArray.push({
        DreamText: dreamText,
        Date: dateText,
        BeforeEmotion: beforeEmotionText,
        AfterEmotion: afterEmotionText,
        isLucidDream: dreamType,
        TagsText: tagsText,
      });
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
    setDreamText('');
    setDateText('');
    setBeforeEmotionText('');
    setAfterEmotionText('');
    setDreamType('');
    setTagsText([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={setDreamText}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[{ width: width * 0.8, alignSelf: 'center' }]}
      />
      <TextInput
        label="Date (DD/MM/YYYY)"
        value={dateText}
        onChangeText={setDateText}
        mode="outlined"
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <View style={styles.containerEmotion}>
        <TextInput
          label="État émotionnel avant le rêve"
          value={beforeEmotionText}
          onChangeText={setBeforeEmotionText}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={styles.emotionInput}
        />
        <TextInput
          label="État émotionnel après le rêve"
          value={afterEmotionText}
          onChangeText={setAfterEmotionText}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={styles.emotionInput}
        />
      </View>

      <View style={styles.tagsContainer}>
        <TextInput
          label="Tags"
          value={newTag}
          onChangeText={setNewTag}
          mode="outlined"
          style={[styles.input, { flex: 1 }]}
        />
        <Button mode="contained" onPress={addTag} style={styles.addButton}>
          Ajouter un tag
        </Button>
      </View>

      <View style={styles.chipContainer}>
        {tagsText.map((tag, index) => (
          <Chip key={index} style={styles.chip} onClose={() => removeTag(tag)}>
            {tag}
          </Chip>
        ))}
      </View>

      <SafeAreaView style={styles.segmented}>
        <SegmentedButtons
          value={dreamType}
          onValueChange={setDreamType}
          buttons={[
            { value: 'normal', label: 'Rêve normal' },
            { value: 'lucide', label: 'Rêve lucide' },
            { value: 'cauchemar', label: 'Cauchemar' },
          ]}
        />
      </SafeAreaView>

      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
      <Button mode="contained" onPress={handleClearAsyncStorage} style={styles.button}>
        Clear Async Storage
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
  containerEmotion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emotionInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 10,
  },
  addButton: {
    marginLeft: 10,
    marginRight: 8,
    marginBottom: 10,
  },
  chipContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 5,
  },
  segmented: {
    marginLeft: 26,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 8,
  },
});
