import { createContext, useContext, useState } from "react";



const SedeContext = createContext()

export const useSedes = () => useContext(SedeContext)

export function SedeProvider({children}){

    const GOOGLE_MAPS_APIKEY = 'AIzaSyA5_igLeSHGtZ5Z0vj1Ilib7d7s93C3buU'
    
    const [sedes, setSedes] = useState([
        {
            id: '1',
            title: 'Sucursal Norte',
            description: 'Sucursal de Belgrano',
            coordenadas: { latitude: -34.5895, longitude: -58.4186 }
        },
        {
            id: '2',
            title: 'Sucursal Sur',
            description: 'Sucursal de Caballito',
            coordenadas: { latitude: -34.6181, longitude: -58.4438 }
        }
    ])
    
    
    
    function decodePolyline(t, e) {
        let points = [];
        let index = 0, lat = 0, lng = 0;
        while (index < t.length) {
          let b, shift = 0, result = 0;
          do {
            b = t.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
          lat += dlat;
          shift = 0; result = 0;
          do {
            b = t.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
          lng += dlng;
          points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
        return points;
    }

    const getCoordenadas = async (address) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_APIKEY}`;
    
        try {
            const resp = await fetch(url)
            const data = await resp.json()

            if(data.results && data.results.length){
                const {lat, lng} = data.results[0].geometry.location

                return {
                    latitude: lat,
                    longitude: lng
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    
    }

    const addSede = async ({title, description, address}) => {

        const coordenadas = await getCoordenadas(address)

        if(!coordenadas){
            return null;
        }

        const newSede = {
            id: Date.now().toString(),
            title,
            description,
            coordenadas
        }

        setSedes((prev) => [...prev, newSede])
        
        return newSede
    }

    

    return (
        <SedeContext.Provider value={{sedes, addSede, decodePolyline, GOOGLE_MAPS_APIKEY}}>
            {children}
        </SedeContext.Provider>
    )
}