import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {

    const [msg, setMsg] = useState("")

    useEffect (() => {
        axios.get(`http://localhost:8000/api/test`)
        .then(res => {
            console.log(res.data)
            setMsg(res.data)
        } )
        
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Test</h1>
            {
                msg ?
                <h3>Message from backend: {msg.message}</h3>:
                <h3>Loading...</h3>
            }
            

        </div>

    )
}

export default Test