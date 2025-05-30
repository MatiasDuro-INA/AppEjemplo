import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';
// Import * significa importa todo, el * es sinonimo de TODO, y el as es para renombrarlo
const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(null)
    const [onDevelop, setOnDevelop] = useState(true)

    const [status, setStatus] = useState('checking')
    const [user, setUser] = useState(null); 

    
    useEffect(() => {
      
        const cargarEstadoAuth = async() =>{
            const isAuthenticated = await AsyncStorage.getItem("isAuthenticated") 
            const userData = await AsyncStorage.getItem("userData") 

            if(isAuthenticated === 'true' && userData){

                const compatible = await LocalAuthentication.hasHardwareAsync();
                const datosBiometricosRegistrados = await LocalAuthentication.isEnrolledAsync();

                console.log("Compatible: ", compatible);
                console.log("Datos biometricos: ", datosBiometricosRegistrados);
                
                

                if( compatible && datosBiometricosRegistrados && !onDevelop){
                    const results = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Verifica tu identidad',
                        fallbackLabel: 'Usa tu contrasenia',
                        cancelLabel: 'Cancelalo aca'
                    })

                    if(results.success){
                        setIsAuth(true)
                        setStatus('authenticated')
                        setUser(JSON.parse(userData))
                    }else{
                        await AsyncStorage.removeItem('isAuthenticated')
                        await AsyncStorage.removeItem('userData')
                        setStatus('unauthenticated')
                        setIsAuth(false)
                    }
                }else{

                    console.log("Biometria no encontrada");
                    
                    setIsAuth(true)
                    setStatus('authenticated')
                    setUser(JSON.parse(userData))
                }
            }else{
                setStatus('unauthenticated')
                setIsAuth(false)
            }
        }
        cargarEstadoAuth()
    }, [])

    const login = async (usuario, password) => {
       
        try {
            console.log("Iniciando Login");

            const response = await fetch('https://682faacbf504aa3c70f4cea6.mockapi.io/users')
            const data = await response.json();

            console.log("Data: ", data);

            const user = data.find(u => u.username === usuario && u.password === password)

            console.log("Usuario: ", user);

            if(user){
                await AsyncStorage.setItem("isAuthenticated", 'true') 
                await AsyncStorage.setItem("userData", JSON.stringify(user)) 
                setIsAuth(true)
                setStatus('authenticated')
                setUser(user)
            }else{
                alert('Usuario o Password incorrectos')
                setStatus('unauthenticated')
            }
            
        } catch (error) {
            console.error(error)
            alert('Error al authenticarme')
            setStatus('unauthenticated')
        }
        
    }

    const register = async (usuario, email, password) => {
        try {
            
            const response = await fetch('https://682faacbf504aa3c70f4cea6.mockapi.io/users')
            const data = await response.json();

            const userExist = data.some( u => u.username === usuario);
            const emailExist = data.some( u => u.email === email);

            if(userExist){
                alert('Usuario ya registrado')
                return;
            }else if(emailExist){
                alert('Email ya registrado')
                return;
            }else{
                const body = JSON.stringify({
                    email: email,
                    username: usuario,
                    password: password,
                })

                const respuesta = await fetch('https://682faacbf504aa3c70f4cea6.mockapi.io/users',{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: body
                })

                if(respuesta.ok){
                    alert('Registro Exitoso')
                }else{
                    alert('Error al registrar el usuario')
                }
            }

        } catch (error) {
            console.error(error)
            alert('Error en la authenticacion')
        }
        
    }

    const logout = () => {
        setIsAuth(false)
    }


    return (
        <AuthContext.Provider value={{isAuth, register, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
    

}