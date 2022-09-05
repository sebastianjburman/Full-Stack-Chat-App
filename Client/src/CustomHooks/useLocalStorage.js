import { useState, useEffect } from "react";

const getLocalStorageData = (key,initialValue)=>{
  const value = JSON.parse(localStorage.getItem(key))
  if (value) return value

  if (initialValue instanceof Function) return initialValue()
  return initialValue
      
}

export default function useLocalStorage(key,initialValue){

    const [value, setAllAccountsLS] = useState(()=>{
        return getLocalStorageData(key,initialValue)
    })


    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])

    return [value, setAllAccountsLS]
}