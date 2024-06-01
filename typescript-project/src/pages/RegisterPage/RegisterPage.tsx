import axios from 'axios';
import { useState } from 'react';
import { setToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';


const RegisterPage : React.FC = () => {
    const [formData, setFormData] = useState<{ first_name: string; email: string; password: string }>({
        first_name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        
        if (id === 'fullname') {
            setFormData({
                ...formData,
                first_name: value
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
            JSON.stringify(formData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if (res) {
            const { token } = res.data;
            setToken(token);
            console.log(res);
            navigate('/users');
        } else {
            console.log('error, не тот аккаунт')
        }
    }

    return (
        <>
            <div className={styles['form-container']}>
                <form>
                    <div className={styles['form-container-inner']}>
                        <div className={styles['form-input-row']}>
                            <label htmlFor="email">Логин</label>
                            <input id="email" type="text" placeholder="eve.holt@reqres.in" onChange={handleInputChange} />
                        </div>
                        <div className={styles['form-input-row']}>
                            <label htmlFor="password">Пароль</label>
                            <input id="password" type="password" placeholder="123456" onChange={handleInputChange} />
                        </div>
                        <div className={styles['form__submit-button']} onClick={handleSubmit}>
                            Войти в аккаунт
                        </div>  
                    </div>
                </form>
            </div>
        </>
    );
}


export default RegisterPage;