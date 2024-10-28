import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { Chip, Button, Modal } from 'react-native-paper'
import * as Router from 'expo-router'
import FilterModal from './Filter'

export default function DreamList() {
  const [dreams, setDreams] = useState([])
  const [filteredDreams, setFilteredDreams] = useState([])
  const [filterVisible, setFilterVisible] = useState(false)

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('dreamFormDataArray')
      const dreamFormDataArray = data ? JSON.parse(data) : []
      setDreams(dreamFormDataArray)
      setFilteredDreams(dreamFormDataArray)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
    }
  }

  const handleFilter = (filters) => {
    const { filterText, filterDate, filterTags, filterIsLucid, filterDreamType, filterTone } = filters
    const results = dreams.filter(dream => {
      return (
        (filterText ? dream.dreamText.includes(filterText) : true) &&
        (filterDate ? dream.dateText === filterDate : true) &&
        (filterTags ? dream.tagsText.includes(filterTags) : true) &&
        (filterIsLucid ? dream.isLucide === filterIsLucid : true) &&
        (filterDreamType ? dream.dreamType === filterDreamType : true) &&
        (filterTone ? dream.overallTone === filterTone : true)
      )
    })
    setFilteredDreams(results)
    setFilterVisible(false)
  }

  const handleDeleteDream = async (index: number) => {
    Alert.alert(
      'Supprimer le rêve',
      'Êtes-vous sûr de vouloir supprimer ce rêve ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedDreams = dreams.filter((_, i) => i !== index)
              await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams))
              setDreams(updatedDreams)
            } catch (error) {
              console.error('Erreur lors de la suppression du rêve:', error)
            }
          },
        },
      ]
    )
  }

  useEffect(() => {
    fetchData()
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData()
      return () => console.log('This route is now unfocused.')
    }, [])
  )

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dreams.length === 0 ? (
        <Text style={styles.noDreams}>Aucun rêve à afficher</Text>
      ) : (
        dreams.map((dream, index) => (
          dream ? (
            <View key={index} style={styles.dreamContainer}>
              <Text style={styles.dreamText}>{dream.dreamText}</Text>
              <Text style={styles.dateText}>Date: {dream.dateText}</Text>
              <Text style={styles.detailText}>Lieu: {dream.location}</Text>
              <Text style={styles.detailText}>Type de rêve: {dream.dreamType}</Text>
              <Text style={styles.detailText}>Lucidité: {dream.isLucide}</Text>
              <Text style={styles.detailText}>Émotion avant le rêve: {dream.beforeEmotionText}</Text>
              <Text style={styles.detailText}>Émotion après le rêve: {dream.afterEmotionText}</Text>
              <Text style={styles.detailText}>Intensité émotionnelle: {dream.emotionalIntensity}</Text>
              <Text style={styles.detailText}>Clarté du rêve: {dream.clarity}</Text>
              <Text style={styles.detailText}>Qualité du sommeil: {dream.sleepQuality}</Text>
              <Text style={styles.detailText}>Signification personnelle: {dream.personalMeaning}</Text>
              <Text style={styles.detailText}>Tonalité globale: {dream.overallTone}</Text>
              <View style={styles.chipSection}>
                <Text style={styles.subtitle}>Hashtags:</Text>
                <View style={styles.chipContainer}>
                  {Array.isArray(dream.tagsText) && dream.tagsText.map((tag: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, tagIndex: React.Key | null | undefined) => (
                    <Chip key={`${tag}-${tagIndex}`} style={styles.chip}>{tag}</Chip>
                  ))}
                </View>
              </View>
              <View style={styles.chipSection}>
                <Text style={styles.subtitle}>Personnages présents:</Text>
                <View style={styles.chipContainer}>
                  {Array.isArray(dream.characters) && dream.characters.map((character: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, charIndex: React.Key | null | undefined) => (
                    <Chip key={`${character}-${charIndex}`} style={styles.chip}>{character}</Chip>
                  ))}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Router.Link
                  href={{
                    pathname: '/',
                    params: { dream: JSON.stringify(dream), index }
                  }}
                  asChild
                >
                  <Text style={styles.modifier}>Modifier le rêve</Text>
                </Router.Link>
                <Button mode="outlined" onPress={() => handleDeleteDream(index)} style={styles.button}>
                  Supprimer ce rêve
                </Button>
              </View>
            </View>
          ) : null
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dreamContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dreamText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 2,
  },
  chipSection: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modifier: {
    paddingTop: 27,
    paddingLeft: 8,
  },
  noDreamsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 16,
    marginLeft: 15,
  },
});
