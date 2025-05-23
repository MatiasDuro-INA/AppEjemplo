import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../contexts/authContext'

export default function SettingsScreen() {

  const { logout} = useAuth()

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hola Settings</Text>
        <Button title='log out' onPress={logout}/>
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