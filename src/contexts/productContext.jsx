import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({children}) => {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const cargarProductos = async () => {
            const resp = await fetch('https://fakestoreapi.com/products')
            const data = await resp.json()            
            setProductos(data)
            setLoading(false)
        }

        cargarProductos()
    }, [])

    const createProduct = async ({title, description, price, imageUri}) => {


        console.log("imageUrl: ", imageUri);
        

        const newProduct = {
            id: Date.now(),
            title,
            description,
            price: Number(price),
            image: imageUri
        }


        setProductos(prev => [newProduct, ...prev])
    }
     


    return (
        <ProductContext.Provider value={{productos, loading, createProduct}}>
            {children}
        </ProductContext.Provider>
    )
}