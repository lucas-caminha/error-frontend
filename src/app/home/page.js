'use client'
import { React, useState, useEffect } from "react";
import styles from './home.css'
import ErrorTable from "../components/ErrorTable";
import { getErros } from "../data/erro/fetcherro";


export default  function DashBoard() {

    const [erros, setErros] = useState([]);

    useEffect(() => {
        const sys = getErros();
        sys.then(value => {
            setErros(value);
        });
      }, []);
    
    return (
        <div> 
            <ErrorTable rows={erros} />      
        </div>
    )
}