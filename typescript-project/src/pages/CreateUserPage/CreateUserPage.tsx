import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../stores/userStore";
import styles from "./CreateUserPage.module.css";

const CreateUserPage: React.FC = observer(() => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    job: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/users");
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://reqres.in/api/users", userData);
      console.log(res);
      userStore.addUser(res.data);
      handleBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles["create-user-page-container"]}>
        <div className={styles["button"]} onClick={handleBack}>
          Назад
        </div>

        <div className={styles["user-patch-form-container"]}>
          <form>
            <div className={styles["form-container-inner"]}>
              <div className={styles["form-input-row"]}>
                <label htmlFor="first_name">Имя</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder={"Иван"}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="last_name">Фамилия</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder={"Иванов"}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  name="email"
                  placeholder={"example@gmail.com"}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="job">Место работы</label>
                <input
                  type="text"
                  name="job"
                  placeholder={"IT"}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="hobbie">Хобби</label>
                <input
                  type="text"
                  name="hobbie"
                  placeholder={"Футбол"}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="hobbie">Ссылка на фото</label>
                <input
                  type="text"
                  name="avatar"
                  placeholder={"https://..."}
                  onChange={handleInputChange}
                />
              </div>
              <div
                className={styles["form__submit-button"]}
                onClick={handleSubmit}
              >
                Сохранить
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default CreateUserPage;
