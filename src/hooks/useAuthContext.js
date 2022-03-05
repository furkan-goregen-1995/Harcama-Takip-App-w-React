import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'

export default function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context){
        console.log("Context kullanımında hata oluştu!");
    }
    return context
}
