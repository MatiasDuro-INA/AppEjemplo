import { useState } from "react";
import { useSedes } from "../contexts/sedeContext";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


export default function AddSede() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(null)

    const { addSede } = useSedes();

    const handleAdd = async() => {
        if(!title || !description || !address){
            alert('Todos los campos son obligatorios')
            return
        }

        setLoading(true)

        try {

            await addSede({ title, description, address})
            setTitle('')
            setDescription('')
            setAddress('')
            
        } catch (error) {
            alert('Error al agregar Sede', error.message)
        }

        setLoading(false)

    }

    return (
        <View styles={styles.container}>
            <Text styles={styles.heading}>Agregar nueva Sede</Text>
            <TextInput
                style={styles.input}
                placeholder="Titulo"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripcion"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Direccion"
                value={address}
                onChangeText={setAddress}
            />
            <Pressable style={styles.button} onPress={handleAdd} disabled={loading}>
                {
                    loading ? (
                        <ActivityIndicator color={'#fff'}/>
                    ) : (
                        <Text style={styles.buttonText}>Agregar Sucursal</Text>
                    )
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
    heading: { fontSize: 22, fontWeight: '700', marginBottom: 30, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#bbb', borderRadius: 10, padding: 12,
        marginBottom: 18, fontSize: 16, backgroundColor: '#f9f9f9'
    },
    button: {
        backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});