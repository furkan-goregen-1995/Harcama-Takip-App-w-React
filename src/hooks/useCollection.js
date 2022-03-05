import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase/config"
import { useState,useEffect,useRef } from "react"

export default function useCollection(col,_query,_orderBy) {
  const [belgeler, setBelgeler] = useState(null)
  const [hata, setHata] = useState(null)
  const q = useRef(_query).current
  const oBy=useRef(_orderBy).current


    useEffect(() => {
        let ref = collection(db,col)
        if(q){
            ref = query(ref, where(...q))
        }
        if(oBy){
            ref=query(ref,orderBy(...oBy))
        }     
        const unsub = onSnapshot(ref,snapShot=>{
            let sonuclar = []
            snapShot.docs.forEach(doc=>{
                sonuclar.push({...doc.data(),id:doc.id})
            })
            setBelgeler(sonuclar)
            setHata(null)
        },error=>{
            console.log(error);
            setHata('veriler çekilemedi')
        })
        return () => unsub()
    }, [col])
    return {belgeler,hata}
}
