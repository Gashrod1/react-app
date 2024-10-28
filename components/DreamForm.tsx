import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, SafeAreaView, Text } from 'react-native';
import { TextInput, Button, Chip, SegmentedButtons } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [dateText, setDateText] = useState('');
  const [beforeEmotionText, setBeforeEmotionText] = useState('');
  const [afterEmotionText, setAfterEmotionText] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [tagsText, setTagsText] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState('');
  const [location, setLocation] = useState('');
  const [emotionalIntensity, setEmotionalIntensity] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [overallTone, setOverallTone] = useState('neutral');

  const addTag = () => {
    if (newTag.trim()) {
      setTagsText([...tagsText, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTagsText(tagsText.filter((tag) => tag !== tagToRemove));
  };

  const addCharacter = () => {
    if (newCharacter.trim()) {
      setCharacters([...characters, newCharacter.trim()]);
      setNewCharacter('');
    }
  };

  const removeCharacter = (characterToRemove) => {
    setCharacters(characters.filter((character) => character !== characterToRemove));
  };

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];
      formDataArray.push({
        dreamText,
        dateText,
        beforeEmotionText,
        afterEmotionText,
        dreamType,
        tagsText,
        characters,
        location,
        emotionalIntensity,
        clarity,
        sleepQuality,
        personalMeaning,
        overallTone,
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
    setCharacters([]);
    setLocation('');
    setEmotionalIntensity(5);
    setClarity(5);
    setSleepQuality(5);
    setPersonalMeaning('');
    setOverallTone('neutral');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Rêve"
        value={dreamText}
        onChangeText={setDreamText}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.input}
      />
      <TextInput
        label="Date (DD/MM/YYYY)"
        value={dateText}
        onChangeText={setDateText}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Lieu du rêve"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />
      <View style={styles.containerEmotion}>
        <TextInput
          label="État émotionnel avant le rêve"
          value={beforeEmotionText}
          onChangeText={setBeforeEmotionText}
          mode="outlined"
          multiline
          numberOfLines={2}
          style={styles.emotionInput}
        />
        <TextInput
          label="État émotionnel après le rêve"
          value={afterEmotionText}
          onChangeText={setAfterEmotionText}
          mode="outlined"
          multiline
          numberOfLines={2}
          style={styles.emotionInput}
        />
      </View>
      <Text style={styles.label}>Intensité émotionnelle :</Text>
      <Slider
        value={emotionalIntensity}
        onValueChange={setEmotionalIntensity}
        minimumValue={1}
        maximumValue={10}
        step={1}
      />
      <Text style={styles.label}>Clarté du rêve :</Text>
      <Slider
        value={clarity}
        onValueChange={setClarity}
        minimumValue={1}
        maximumValue={10}
        step={1}
      />
      <Text style={styles.label}>Qualité du sommeil :</Text>
      <Slider
        value={sleepQuality}
        onValueChange={setSleepQuality}
        minimumValue={1}
        maximumValue={10}
        step={1}
      />
      <TextInput
        label="Signification personnelle du rêve"
        value={personalMeaning}
        onChangeText={setPersonalMeaning}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
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
      <View style={styles.tagsContainer}>
        <TextInput
          label="Personnages présents dans le rêve"
          value={newCharacter}
          onChangeText={setNewCharacter}
          mode="outlined"
          style={[styles.input, { flex: 1 }]}
        />
        <Button mode="contained" onPress={addCharacter} style={styles.addButton}>
          Ajouter un personnage
        </Button>
      </View>
      <View style={styles.chipContainer}>
        {characters.map((character, index) => (
          <Chip key={index} style={styles.chip} onClose={() => removeCharacter(character)}>
            {character}
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
      <SafeAreaView style={styles.segmented}>
        <SegmentedButtons
          value={overallTone}
          onValueChange={setOverallTone}
          buttons={[
            { value: 'positive', label: 'Positif' },
            { value: 'neutral', label: 'Neutre' },
            { value: 'negative', label: 'Négatif' },
          ]}
        />
      </SafeAreaView>
      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
      <Button mode="contained" onPress={() => AsyncStorage.clear()} style={styles.button}>
        Clear Async Storage
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    width: width * 0.9,
    alignSelf: 'center',
  },
  containerEmotion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emotionInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
    marginVertical: 16,
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
  },
});
