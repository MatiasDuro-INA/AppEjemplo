import React from 'react'
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

export default function DetalleScreen() {

    const handlePress = (tipo) => {
        console.log(`Presionaste ${tipo}`);
        
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Ejemplos de Touchables</Text>

        <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress('TouchableOpacity')}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>Touchable Opacity</Text>
        </TouchableOpacity>

        <TouchableHighlight
            style={styles.button}
            onPress={() => handlePress('TouchableHighlight')}
            underlayColor={"red"}
        >
            <Text style={styles.text}>Touchable Highlight</Text>
        </TouchableHighlight>


        <TouchableWithoutFeedback
            onPress={() => handlePress('TouchableWithoutFeedback')}
        >
            <View style={styles.button}>
            <Text style={styles.text}>Touchable WithoutFeedback</Text>
            </View>
        </TouchableWithoutFeedback>

        <Pressable
            style={({pressed}) => [ 
                styles.button,
                {
                backgroundColor: pressed ? 'gray' : '#2196f3',
                }
            ]
            }
            onPress={() => handlePress('Pressable')}
        >
            <Text style={styles.text}>Pressable</Text>
        </Pressable>


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
        marginBottom: 15,
        backgroundColor: '#2196f3',
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