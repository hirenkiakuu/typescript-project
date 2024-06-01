import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import userStore from "../../stores/userStore";
import { IUser } from "../../model/user";
import styles from "./UserProfilePage.module.css";

const UserProfilePage : React.FC = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<IUser>>({
    first_name: "",
    last_name: "",
    email: "",
    job: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const user = userStore.getUserById(Number(id));
    console.log(user);
    if (user) {
      setUserData(user);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        job: user.job,
      });
      setTimeout(() => setIsLoading(false), 150);
    }
  }, [id]);

  const handleBack = () => {
    navigate("/users");
  };

  const handleOpenFormClick = () => {
    setIsFormOpen(true);
  };

  const handleSubmit = async () => {
    setIsFormOpen(false);
    setIsLoading(true);
    const res = await axios.patch(
      `https://reqres.in/api/users/${id}`,
      formData
    );

    if (res) {
      console.log(res);
      userStore.patchUser(Number(id), formData);
      setUserData((prevState : Partial<IUser>) => ({ ...prevState, ...formData }));

      setTimeout(() => setIsLoading(false), 150);
    } else {
      console.log("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className={styles["profile-page-container"]}>
        <div className={styles["button"]} onClick={handleBack}>
          Назад
        </div>

        <div className={styles["profile-container"]}>
          {isLoading ? (
            <>
              <span className={styles["loader"]}></span>
            </>
          ) : (
            <>
              <div className={styles["user-data"]}>
                <img
                  src={userData?.avatar || "/public/user-avatar.png"}
                  alt=""
                />
                <div className={styles["user-brief-data"]}>
                  <h1>
                    {userData?.first_name} {userData?.last_name}
                  </h1>
                  <p>
                    <b>Почта:</b> {userData?.email}
                  </p>
                  <p>
                    <b>Место работы:</b> {userData?.job}
                  </p>
                  <p>
                    <b>Хобби:</b> {userData?.hobbie}
                  </p>
                </div>
              </div>

              <p>
                <b>О себе:</b> Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iure ea dolores ab, obcaecati illo delectus
                tenetur ullam nulla, neque totam soluta aliquam tempore quasi
                placeat. Quidem harum beatae explicabo possimus!
              </p>
            </>
          )}
        </div>

        <div className={styles["button"]} onClick={handleOpenFormClick}>
          Отредактировать
        </div>
      </div>

      {isFormOpen && (
        <div className={styles["user-patch-form-container"]}>
          <form>
            <div className={styles["form-container-inner"]}>
              <div className={styles["form-input-row"]}>
                <label htmlFor="first_name">Имя</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder={userData?.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="last_name">Фамилия</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder={userData?.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  name="email"
                  placeholder={userData?.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="job">Место работы</label>
                <input
                  type="text"
                  name="job"
                  placeholder={userData?.job}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="hobbie">Хобби</label>
                <input
                  type="text"
                  name="hobbie"
                  placeholder={userData?.hobbie}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles["form-input-row"]}>
                <label htmlFor="hobbie">Ссылка на фотографию</label>
                <input
                  type="text"
                  name="avatar"
                  placeholder={userData?.avatar}
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
      )}
    </>
  );
};

export default UserProfilePage;
