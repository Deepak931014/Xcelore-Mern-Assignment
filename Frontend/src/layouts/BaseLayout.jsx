import Header from '../components/Header';
import './baseLayout.css';
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <div>
        <Header />
        <div className="content">
            <Outlet />
        </div>
        </div>
    );
}

export default BaseLayout;
