import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [destinationList, setDestinationList] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/destinations`)
            .then(res => {
                setDestinationList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/destinations/${deleteId}`)
        .then(res => {
            handleFilter(deleteId)
        })
        .catch(err => console.log(err))
    }

    const handleFilter = (deleteId) => {
        const filteredList = destinationList.filter((eachDest) => deleteId !== eachDest._id)
        setDestinationList(filteredList)
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Rating</th>
                        <th>Season</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        destinationList.map((eachDest, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{eachDest.location}</td>
                                    <td>{eachDest.rating}</td>
                                    <td>{eachDest.season}</td>
                                    <td>
                                        <Link to={`/destinations/${eachDest._id}`}>View</Link> |
                                        <Link to={`/destinations/${eachDest._id}/edit`}> Edit</Link> |
                                        <button type='button' onClick={ (e) => handleDelete(eachDest._id)}> Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard