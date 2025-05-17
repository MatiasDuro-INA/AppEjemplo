import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";


export default function LayoutPrincipal(){


    return (
    <Tabs>
        <Tabs.Screen 
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="home" color={color} size={size}/>
                )
            }}
        />
        <Tabs.Screen 
            name="settings"
            options={{
                title: "Settings",
                headerShown: false,
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name="settings" color={color} size={size}/>
                )
            }}
        />
    </Tabs>
    )
}