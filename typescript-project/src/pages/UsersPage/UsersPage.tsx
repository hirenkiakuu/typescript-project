import axios from 'axios';
import UserCard from '../../components/UsersPage/UserCard/UserCard';
import Paginator from '../../components/Paginator/Paginator/Paginator';
import { useState, useEffect } from 'react';
import { IUser } from '../../model/user';
import styles from './UsersPage.module.css';


const PAGE_SIZE = 2;


const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [currentPageId, setCurrentPageId] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`https://reqres.in/api/users?page=${currentPageId}`);

            if (res) {
                console.log(res.data.data);
                setUsers(res.data.data);
            }
        };

        fetchUsers();
    }, [currentPageId]);

    const handlePaginatorButtonClick = (pageNumber : number) => {
        console.log(pageNumber)
        setCurrentPageId(pageNumber);
    }

    return (
        <>
            
            {/* <UsersList /> */}

            <div className={styles['users-page-container']}>
            <h1>Список пользователей</h1>
            

            {users && users.map((user, index) => (
                <>
                    {console.log()}
                    <UserCard key={user.id} userData={user} />
                </>
            ))}


            <Paginator onPaginatorButtonClick={handlePaginatorButtonClick} activePage={currentPageId} pagesCount={PAGE_SIZE} />

            </div>
        </>

        

    );
}

export default UsersPage;