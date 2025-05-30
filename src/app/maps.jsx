import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View, Image, Modal, ActivityIndicator, Easing, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSedes } from "../contexts/sedeContext";


export default function Maps() {

    const [location, setLocation] = useState(null);
    const [selectedSede, setSelectedSede] = useState(null)
    const [routeCoords, setRouteCoords] = useState(null)
    const [loadingRoute, setLoadingRoute] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [mapRegion, setMapRegion] = useState(null)
    const [modalVisible, setModalVisible] = useState(null)

    const { sedes, decodePolyline, GOOGLE_MAPS_APIKEY } = useSedes()

    const mapRef = useRef(null)

    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const cargarLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permiso de ubicacion Denegado')
                return
            }

            let loc = await Location.getCurrentPositionAsync()

            setLocation(loc.coords)
            setMapRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })
        }

        cargarLocation()
    }, [])

    useEffect(() => {
        if(modalVisible){
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 230,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            }).start()
        }
    }, [modalVisible])

    const fetchRoute = async (sede) => {
        console.log("fetch route");

        if(!location ) return;

        setLoadingRoute(true)
        setRouteCoords(null)

        const origen = `${location.latitude}, ${location.longitude}`
        const destino = `${sede.latitude}, ${sede.longitude}`

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origen}&destination=${destino}&mode=walking&key=${GOOGLE_MAPS_APIKEY}`;

        try {

            const resp = await fetch(url)
            const data = await resp.json();
            
            if(data.routes && data.routes.length){

                console.log("points sin deco: ", data.routes[0].overview_polyline.points);
                
                const points = decodePolyline(data.routes[0].overview_polyline.points)
                console.log("points: ", points);
                setRouteCoords(points)
            }
            
        } catch (error) {
            setErrorMsg("Error al trazar la ruta")
        }

        setLoadingRoute(false)
        setSelectedSede(false)
        setModalVisible(false)
    }


    const openSede = (sede) =>{
        setSelectedSede(sede)
        setModalVisible(true)
    }
    const centerUser = () =>{
        if(mapRef.current && location){
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })
        }
    }

    const alignNorth = () => {
        if(mapRef.current && mapRegion){
            mapRef.current.animateCamera({
                heading: 0,
                pitch: 0,
                center:{
                    latitude: mapRegion.latitude,
                    longitude: mapRegion.longitude,
                }
            })
        }
    }

    const handleClose = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 120,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start(() => {
            setModalVisible(false)
            setSelectedSede(null)
            setRouteCoords(null)
        })
    }


    return (
        <View style={styles.container}>
            {
                location && (
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        showsMyLocationButton={false}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        showsUserLocation
                        showsCompass
                        onRegionChangeComplete={setMapRegion}
                    >
                        {
                            sedes.map(sede => (
                                <Marker
                                    key={sede.id}
                                    coordinate={sede.coordenadas}
                                    onPress={() => openSede(sede)}
                                    image={require('../../assets/sede.png')}
                                />
                            ))
                        }

                        {
                            routeCoords && (
                                <Polyline
                                    coordinates={routeCoords}
                                    strokeColor="#007AFF"
                                    strokeWidth={5}
                                />
                            )
                        }
                    </MapView>

                )
            }

            <Pressable style={styles.centerButton} onPress={centerUser}>
                <Image source={require('../../assets/rocket.png')}
                style={{width: 32, height: 32}}
                resizeMode="contain"
                />
            </Pressable>

            <Pressable style={styles.alignButton} onPress={alignNorth}>
                <Image source={require('../../assets/location.png')}
                style={{width: 32, height: 32}}
                resizeMode="contain"
                />
            </Pressable>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                onRequestClose={() => setSelectedSede(null)}
                style={{ backgroundColor: 'white'}}
            >
                <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
                    <View style={styles.modalCard}>
                        <Image
                            source={require('../../assets/sede.png')}
                            style={styles.modalIcon}
                        />
                        <View>
                            <Text status={styles.modalTitle}>{selectedSede?.description}</Text>
                            <Text status={styles.modalSubtitle}>{selectedSede?.title}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingBottom: 20}}>

                    <View style={{marginVertical: 10}}>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => fetchRoute(selectedSede.coordenadas)}
                            disabled={loadingRoute}
                        >
                            {
                                loadingRoute ? (
                                    <ActivityIndicator color={"#fff"}/>
                                ): (
                                    <Text style={styles.modalButtonText}>Mostrar Ruta</Text>
                                )
                            }
                        </Pressable>
                    </View>
                    <Pressable
                        style={styles.closeModal}
                        onPress={handleClose}
                    >
                        <Text style={styles.closeText}>Cerrar</Text>
                    </Pressable>             
                    </View>
                </Animated.View>
                
            </Modal>

        </View>
    )

}


const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    centerButton: {
        position: 'absolute',
        bottom: 40,
        right: 16,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 24,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    alignButton: {
        position: 'absolute',
        bottom: 100,
        right: 16,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 24,
        paddingBottom: 36,
        minHeight: 220,
        elevation: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    modalIcon: {
        width: 38,
        height: 38,
        marginRight: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: "#222",
    },
    modalSubtitle: {
        fontSize: 16,
        color: "#707070",
        marginTop: 4,
    },
    modalButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 0.2,
    },
    closeModal: {
        alignSelf: 'center',
        marginTop: 12,
        padding: 6,
    },
    closeText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    errorBanner: {
        position: 'absolute',
        top: 48,
        left: 16,
        right: 16,
        backgroundColor: '#EA4343',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        zIndex: 999,
    },
});
