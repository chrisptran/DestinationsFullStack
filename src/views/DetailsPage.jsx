import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const DetailsPage = () => {

    const { id } = useParams()

    const [oneDest, setOneDest] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/destinations/${id}`)
            .then(res => {
                setOneDest(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/destinations/${id}`)
        .then(res => {
            navigate("/destinations")
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            {
                oneDest ?
                    <div>
                        <h1>{oneDest.location}</h1>
                        <h1>Rating: {oneDest.rating}</h1>
                        <h1>Season {oneDest.season}</h1>
                        <img src={oneDest.image} alt={oneDest.location} />
                        <button onClick={handleDelete}>Delete</button>
                    </div> :
                    <h1>Loading...</h1>
            }
        </div>
    )
}

export default DetailsPage