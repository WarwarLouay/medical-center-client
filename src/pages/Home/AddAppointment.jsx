import React from 'react';
import Navbar from '../../Components/Navbar/NavBar';
import { Col, Row } from 'react-bootstrap';
import Button from '../../Components/Button';
import Request from '../../apis/Request.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const AddAppoinmtent = () => {

  const request = new Request();
  const navigate = useNavigate();

  let doctorId = sessionStorage.getItem('user');

  React.useEffect(() => {
    if(!doctorId){
      navigate('/login');
    }
  },[doctorId, navigate]);

  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'time', headerName: 'Time', width: 200 },
    { field: 'available', headerName: 'Available', width: 200 }
  ];
  
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    callPage();
  }, [callPage()]);

  async function callPage() {
    const data = { doctorId };
    const response = await request.getAppointments(data);
    if(response.status === 201){

      setRows(
        response.data.appointments.map((item) => {
          return{
            id: item._id,
            date: item.date,
            time: item.time,
            available: item.isValid
          }
        })
      )
    }
  };

  const handleDelete = async () => {
    try {
      const data = { selectedRows };
      const response = await request.deleteAppointment(data);
      console.log(response);
      if(response.status === 201) {
        toast.success("Appointments Deleted.", { position: 'bottom-right' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if(date === '') {
      toast.error("Please Select Date", { position: 'bottom-right' });
    } else if (time === '') {
      toast.error("Please Select Time", { position: 'bottom-right' });
    } else {
    try {
      const data = { date, time, doctorId };
      const response = await request.addAppointment(data);
      if(response.status === 200 && response.data.message === 'This Appointment already added') {
        toast.error("This Appointment already added", { position: 'bottom-right' });
      } else {
        toast.success("Appointment Added.", { position: 'bottom-right' });
        setDate('');
        setTime('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  return (
    <div>
    <Navbar />
    <div className='products'>
      <Row className='col-12'>
        <Col className='col-6'>
          <label>Add Appointment:</label>
          <input type='date'
                 value={date}
                 onChange={(e) => setDate(e.target.value)} />
          <input type='time'
                 value={time}
                 onChange={(e) => setTime(e.target.value)} />
          <Button content='Save'
                  onClick={handleSave} />
        </Col>
        <Col className='col-6'>
        <Box sx={{ height: 400, width: '100%' }}>
        {selectedRows.length > 0 && <AiFillDelete onClick={handleDelete} className='deleteIcon' />}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {setSelectedRows(ids)}}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
        </Col>
      </Row>
    </div>
    <ToastContainer />
    </div>
  )
}

export default AddAppoinmtent
