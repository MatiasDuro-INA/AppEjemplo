import React, { useState } from 'react'
import { Alert, Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function DetalleScreen() {

  const [inputValue, setInputValue] = useState('')

  const handleShowAlert = () => {
    const mensaje = Platform.OS === 'ios' ? 'Estas usando iOS' : 'Estas usando Android'

    Alert.alert('Sistema Detectado', mensaje)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Demo con varios componentes</Text>
      <TextInput
        style={styles.input}
        placeholder='Escribir algo...'
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Button title='Mostrar Alerta' onPress={handleShowAlert} />

      <TouchableOpacity
        style={styles.button}
        onPress={handleShowAlert}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Touchable Opacity</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button:{
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: '#21960a',
    padding: 15,
    borderRadius: 8,
    width: 250,
    alignItems: 'center'
},
text:{
    color: "#fff",
    fontSize: 16,
}
})