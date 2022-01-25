import React, { useEffect } from "react";


const FriendsList = (props) => {
    useEffect(() => {
        props.getFriends()
    }, [])
    
        if(!props.friends) {
            return (
                <h1>LOADING...</h1>
            )
        }
    return (
        <>
        {props.friends.map(friend => {
            return (
                <div>
                    <p>{friend.name}</p>
                    <p>{friend.age}</p>
                    <p>{friend.email}</p>
                    <br/>
                </div>
            )
        })}
        </>
    )
}

export default FriendsList