import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useProducts } from "../contexts/productContext";
import { useRouter } from "expo-router";


export default function ProductosScreen(){

    const { productos, loading} = useProducts()
    const router = useRouter()

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/detalle/${item.id}`)}
        >
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    )


    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="blue" />
                <Text style={{ marginTop: 10, fontSize: 26}}>Cargando Productos...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Productos</Text>
            <FlatList
                data={productos}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                numColumns={2}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      paddingTop: 50,
    },
    header:{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 10
    },
    list:{
        paddingHorizontal: 10,
    },
    card:{
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3
    },
    image:{
        width: 100,
        height: 100,
        resizeMode:'contain'
    },
    title:{
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 5,
    },
    price:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e88e5'
    }
    
  });
  