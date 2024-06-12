import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/reduxHooks';
import { firebaseAuthSignIn } from '@my-firebase/auth';
import { setUser } from '@redux/slices/userSlice';
import styles from './LoginPage.module.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await firebaseAuthSignIn(email, password);
    if (typeof user !== 'string') {
      dispatch(setUser(user));
      if (email === 'teacher@teacher.kz') {
        navigate('/reading-answers');
      } else if (email === 'admin@admin.kz') {
        navigate('/reading');
      }
    } else {
      setError('Login failed: ' + user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Login</div>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
