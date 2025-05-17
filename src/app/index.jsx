import { router } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {

    const irADetalle = () => {
        router.push('/(tabs)')
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hola Mundo</Text>
        <Button title='Ir a Tabs' onPress={() => irADetalle()}/>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
    }
})