import axios from 'axios';
import { useState } from 'react';
import styles from './RegisterPage.module.css';


const RegisterPage = () => {
    const [formData, setFormData] = useState<{ username: string; email: string; password: string }>({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        
        if (id === 'fullname') {
            setFormData({
                ...formData,
                username: value
            });
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };

    const handleSubmit = async () => {
        const res = await axios.post(
            'https://reqres.in/api/register',
            formData,
        );

        if (res) {
            console.log(res);
        } else {
            console.log('error')
        }
    }

    return (
        <>
            <div className={styles['form-container']}>
                <form>
                    <div className={styles['form-container-inner']}>
                        <div className={styles['form-input-row']}>
                            <label htmlFor="fullname">Имя Фамилия</label>
                            <input id="fullname" type="text" placeholder="John Doe" onChange={handleInputChange} />
                        </div>
                        <div className={styles['form-input-row']}>
                            <label htmlFor="email">Логин</label>
                            <input id="email" type="text" placeholder="example@gmail.com" onChange={handleInputChange} />
                        </div>
                        <div className={styles['form-input-row']}>
                            <label htmlFor="password">Пароль</label>
                            <input id="password" type="password" placeholder="123456" onChange={handleInputChange} />
                        </div>
                        <div className={styles['form__submit-button']} onClick={handleSubmit}>
                            Зарегистрироваться
                        </div>  
                    </div>
                    
                    
                </form>
            </div>
        </>
    );
}


export default RegisterPage;