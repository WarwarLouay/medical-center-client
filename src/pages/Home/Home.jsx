import React from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import { Card, Col, Row } from 'react-bootstrap';
import Request from '../../apis/Request.js';
import UserNavbar from '../../Components/UserNavbar';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { FaUserAlt } from 'react-icons/fa';

const Home = ({ socket }) => {

  const request = new Request();
  const navigate = useNavigate();

  let role = sessionStorage.getItem('role');
  let doctorId = sessionStorage.getItem('user');

  React.useEffect(() => {
    if(!doctorId){
      navigate('/login');
    }
  },[doctorId, navigate]);

  const [specializations, setSpecializations] = React.useState([]);
  const [patients, setPatients] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [patientId, setPatientId] = React.useState('');

  React.useEffect(() => {

    callPage();
  }, []);

  async function callPage() {
    const response = await request.get('specializations/list');
    response.data.specializations.map(() => {
      return(
          setSpecializations(response.data.specializations)
    )
    });

    const response2 = await request.get('getAllPatients');
    response2.data.patients.map(() => {
      console.log(response2.data.patients)
      return(
          setPatients(response2.data.patients)
    )
    });

    const data = { doctorId };
    const appointmets = await request.getTakedAppointments(data);
    console.log(appointmets)
    if(appointmets.status === 201){
      setRows(
        appointmets.data.appointments.map((item) => {
          return{
            id: item._id,
            name: item.patient.full_name,
            email: item.patient.email,
            phone: item.patient.phone,
            date: item.date,
            time: item.time
          }
        })
      )
    }
  };

  const joinRoom = async (e) => {

    let patientId = e;
    const data = {patientId, doctorId};
    const response = await request.joinRoom(data);
    let room = response.data[0]._id;
    console.log(room)

    if(response) {
      socket.emit('join_room', room);
      navigate('/chat');
      sessionStorage.setItem('room', room);
    }
  };

  async function onSearch(key) {
      if(key.trim() !== ''){
        const res = await request.searchSpecialization(key.trim());
        setSpecializations(res.data.specializations);
      } else {
        callPage();
      }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 190 },
    { field: 'email', headerName: 'Email', width: 190 },
    { field: 'phone', headerName: 'Phone', width: 190 },
    { field: 'date', headerName: 'Date', width: 190 },
    { field: 'time', headerName: 'Time', width: 190 }
  ];

  return (
    <div>
      {role === 'Doctor'  && 
      <React.Fragment>
      <NavBar />
      <div className='home'>
      <Row className='col-12'>
          <Col className='col-3'>
            {patients.map((item) => {
              return (
                <div onClick={() => joinRoom(item._id)} className='listPatients'>
                  <div className='user'>
                    <FaUserAlt className='userIcon' />
                    <h6>{item.full_name}</h6>
                  </div>
                </div>
              )
            })}
          </Col>
          <Col className='col-9'>
          <Box sx={{ height: 400, width: '90%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
          </Col>
      </Row>
      </div>
      </React.Fragment>
      }
      
      {role === 'Patient' && 
    <div>
      <UserNavbar onSearch={onSearch} />

  <Row className='col-12'>
      {
        specializations.map((item) => (
        <Col className='col-3' key={item._id}>
        <Link to={`/speciality/${item._id}`}>
          <Card className='card-text'>
            <Card.Body>
              <Card.Title className='specName'>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        ))
      }
  </Row>
  
  </div>
  }
    </div>
  )
}

export default Home
