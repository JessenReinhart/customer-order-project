import { useState } from 'react';
import { LoginData, fetchLoginData } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

export function useFetchLoginData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
    const { setLogin } = useAuth()

    const login = async (username: string, password: string) => {
        try {
            setLoading(true);
            setError('');
            const fetchedLoginData = await fetchLoginData();
            if (username === fetchedLoginData.username && password === fetchedLoginData.password) {
                setError('');
                setLogin(username, password);
                return true;
            } else {
                setError('Invalid credentials');
                return false;
            }
        } catch (error) {
            setError('Error during login');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginData, setLoginData, login };
}
