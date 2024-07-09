import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ViewPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>View Page</h1>
            <p>Welcome <b>{user.firstName} {user.lastName}</b> to the View Page</p>
        </div>
    )
}

export default ViewPage;
