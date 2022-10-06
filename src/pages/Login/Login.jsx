import React from 'react';
import classes from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../Components/Button';
import Request from '../../apis/Request.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader  } from 'react-spinners';
import { isLogin, notLogin } from '../../Redux/Type.js';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {

  const isLog = useSelector(state => state.Auth.loggedIn);
  console.log(isLog);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = new Request();

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { email, password };
      const response = await request.login(data);
      if(response.status === 200 && response.data.message === 'invalid'){
        toast.error('Invalid email or password', { position: 'bottom-right' });
      } else {
        sessionStorage.setItem("role", response.data.user.role);
        sessionStorage.setItem("user", response.data.user._id);
        dispatch({ type:  isLogin});
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch({ type: notLogin });
    }
  };

  return (
    <div className={classes.bg}>
    <MainContainer>
      <Contents>
      <WelcomeText>
        Login
      </WelcomeText>
      <InputContainer>
        <input className={classes.Input}
               type='text'
               placeholder='example@domain.com'
               value={email}
               onChange={(e)=>setEmail(e.target.value)} />
        <input className={classes.Input}
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e)=>setPassword(e.target.value)} />
      </InputContainer>
      <ButtonContainer>
        {loading && <FadeLoader color="#409DBA" />}
        {!loading && <Button content='Log In' type="submit" onClick={handleLogin}/>}
      </ButtonContainer>
      <p className={classes.interested}>
        Don't have an account? <Link style={{color: '#409DBA', fontWeight: 'bold'}} to='/signup'>Sign Up</Link>
      </p>
      </Contents>
    </MainContainer>
    <ToastContainer />
    </div>
  )
}

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    height: 80vh;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    overflow: auto;

    @media only screen and ( min-width: 320px ) {
      width: 80vw;
      height: 90vh;
      hr{
        margin-bottom: 0.3rem;
      }
      h4{
        font-size: small;
      }
    }

    @media only screen and ( min-width: 360px ) {
      width: 80vw;
      height: 90vh;
      h4{
        font-size: small;
      }
    }

    @media only screen and ( min-width: 411px ) {
      width: 80vw;
      height: 90vh;
    }

    @media only screen and ( min-width: 768px ) {
      width: 80vw;
      height: 80vh;
    }

    @media only screen and ( min-width: 1023px ) {
      width: 70vw;
      height: 50vh;
    }

    @media only screen and ( min-width: 1024px ) {
      width: 30vw;
      height: 80vh;
    }
`;

const Contents = styled.div`
    position: absolute;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: 1s;
`;

const WelcomeText = styled.h2`
    margin: 3rem 0 2rem 0;
    color: black;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 100%;
`;

const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Login
