import axios from 'axios';
import UserCard from '../../components/UsersPage/UserCard/UserCard';
import Paginator from '../../components/Paginator/Paginator/Paginator';
import { useState, useEffect } from 'react';
import styles from './UsersPage.module.css';


const PAGE_SIZE = 2;

const UsersPage = () => {
    const [users, setUsers] = useState([]);
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
            <h1>Список пользователей</h1>
            {/* <UsersList /> */}

            {users && users.map((user, index) => (
                <>
                    <UserCard key={index} userData={user} />
                </>
            ))}


            <Paginator onPaginatorButtonClick={handlePaginatorButtonClick} activePage={currentPageId} pagesCount={PAGE_SIZE} />

        
        </>

        

    );
}

export default UsersPage;