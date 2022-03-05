import { useEffect, useState, useReducer } from "react";
import {db} from "../firebase/config"
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

const baslangicVerisi = {
    belge:null,
    bekliyor:false,
    basari:null,
    hata:null
}

const useFirestoreReducer = (state,action) => {
    switch (action.type) {
        case "BEKLIYOR":
            return {belge:null,bekliyor:true,basari:false,hata:false}
        case "BELGE_EKLENDI":
            return {belge:action.payload,bekliyor:false,basari:true,hata:false}
        case "BELGE_SILINDI":
            return {belge:null,bekliyor:false,basari:false,hata:false}
        case "HATA":
            return {belge:null,bekliyor:true,basari:false,hata:action.payload}
        default:
            return state;
    }
}

export const useFirestore = (col) =>{

    const [response, dispatch] = useReducer(useFirestoreReducer, baslangicVerisi)
    const [iptal, setIptal] = useState(false)

    const ref = collection(db,col)

    const belgeEkle = async(belge)=>{
        dispatch({type:"BEKLIYOR"})
        try {
            const olusturulmaTarih = serverTimestamp()           
            const eklenenBelge = await addDoc(ref,{...belge,olusturulmaTarih})
            if(!iptal){
                dispatch({type:"BELGE_EKLENDI",payload: eklenenBelge})
            }
        } catch (error) {
            if(!iptal){
                dispatch({type:"HATA",payload:error.message})
            }
        }
    }

    const belgeSil = async(id) =>{

        dispatch({type:"BEKLIYOR"})
        try {
                      
            await deleteDoc(doc(db, "belgeler", id))
            if(!iptal){
                dispatch({type:"BELGE_SILINDI"})
            }
        } catch (error) {
            if(!iptal){
                dispatch({type:"HATA",payload:error.message})
            }
        }

    }

    useEffect(() => {
        return () => setIptal(true)
    }, [])

    return {belgeEkle, belgeSil, response}

}