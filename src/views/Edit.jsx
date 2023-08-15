import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'

const Edit = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [location, setLocation] = useState("")
    const [rating, setRating] = useState(8)
    const [season, setSeason] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/destinations/${id}`)
        .then(res => {
            const oneDest = res.data
            setLocation(oneDest.location)
            setRating(oneDest.rating)
            setSeason(oneDest.season)
            setImage(oneDest.image)
        })
        .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/destinations/${id}`, {location, rating, season, image})
        .then(res => {
            navigate(`/destinations`)
        })
        .catch(err => console.log(err))
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/destinations/${id}`)
        .then( res => {
            navigate(`/destinations`)
        })
        .catch(err => console.log(err))
    }


    return (
        <div>
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
                <button type='submit'>Update Destination</button>
                <button type='button' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default Edit