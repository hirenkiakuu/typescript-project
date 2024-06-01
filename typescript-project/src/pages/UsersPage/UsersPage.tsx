import axios from 'axios';
import UserCard from '../../components/UsersPage/UserCard/UserCard';
import Paginator from '../../components/Paginator/Paginator/Paginator';
import Select from 'react-select';
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

    const onJobFilterChange = (value : string) => {
        setUsers(users.filter(user => {
            return user.first_name.startsWith(value);
        }))
    };

    const handleSelectChange = (selectedOption: { value: string; label: string }) => {
        onJobFilterChange(selectedOption.value);   
      };

      const customStyles = {
        control: (provided: any, state: any) => ({
          ...provided,
          "*": {
            boxShadow: "none !important",
          },
          boxShadow: 'none',
          borderColor: state.isFocused ? 'rgb(239, 223, 249)' : provided.borderColor,
          '&:hover': {
            borderColor: state.isFocused ? 'rgb(239, 223, 249)' : provided.borderColor,
          }
        }),
        option: (provided: any, state: any) => ({
          ...provided,
          backgroundColor: state.isSelected ? 'rgb(239, 223, 249)' : (state.isFocused ? 'rgb(239, 223, 249)' : provided.backgroundColor),
          '&:hover': {
            backgroundColor: state.isSelected ? 'rgb(239, 223, 249)' : 'rgb(239, 223, 249)',
          }
        })
     };

    return (
        <>
            <Select 
            styles={customStyles}
            classNamePrefix={"react-select"}
          options={[
            { value: 'E', label: 'Все' },
            { value: 'G', label: 'IT' },
          ]} 
          onChange={handleSelectChange as any}
          placeholder="Выберите работу"
        />
        

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