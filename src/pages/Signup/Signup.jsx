import React from 'react';
import classes from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import Button from '../../Components/Button';
import Request from '../../apis/Request.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader  } from 'react-spinners';

const Signup = () => {

    const navigate = useNavigate();
    const request = new Request();

    const [loading, setLoading] = React.useState(false);
    const [first_name, setFirst_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [city, setCity] = React.useState('');
    const [citySelected, setCitySelected] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [conPassword, setConPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const [roleSelected, setRoleSelected] = React.useState('');
    const [specialozation, setSpecialization] = React.useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = React.useState('');

    const cities = [
        { value: 'Akkar', label: 'Akkar' },
        { value: 'Baalbek', label: 'Baalbek' },
        { value: 'Beirut', label: 'Beirut' },
        { value: 'Beqaa', label: 'Beqaa' },
        { value: 'Keserwan-Jbeil', label: 'Keserwan-Jbeil' },
        { value: 'Mount Lebanon', label: 'Mount Lebanon' },
        { value: 'Nabatieh', label: 'Nabatieh' },
        { value: 'North', label: 'North' },
        { value: 'South', label: 'South' }
    ];

    const roles = [
        { value: 'Patient', label: 'Patient' },
        { value: 'Doctor', label: 'Doctor' }
    ];

    const handleRoles = selectedOption => {
        setRoleSelected(selectedOption);
        setRole(selectedOption.value);
    };

    const handleCities = selectedOption => {
        setCitySelected(selectedOption);
        setCity(selectedOption.value);
    };

    React.useEffect(() => {
      callPage();
    });

    async function callPage() {
      const specializations = await request.get('specializations/list');
      setSpecialization(specializations.data.specializations);
    };

    function handleSelectSpecialization() { 
      let arr = []
      let z = {}
      specialozation.map((e) => (
           z= {
              value : e._id,
              label : e.name
          },
          arr.push(z)
      ))
      return (
          <Select 
          className={classes.Select}
          placeholder="Select your Specialization..."
          value={selectedSpecialization}
          onChange={handleSpecialization}
          options={arr}
        />
      )
    };

    const handleSpecialization = (selectedOption) => {
      setSelectedSpecialization(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(first_name === ''){
          toast.error("Please enter first name!", { position: 'bottom-right' });
        } else if(last_name === ''){
          toast.error("Please enter last name!", { position: 'bottom-right' });
        } else if(email === '' || !email.includes('@') || !email.includes('.com')){
          toast.error("Please enter a valid email!", { position: 'bottom-right' });
        } else if(phone === ''){
          toast.error("Please enter phone number!", { position: 'bottom-right' });
        } else if(password.length < 6){
          toast.error("Password should be more than 6 charachters!", { position: 'bottom-right' });
        } else if(conPassword !== password){
          toast.error("Password mismatch!", { position: 'bottom-right' });
        } else if(citySelected.length < 0 || citySelected === '' || citySelected === null){
          toast.error("Please select your location!", { position: 'bottom-right' });
        } else if(roleSelected.length < 0 || roleSelected === '' || roleSelected === null){
          toast.error("Please select your account role!", { position: 'bottom-right' });
        } else if((roleSelected.label === 'Doctor') && (selectedSpecialization.length < 0 || selectedSpecialization === '' || selectedSpecialization === null)){
          toast.error("Please select your speciality!", { position: 'bottom-right' });
        } else {
          setLoading(true);
        const spec = selectedSpecialization.value;
        const data = { first_name, last_name, email, phone, city, role, spec, password };
        const response = await request.signup(data);
        if ( response.status === 200 && response.data.message === 'Email already exist' ) {
            toast.error("Email already exist!", { position: 'bottom-right' });
        } else if ( response.status === 200 && response.data.message === 'Phone already exist' ) {
            toast.error("Phone already exist!", { position: 'bottom-right' });
        } else {
            navigate('/login');
            toast.success("Account Created.", { position: 'bottom-right' });
        }
        setLoading(false);
        console.log(response.data.message);
      }
    };

  return (
    <div className={classes.bg}>
    <MainContainer>
      <Contents>
      <WelcomeText>
        Register
      </WelcomeText>
      <InputContainer>
        <input className={classes.Input}
               type='text'
               placeholder='First Name'
               value={first_name}
               onChange={(e)=>setFirst_name(e.target.value)} />
        <input className={classes.Input}
               type='text'
               placeholder='Last Name'
               value={last_name}
               onChange={(e)=>setLast_name(e.target.value)} />
        <input className={classes.Input}
               type='text'
               placeholder='example@domain.com'
               value={email}
               onChange={(e)=>setEmail(e.target.value)} />
        <input className={classes.Input}
               type='phone'
               placeholder='Phone'
               value={phone}
               onChange={(e)=>setPhone(e.target.value)} />
        <input className={classes.Input}
               type='password'
               placeholder='Password'
               value={password}
               onChange={(e)=>setPassword(e.target.value)} />
        <input className={classes.Input}
               type='password'
               placeholder='Confirm Password'
               value={conPassword}
               onChange={(e)=>setConPassword(e.target.value)} />
        <Select
            className={classes.Select}
            placeholder='Select City...'
            options={cities}
            value={citySelected}
            onChange={handleCities}
        />
        <br/>
        <Select
            className={classes.Select}
            placeholder='Select your Role...'
            options={roles}
            value={roleSelected}
            onChange={handleRoles}
        />
        <br/>
        {role === 'Doctor' && handleSelectSpecialization()}
      </InputContainer>
      <ButtonContainer>
        {loading && <FadeLoader color="#409DBA" />}
        {!loading && <Button content='Submit' type="submit" onClick={handleSubmit}/>}
      </ButtonContainer>
      <p className={classes.haveAccount}>
        Already have an account? <Link style={{color: '#409DBA', fontWeight: 'bold'}} to='/login'>Login</Link>
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

export default Signup
