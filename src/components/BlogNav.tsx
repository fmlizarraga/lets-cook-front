import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import styles from './BlogNav.module.css';

export const BlogNav = () => {
    const navigate = useNavigate();
    const handleSignBtn = () => {
        navigate("/auth");
    };
    return (
        <div className={styles.blogHeader}>
            <nav className={styles.blogHeaderNav} >
                <ul>
                    <li><Link to="/blog">All Posts</Link></li>
                    <li><Link to="/categories/quick-easy">Quick & Easy</Link></li>
                    <li><Link to="/categories/vegetarian">Vegetarian</Link></li>
                    <li><Link to="/categories/main-course">Main Course</Link></li>
                </ul>
            </nav>
            <div className={styles.blogHeaderAuth} >
                <Button onClick={handleSignBtn} label="Log in / Sign up" outlined/>
            </div>
        </div>
    )
}



