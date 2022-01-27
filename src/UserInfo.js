import React from 'react'
import './User_info.css'
import { useStateValue } from './stateProvider';

function User_info() {
    const [{user_info}, dispatch] = useStateValue();
    return (
        <div className="user-info">
            <h1>Hello-{user_info}</h1>
        </div>
    )
}

export default User_info
