import React from 'react';

export default function DisplayAll(props) {
    const displayUsers = (props) => {
        const { user } = props;
        if (user.length > 0) {
            return (
                Array.from(user).map((users, index) => {
                    return ( 
                        <tr key={index}>
                            { users.username }
                        </tr>
                    )

                })

            )
        } else {
            return ( 
                <div>
                
                <h3> 
                Pas d 'utilisateur pour le moment
                </h3> 
                </div>
            )
        }


    }
    return ( 
        <> { displayUsers(props) } 
        </>
    )
}