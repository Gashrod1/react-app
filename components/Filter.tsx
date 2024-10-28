import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions} from 'react-native'
import { TextInput, SegmentedButtons, Title, Button } from 'react-native-paper'

const { width } = Dimensions.get('window')

export default function FilterModal({ onApplyFilter }) {
  const [filterText, setFilterText] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterTags, setFilterTags] = useState('')
  const [filterIsLucid, setFilterIsLucid] = useState('')
  const [filterDreamType, setFilterDreamType] = useState('')
  const [filterTone, setFilterTone] = useState('')

  const handleFilter = () => {
    onApplyFilter({
      filterText,
      filterDate,
      filterTags,
      filterIsLucid,
      filterDreamType,
      filterTone,
    })
  }

  const deleteFilter = () => {
    setFilterText('')
    setFilterDate('')
    setFilterTags('')
    setFilterIsLucid('')
    setFilterDreamType('')
    setFilterTone('')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Filtres</Title>
      <TextInput
        label="Mots clés"
        value={filterText}
        onChangeText={setFilterText}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <TextInput
        label="Date"
        value={filterDate}
        onChangeText={setFilterDate}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Tags"
        value={filterTags}
        onChangeText={setFilterTags}
        mode="outlined"
        style={styles.input}
      />
      <SegmentedButtons
        style={styles.segmented}
        value={filterIsLucid}
        onValueChange={setFilterIsLucid}
        buttons={[
          { value: 'Rêve normal', label: 'Rêve normal' },
          { value: 'Rêve lucide', label: 'Rêve lucide' },
        ]}
      />
      <SegmentedButtons
        style={styles.segmented}
        value={filterDreamType}
        onValueChange={setFilterDreamType}
        buttons={[
          { value: 'Rêve', label: 'Rêve' },
          { value: 'Cauchemar', label: 'Cauchemar' },
        ]}
      />
      <SegmentedButtons
        style={styles.segmented}
        value={filterTone}
        onValueChange={setFilterTone}
        buttons={[
          { value: 'positive', label: 'Positif' },
          { value: 'neutre', label: 'Neutre' },
          { value: 'negative', label: 'Négatif' },
        ]}
      />
      <Button mode="contained" onPress={handleFilter} style={styles.button}>
        Appliquer les filtres
      </Button>
      <Button mode="outlined" onPress={deleteFilter} style={styles.button}>
        Supprimer les filtres
      </Button>
    </ScrollView>
  )
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
  input: {
    marginBottom: 16,
    width: width * 0.9,
    alignSelf: 'center',
  },
  segmented: {
    marginVertical: 5,
  },
  button: {
    marginTop: 16,
  },
})