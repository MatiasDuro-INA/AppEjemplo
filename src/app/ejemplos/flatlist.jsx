import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function DetalleScreen() {

    const [users, setUsers] = useState([])

useEffect(() => {
    const fetchUsers = async () => {
        try {
            const respuesta = await fetch("https://randomuser.me/api/?results=1000")
            const data = await respuesta.json()
            setUsers(data.results)
        } catch (error) {
            console.log("Error: ", error);
            
        }
    }

    fetchUsers()
}, [])





  return (
    <View style={styles.container}>
        <Text style={styles.title}>FlatList Contactos: </Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.login.uuid}
                renderItem={({item}) => (
                    <View key={item.login.uuid} style={styles.userContainer}>
                    <Image source={{uri: item.picture.large}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.detalle}>Nacionalidad: {item.nat}</Text>
                        <Text style={styles.detalle}>Edad: {item.dob.age}</Text>
                    </View>
                </View>
                )}
            />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'wheat',
        paddingTop: 35,
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c1bdbd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15
    },
    infoContainer: {
        flex: 1,
    },
    name:{
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#333'
    },
    detalle:{
        fontSize: 16,
        color: "#666"
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
    }
})