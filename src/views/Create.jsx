import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {

    const [location, setLocation] = useState("")
    const [rating, setRating] = useState(8)
    const [season, setSeason] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/destinations`, {location, rating, season, image})
        .then(res => {
            console.log(res.data);
            navigate("/destinations")
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
                <button>Create Destination</button>
            </form>
        </div>
    )
}

export default Create