import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IUser } from '../../model/user';
import styles from './UserProfilePage.module.css';


const UserProfilePage = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://reqres.in/api/users/${id}`);

            if (res) {
                console.log(res.data.data);
                setUserData(res.data.data);
                setTimeout(() => setIsLoading(false), 150);
            } else {
                console.log('error');
            }
        };

        fetchUser();
    }, []);

    const handleBack = () => {
        navigate("/");
    }

    return (
        <>  
            <div className={styles['button']} onClick={handleBack}>
                Назад
            </div>

            <div className={styles['profile-container']}>
            {isLoading ? (
                <>
                    <span className={styles['loader']}></span>
                    
                </>
                
                
            ) : (
                <>
            
                <div className={styles['user-data']}>
                    <img src={userData?.avatar || "/public/user-avatar.png"}  alt="" />
                    <div className={styles['user-brief-data']}>
                        <h1>{userData?.first_name} {userData?.last_name}</h1>
                        <p><b>Почта:</b> {userData?.email}</p>
                        <p><b>Место работы:</b> ничего не делает</p>
                        <p><b>Хобби:</b> что то там</p>
                    </div>
                    
                </div>
                
                <p><b>О себе:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ea dolores ab, obcaecati illo delectus tenetur ullam nulla, neque totam soluta aliquam tempore quasi placeat. Quidem harum beatae explicabo possimus!</p>
            
                </>
            )}
            </div>

            <div className={styles['button']} onClick={handleBack}>
                        Отредактировать
            </div>
            
        </>
    );
}


export default UserProfilePage;