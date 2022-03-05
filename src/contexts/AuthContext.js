import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext } from 'react'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { auth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state,action) =>{
    switch (action.type) {
        case "SIGNUP":
            return ({...state, user: action.payload})
        case "LOGIN":
            return ({...state, user: action.payload})
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        case 'BELGE_EKLENDI':
            return { user: action.payload, authIsReady: true }
        case "LOGOUT":
            return ({...state,user:null})
        default:
            return state
    }
}

export default function AuthContextProvider({children}) {
 
    const [state, dispatch] = useReducer(authReducer, { 
        user: null,
        authIsReady: false 
      })
    console.log("Auth state " + state.user);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth,user => {
          dispatch({ type: 'AUTH_IS_READY', payload: user })
          unsub()
        })
      }, [])

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
