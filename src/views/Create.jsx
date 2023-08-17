import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {

    const [location, setLocation] = useState("")
    const [rating, setRating] = useState(8)
    const [season, setSeason] = useState("")
    const [image, setImage] = useState("")

    const [locationErr, setLocationErr] = useState("")
    const [ratingErr, setRatingErr] = useState("")
    const [seasonErr, setSeasonErr] = useState("")
    const [imageErr, setImageErr] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/destinations`, {location, rating, season, image})
        .then(res => {
            console.log(res.data);
            navigate("/destinations")
        })
        .catch(err => {
            const errResponseData = err.response.data.errors

            if(errResponseData.location) {
                setLocationErr(errResponseData.location.message)
            } else {
                setLocationErr("")
            }
            if (errResponseData.rating) {
                setRatingErr(errResponseData.rating.message)
            } else {
                setRatingErr("")
            }

            if (errResponseData.season) {
                setSeasonErr(errResponseData.season.message)
            } else {
                setSeasonErr("")
            }

            if (errResponseData.image) {
                setImageErr(errResponseData.image.message)
            } else {
                setImageErr("")
            }
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location:</label>
                    <input type='text' name='location' value={location}
                        onChange={(e) => setLocation(e.target.value)} />
                        <p style={{color: "red"}}>{locationErr}</p>
                </div>
                <div>
                    <label>Rating:</label>
                    <input type='number' name='rating' value={rating}
                        onChange={(e) => setRating(e.target.value)} />
                        <p style={{ color: "red" }}>{ratingErr}</p>
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
                    <p style={{ color: "red" }}>{seasonErr}</p>
                </div>
                <div>
                    <label>Image Adress:</label>
                    <input type='text' name='image' value={image}
                        onChange={(e) => setImage(e.target.value)} />
                        <p style={{ color: "red" }}>{imageErr}</p>
                </div>
                <button>Create Destination</button>

            </form>
        </div>
    )
}

export default Create