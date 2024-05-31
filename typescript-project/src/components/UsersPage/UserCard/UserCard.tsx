
import styles from './UserCard.module.css';

interface UserData {
    email: string;
    first_name: string;
    last_name: string;
}

interface UserCardProps {
    userData: UserData;
}

const UserCard: React.FC<UserCardProps> = ({ userData }) => {
    
    return (
        <>
            <div className={styles['card-container']}>
                <img src="public/user-avatar.png" className={styles['user-photo']} alt="" />
                <div className={styles['user-personal-info-container']}>
                    <h2>{userData.first_name} {userData.last_name}</h2>
                    <p>{userData.email}</p>
                </div>
            </div>
            
        </>
    );
}

export default UserCard;