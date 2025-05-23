import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function HomeTabsScreen() {


    const links = [
        {href: '/ejemplos/scroll', label: 'Ir a ScrollUser'},
        {href: '/ejemplos/flatlist', label: 'Ir a FlatListUser'},
        {href: '/ejemplos/touchables', label: 'Ir a Touchables'},
        {href: '/ejemplos/demo', label: 'Ir a Demo'},
        {href: '/productos', label: 'Ir a Productos'},

    ]


  return (
    <View style={styles.container}>
        <Text style={styles.title}>🏠 Home Screen </Text>
        {
            links.map((link) => (
                <Link key={link.href} href={link.href} asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>{link.label}</Text>
                    </Pressable>
                </Link>
            ))
        }
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
    },
    button:{
        backgroundColor: '#2195f3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 15
    },
    buttonText:{
        fontSize: 18,
        color: 'white'
    }
})