import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hola Settings</Text>
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