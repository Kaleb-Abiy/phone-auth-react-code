import React, {useState} from 'react'
import './Users.css'
import axios from './axios'
import { useStateValue } from './stateProvider';

function Users() {
    const [name, setName]= useState("")
    const [bio, setBio]= useState("")
    const [{user}, dispatch] = useStateValue();


    const infos = {
        full_name: name,
        bio: bio,
        uuid: user.uid,
    }

    const sendInfo = async (e)=> {
        e.preventDefault()
        const response = await axios.post('/save', infos)
        console.log(response.data)    
    }

    return (
        <div className="users">
            <h1>Enter your profile here</h1>
            <div className="users__form">
            <form>
            <h5>Full name</h5>
                <input
                type="text"
                onChange={(e)=> setName(e.target.value)}
                />

            <h5>Bio</h5>    
            <input
                type="text"
                onChange={(e)=> setBio(e.target.value)}
                />

            <button
                type="submit"
                onClick={sendInfo}
                className="save_button"
                >
                    Save
                </button>        
            </form>
            </div>    
        </div>
    )
}

export default Users
