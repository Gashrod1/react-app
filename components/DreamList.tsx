import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Chip } from 'react-native-paper'
 
export default function DreamList() {
  
  const [dreams, setDreams] = useState([]);
 
  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('dreamFormDataArray');
      const dreamFormDataArray = data ? JSON.parse(data) : [];
      console.log('data:', dreamFormDataArray);
      setDreams(dreamFormDataArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };
 
  // Ce useEffect est exécuté à l'instanciation du composant pour charger la liste initiale
  useEffect(() => {
    fetchData();
  }, []);
 
  // useFocusEffect est un hook executé à chaque évènement de routing
  useFocusEffect(
    useCallback(() => {
 
      fetchData();
 
      return () => {
        console.log('This route is now unfocused.');
      }
    }, [])
  );
 
  return (
    <View>
        <Text style={styles.title}>Liste des Rêves :</Text>
        {dreams.map((dream, index) => (
        <Text key={index} style={styles.dreamText}>
        {dream.dreamText} - {dream.isLucidDream ? 'Lucide' : 'Non Lucide'} - {dream.todayDate} 
        Hashtags : {Array.isArray(dream.TagsText) ? dream.TagsText.join(', ') : ''}
    </Text>
      ))}
    </View>
  );
}
 
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dreamText: {
    fontSize: 16,
    marginBottom: 4,
  },
  Chip:{
    marginBottom: 20,
  },
});