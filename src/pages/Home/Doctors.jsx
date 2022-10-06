import React from 'react';
import UserNavbar from '../../Components/UserNavbar';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import Request from '../../apis/Request.js';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from '../../Components/Checkout/Checkout';
import { loadStripe } from '@stripe/stripe-js';
import { FadeLoader  } from 'react-spinners';

const Doctors = () => {

  const stripePromise = loadStripe('pk_test_51LolXpGcg3WoyYuNTUx8gRCZReulNvV1W');

    const request = new Request();
    const params = useParams();
    const navigate = useNavigate();

    const patientId = sessionStorage.getItem('user');

    if(patientId.length < 0 || patientId === '' || patientId === null){
        navigate('/login');
      }

    const [loading, setLoading] = React.useState(false);
    const [Doctors, setDoctors] = React.useState([]);
    const [smShow, setSmShow] = React.useState(false);
    const [doctorId, setDoctorId] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState('');
    const [validTime, setValidTime] = React.useState([]);
    const [selectedTime, setSelectedTime] = React.useState('');

    React.useEffect(() => {
        callPage();
      });

      async function callPage() {
        const response = await request.getById(params.id);
        setDoctors(response.data.doctors);
      };

      const handleSelectedateChange = async (eDate) => {
        setSelectedDate(eDate);
        const data = { eDate, doctorId };
        const time = await request.getTime(data);
        setValidTime(time.data.times);
      };

      function handleSelectTime() {
        let arr = []
        let z = {}
        validTime.map((e) => (
             z= {
                value : e._id,
                label : e.time
            },
            arr.push(z)
        ))
        return (
            <Select 
            placeholder="Select Time..."
            value={selectedTime}
            onChange={(e)=>handleTime(e)}
            options={arr}
          />
        )
      };

      const handleTime = async (e) => {
        setSelectedTime(e);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        if(selectedDate === '') {
            toast.error("Please Select Date", { position: 'bottom-right' });
          } else if (selectedTime === '') {
            toast.error("Please Select Time", { position: 'bottom-right' });
          } else {
          try {
            const selectedTimeLabel = selectedTime.label
            const isValid = false;
            const data = { doctorId, patientId, isValid, selectedDate, selectedTimeLabel };
            const response = await request.takeAppointment(data);
            console.log(response);
            toast.success("Appointment Taked.", { position: 'bottom-right' });
            setSmShow(false);
            setSelectedDate('');
            setSelectedTime('');
            setValidTime([])
          } catch (error) {
            console.log(error);
          }
        }
        setLoading(false);
      };

  return (
    <div>
        <UserNavbar />
        {Doctors.length <= 0 && <h1 className='noAvailable'>No Doctors Available...</h1>}
        <Row className='col-12'>
            { Doctors.length > 0 &&
            Doctors.map((item) => (
            <Col className='col-3' key={item._id}>
                <Card className='card-text'>
                    <Card.Body>
                        <Card.Title className='title'>{item.full_name}</Card.Title>
                        <Card.Title className='location' style={{fontSize: '15px'}}>{item.city}</Card.Title>
                        <Card.Title className='location' style={{fontSize: '15px'}}>{item.phone}</Card.Title>
                        <Button onClick={()=>{setSmShow(true); setDoctorId(item._id)}}>Take Appointment</Button>
                    </Card.Body>
                </Card>
            </Col>
            ))
            }
        </Row>

        <Modal
        size="sm"
        show={smShow}
        onHide={() => {setSmShow(false); setSelectedDate(''); setSelectedTime(''); setValidTime([])}}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Take Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type='date'
        style={{width: '100%', height: '35px'}}
        value={selectedDate}
        onChange={(e) => handleSelectedateChange(e.target.value)} />
            <br/> <br/>
            {handleSelectTime()}
            <br/>
            <p><b>Price: </b>20$</p>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
        </Modal.Body>
        <Modal.Footer>
            {loading && <FadeLoader color="#409DBA" />}
            {!loading && <Button onClick={handleSubmit}>Submit</Button>}
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default Doctors
