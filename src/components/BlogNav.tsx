import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useAuthStore } from "../hooks";

import styles from './BlogNav.module.css';
import { MenuItem } from "primereact/menuitem";

export const BlogNav = () => {
    const navigate = useNavigate();
    const { authStatus, user, logout } = useAuthStore();

    const handleSignBtn = () => {
        navigate("/auth");
    };

    const userMenu = useRef<Menu>(null);
    const userMenuItems: MenuItem[] = [
        {
            label: user.name,
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        logout();
                        navigate("/");
                    }
                },
            ]
        }
    ];

    let AuthSection = (<></>);

    if(authStatus==='unauthenticated') {
        AuthSection = (
            <div className={styles.blogHeaderAuth} >
                <Button onClick={handleSignBtn} label="Log in / Sign up" outlined/>
            </div>
        );
    }
    else if(authStatus==='authenticated') {
        AuthSection = (
            <div>
                <Menu model={userMenuItems} popup ref={userMenu} id="popup_menu_user" />
                <Avatar
                    image={user.picture}
                    imageAlt={user.name}
                    icon="pi pi-user"
                    size="xlarge"
                    shape="circle"
                    onClick={(event) => userMenu.current?.toggle(event)}
                    aria-controls="popup_menu_user"
                    aria-haspopup
                    pt={{
                        image: {style:{objectFit:"cover"}}
                    }}
                />
            </div>
        );
    }

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
            {AuthSection}
        </div>
    )
}



