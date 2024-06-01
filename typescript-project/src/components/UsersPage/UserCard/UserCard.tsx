import { useNavigate } from 'react-router-dom';
import { IUser } from '../../../model/user';
import styles from './UserCard.module.css';


interface UserCardProps {
    userData: IUser;
}

const UserCard: React.FC<UserCardProps> = ({ userData }) => {

    const navigate = useNavigate();

    const handleOnCardClick = () => {
        navigate(`/users/${userData.id}`);
    }
    
    return (
        <>
            <div className={styles['card-container']} onClick={handleOnCardClick} >
                <img src={userData.avatar || "public/user-avatar.png"}  className={styles['user-photo']} alt="" />
                <div className={styles['user-personal-info-container']}>
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <p>{userData.email}</p>
                </div>
            </div>
            
        </>
    );
}

export default UserCard;