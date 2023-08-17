import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Main = () => {

    const [location, setLocation] = useState("")
    const [rating, setRating] = useState(8)
    const [season, setSeason] = useState("")
    const [image, setImage] = useState("")

    const [destinationList, setDestinationList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/destinations`)
            .then(res => {
                setDestinationList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/destinations`, { location, rating, season, image })
            .then(res => {
                clearForm()
                const newItem = res.data
                const updatedList = [...destinationList, newItem]
                setDestinationList(updatedList)
            })
            .catch(err => console.log(err))
    }

    const clearForm = () => {
        setLocation("")
        setSeason("")
        setRating("")
        setImage("")
    }



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
            {/* form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <input type='text' name='location' value={location}
                        onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type='number' name='rating' value={rating}
                        onChange={(e) => setRating(e.target.value)} />
                </div>
                <div>
                    <label>Season</label>
                    <select name='season' value={season} onChange={(e) => setSeason(e.target.value)}>
                        <option hidden>Please choose season</option>
                        <option value='spring'>Spring</option>
                        <option value='fall'>Fall</option>
                        <option value='winter'>Winter</option>
                        <option value='summer'>Summer</option>
                    </select>
                </div>
                <div>
                    <label>Image Adress:</label>
                    <input type='text' name='image' value={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div>
                <button>Create Destination</button>
            </form>

            {/* dashboard table*/}
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
                                        <button type='button' onClick={(e) => handleDelete(eachDest._id)}> Delete</button>
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

export default Main