import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/userStore";
import UserCard from "../../components/UsersPage/UserCard/UserCard";
import Paginator from "../../components/Paginator/Paginator/Paginator";
import Select, { SingleValue } from "react-select";
import { useState, useEffect } from "react";
import styles from "./UsersPage.module.css";

const PAGE_SIZE = 6;

const UsersPage = observer(() => {
  const [currentPageId, setCurrentPageId] = useState(1);
  const [jobFilter, setJobFilter] = useState("");
  const [hobbyFilter, setHobbyFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`https://reqres.in/api/users?per_page=12`);
      if (res) {
        console.log(res.data.data);
        userStore.setUsers(res.data.data);
      }
    };

    if (userStore.users.length) {
      userStore.loadUsers();
      userStore.initializeDefaultUser();
      fetchUsers();
    }
  }, []);

  const handlePaginatorButtonClick = (pageNumber: number) => {
    console.log(pageNumber);
    setCurrentPageId(pageNumber);
  };

  const handleCreateUserButtonClick = () => {
    navigate("create-user");
  };

  const onJobFilterChange = (value: string) => {
    setJobFilter(value);
  };

  const onHobbyFilterChange = (value: string) => {
    setHobbyFilter(value);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleOnClearFiltersButtonClick = () => {
    setJobFilter("");
    setHobbyFilter("");
  };

  const filteredUsers = userStore.users.filter((user) => {
   
    if (jobFilter && user.job !== jobFilter) {
      return false;
    }
  
    if (hobbyFilter && user.hobbie !== hobbyFilter) {
      return false;
    }
    
    if (
      searchQuery &&
      !user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPageId - 1) * PAGE_SIZE,
    currentPageId * PAGE_SIZE
  );

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      "*": {
        boxShadow: "none !important",
      },
      boxShadow: "none",
      borderColor: state.isFocused
        ? "rgb(239, 223, 249)"
        : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused
          ? "rgb(239, 223, 249)"
          : provided.borderColor,
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgb(239, 223, 249)"
        : state.isFocused
        ? "rgb(230, 196, 251)"
        : provided.backgroundColor,
      "&:hover": {
        backgroundColor: state.isSelected
          ? "rgb(239, 223, 249)"
          : "rgb(230, 196, 251)",
      },
    }),
  };

  const totalUsers = userStore.users.length;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  return (
    <>
      <div className={styles["users-page-container"]}>
        <h1>Список пользователей</h1>

        <div className={styles["controls-panel"]}>
          <div
            className={styles["create-user-button"]}
            onClick={handleOnClearFiltersButtonClick}
          >
            Сбросить фильтры
          </div>

          <Select
            styles={customStyles}
            classNamePrefix={"react-select"}
            options={[
              { value: "IT", label: "IT" },
              { value: "Медицина", label: "Медицина" },
              { value: "Блоггинг", label: "Блоггинг" },
            ]}
            onChange={(selectedOption: SingleValue<{ value: string } | null>) =>
              onJobFilterChange(selectedOption?.value || "")
            }
            placeholder="Выберите работу"
          />

          <Select
            styles={customStyles}
            classNamePrefix={"react-select"}
            options={[
              { value: "Футбол", label: "Футбол" },
              { value: "Баскетбол", label: "Баскетбол" },
              { value: "Программирование", label: "Программирование" },
            ]}
            onChange={(selectedOption) =>
              onHobbyFilterChange(selectedOption?.value || "")
            }
            placeholder="Выберите хобби"
          />

          <input
            className={styles["search-input"]}
            type="text"
            placeholder="Поиск по имени"
            onChange={handleSearchInputChange}
          />

          <div
            className={styles["create-user-button"]}
            onClick={handleCreateUserButtonClick}
          >
            Добавить пользователя
          </div>
        </div>

        {paginatedUsers.map((user) => (
          <UserCard key={user.id} userData={user} />
        ))}

        <Paginator
          onPaginatorButtonClick={handlePaginatorButtonClick}
          activePage={currentPageId}
          pagesCount={totalPages}
        />
      </div>
    </>
  );
});

export default UsersPage;
