import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/authContext";
import { ProductProvider } from "../contexts/productContext";



function ProtectedLayout(){

    console.log("Inicio");

    const {isAuth} = useAuth();
    const router = useRouter();

    useEffect(() => {
     
        if(isAuth === null) return;

        if(isAuth){
            router.replace("/(tabs)")
        }else{
            router.replace("/login")
        }


    }, [isAuth])
    


    

    return <Stack
    screenOptions={{
        headerShown: false,
    }}
/>
}

export default function LayoutPrincipal() {
    return (

        <AuthProvider>
            <ProductProvider>
                <ProtectedLayout/>
            </ProductProvider>
        </AuthProvider>

    )
}