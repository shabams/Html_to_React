import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import './index.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import swal from 'sweetalert';
import { newBooking, fetchBookings, getCleanerCalendar, removeCalendarDate, manageCalendar, getUsers, register, setRoomRate, getRates, setBathRoomRate, changePassword, suspendAccount, changeStatus, archiveBooking } from '../../../Actions/Cleaner';

class Cleaner extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            check: 1,
            m_c: false
        }
    }

    componentDidMount = () => {
        const { getUsers } = this.props;
        getUsers();
    }

    suspend =(i) => {
        const r = window.confirm("Are you sure? Account cannot be recovered later.");
        const { suspendAccount } = this.props;
        if (r === true && this.props.cleaners) {
            suspendAccount({username: this.props.cleaners[i].username});
        }
    }

    manageCalendar = (id, option) => {
        const { manageCalendar } = this.props;
        if(document.getElementById(`schedule` + id).classList.contains("row") &&
            document.getElementById(`schedule` + id).classList.contains("text-white") && option==1){
            console.log("ssdfsdfsdfsdfsdf");
            document.getElementById(`schedule` + id).classList.add("d-none");
            this.setState({m_c: false});
        }
        else {
            document.getElementById(`schedule` + id).classList.add("row");
            document.getElementById(`schedule` + id).classList.add("text-white");
            document.getElementById(`spin` + id).classList.add("lds-spinner");

            const data = {
                user: this.props.cleaners[id].username
            };
            this.setState({m_c: true});

            manageCalendar(data);
        }
    }

    removeCalendarDate = (id) => {
        const { removeCalendarDate } = this.props;
        removeCalendarDate(id);
    }

    _getUsers = (user, i) => {
        let manage_calendar = '';
        if (this.state.m_c === true) {
            document.getElementById(`spin` + i).classList.add("d-none");
            document.getElementById(`spin` + i).classList.add("lds-spinner");
            if (this.props.manage_calendar.length === 0) {
                ToastsStore.error('No schedule dates found!');
            } 
            else {
                manage_calendar = this.props.manage_calendar.map((m_c, id) => {
                    let color = 'text-primary';
                    return (
                        <div className="border-bottom-primary p-4 card" id={'calendar_' + id} style={{ bordeRadius: '10px', marginBottom: '1vw', wordBreak: 'break-all' }}>
                            <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Date:</span> {m_c.date}</h5><br />
                            <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">From:</span> {m_c.from}</h5><br />
                            <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">To:</span> {m_c.to}</h5><br />
                            <button id={m_c._id} onClick={() => this.removeCalendarDate(m_c._id)} className="btn btn-danger" style={{display:'inline'}}><b>Remove Date</b></button><br /><br />
                        </div>
                    )
                });
            }
        }

        return (
            <div className='p-2 mb-3 shadow border-left-primary' style={{ borderRadius: 10 }} id={i}>
                <h4 className="text-info" style={{ display:'inline', marginRight: '2vw' }}>
                    <span className="text-primary">First Name: </span>{user.first_name}
                </h4>
                <h4 className="text-info" style={{ display:'inline', marginRight: '2vw' }}>
                    <span className="text-primary">Last Name: </span>{user.last_name}</h4>
                <h4 className="text-info" style={{ display:"inline", marginRight: "2vw" }}>
                    <span className="text-primary">Username: </span>{user.username}</h4>
                <button className="btn btn-success" style={{ display: 'inline' }} onClick={() => this.manageCalendar(i, 1)}><b>MANAGE CALENDAR AVAILABILITY</b></button>
                <button className="btn btn-danger" style={{ display: 'inline' }} onClick={() => this.suspend(i)}><b>SUSPEND ACCOUNT</b></button>
                <br />

                <div id={'schedule' + i} className="row text-info">
                    <div id={"spin" + i} className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div id={"cleaner-calendar" + i} className="col-md-4 mt-5">
                        {manage_calendar}
                    </div>
                    <div className="col-md-7">
                        <h3 className="text-primary mt-2">Add new date to schedule</h3>
                        <h2 className="text-info">Choose available date:</h2>
                        <input type="date" id="datePicker${i}" style={{ width:"10vw", marginBottom: "1.5vw" }} />
                        <h2 className="text-info">Choose available time:</h2>
                        <h4 className="text-info">From</h4>
                        <select id={'from-time' + i}>
                            <option value='01:00'>01:00</option>
                            <option value='01:30'>01:30</option>
                            <option value='02:00'>02:00</option>
                            <option value='02:30'>02:30</option>
                            <option value='03:00'>03:00</option>
                            <option value='03:30'>03:30</option>
                            <option value='04:00'>04:00</option>
                            <option value='04:30'>04:30</option>
                            <option value='05:00'>05:00</option>
                            <option value='05:30'>05:30</option>
                            <option value='06:00'>06:00</option>
                            <option value='06:30'>06:30</option>
                            <option value='07:00'>07:00</option>
                            <option value='07:30'>07:30</option>
                            <option value='08:00'>08:00</option>
                            <option value='08:30'>08:30</option>
                            <option value='09:00'>09:00</option>
                            <option value='09:30'>09:30</option>
                            <option value='10:00'>10:00</option>
                            <option value='10:30'>10:30</option>
                            <option value='11:00'>11:00</option>
                            <option value='11:30'>11:30</option>
                            <option value='12:00'>12:00</option>
                            <option value='12:30'>12:30</option>
                        </select>
                        <select name="am-pm" id={'from-option' + i}>
                                <option value='AM'>AM</option>
                                <option value='PM'>PM</option>                    
                        </select>
                        <h4 className="text-info mt-3">To</h4>
                        <select id={'to-time' + i}>
                            <option value='01:00'>01:00</option>
                            <option value='01:30'>01:30</option>
                            <option value='02:00'>02:00</option>
                            <option value='02:30'>02:30</option>
                            <option value='03:00'>03:00</option>
                            <option value='03:30'>03:30</option>
                            <option value='04:00'>04:00</option>
                            <option value='04:30'>04:30</option>
                            <option value='05:00'>05:00</option>
                            <option value='05:30'>05:30</option>
                            <option value='06:00'>06:00</option>
                            <option value='06:30'>06:30</option>
                            <option value='07:00'>07:00</option>
                            <option value='07:30'>07:30</option>
                            <option value='08:00'>08:00</option>
                            <option value='08:30'>08:30</option>
                            <option value='09:00'>09:00</option>
                            <option value='09:30'>09:30</option>
                            <option value='10:00'>10:00</option>
                            <option value='10:30'>10:30</option>
                            <option value='11:00'>11:00</option>
                            <option value='11:30'>11:30</option>
                            <option value='12:00'>12:00</option>
                            <option value='12:30'>12:30</option>
                        </select>
                        <select name="am-pm" id={'to-option' + i}>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>                    
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    changeMenu = (menu_id) => {
        const { newBooking, fetchBookings, getCleanerCalendar } = this.props;
        switch (menu_id) {
            case 'new-bookings':
            {
                document.getElementById('change_password').classList.add("d-none");
                document.getElementById('my-bookings').classList.add("d-none");
                document.getElementById('schedule').classList.add("d-none");
                document.getElementById('all-bookings').className = '';
                document.getElementById('all-bookings').classList.add("container-fluid");
                document.getElementById('first_menu').classList.add("selected");
                document.getElementById('third_menu').className = '';
                document.getElementById('third_menu').classList.add("fas");
                document.getElementById('third_menu').classList.add("fa-clock");
                document.getElementById('second_menu').className = '';
                document.getElementById('second_menu').classList.add("fas");
                document.getElementById('second_menu').classList.add("fa-calendar");
                document.getElementById('fourth_menu').className = '';
                document.getElementById('fourth_menu').classList.add("fas");
                document.getElementById('fourth_menu').classList.add("fa-key");
                newBooking();
                break;
            }
            case 'my-bookings':
            {
                document.getElementById('change_password').classList.add("d-none");
                document.getElementById('all-bookings').classList.add("d-none");
                document.getElementById('schedule').classList.add("d-none");
                document.getElementById('my-bookings').className = '';
                document.getElementById('my-bookings').classList.add("container-fluid");
                document.getElementById('second_menu').classList.add("selected");
                document.getElementById('third_menu').className = '';
                document.getElementById('third_menu').classList.add("fas");
                document.getElementById('third_menu').classList.add("fa-clock");
                document.getElementById('second_menu').className = '';
                document.getElementById('second_menu').classList.add("fas");
                document.getElementById('second_menu').classList.add("fa-calendar");
                document.getElementById('fourth_menu').className = '';
                document.getElementById('fourth_menu').classList.add("fas");
                document.getElementById('fourth_menu').classList.add("fa-key");
                fetchBookings();
                break;
            }
            case 'schedule':
            {
                document.getElementById('change_password').classList.add("d-none");
                document.getElementById('my-bookings').classList.add("d-none");
                document.getElementById('all-bookings').classList.add("d-none");
                document.getElementById('schedule').className = '';
                document.getElementById('schedule').classList.add("container-fluid");
                document.getElementById('thrid_menu').classList.add("selected");
                document.getElementById('first_menu').className = '';
                document.getElementById('first_menu').classList.add("fas");
                document.getElementById('first_menu').classList.add("fa-calendar-alt");
                document.getElementById('second_menu').className = '';
                document.getElementById('second_menu').classList.add("fas");
                document.getElementById('second_menu').classList.add("fa-calendar");
                document.getElementById('fourth_menu').className = '';
                document.getElementById('fourth_menu').classList.add("fas");
                document.getElementById('fourth_menu').classList.add("fa-key");
                getCleanerCalendar();
                break;
            }
            case 'change_password':
            {
                document.getElementById('schedule').classList.add("d-none");
                document.getElementById('my-bookings').classList.add("d-none");
                document.getElementById('all-bookings').classList.add("d-none");
                document.getElementById('change_password').className = '';
                document.getElementById('change_password').classList.add("container-fluid");
                document.getElementById('fourth_menu').classList.add("selected");
                document.getElementById('first_menu').className = '';
                document.getElementById('first_menu').classList.add("fas");
                document.getElementById('first_menu').classList.add("fa-calendar-alt");
                document.getElementById('second_menu').className = '';
                document.getElementById('second_menu').classList.add("fas");
                document.getElementById('second_menu').classList.add("fa-calendar");
                document.getElementById('third_menu').className = '';
                document.getElementById('third_menu').classList.add("fas");
                document.getElementById('third_menu').classList.add("fa-clock");

                break;
            }
        }
    }

    showForm = () => {
        if (document.getElementById("user_form").classList.contains("d-none")) {
            document.getElementById("user_form").classList.remove("d-none");
        } else {
            document.getElementById("user_form").classList.add("d-none");
        }
    }

    signup = () => {
        if (!this.first_name.value || !this.last_name.value || !this.username.value || !this.email.value || !this.password.value || !this.password_confirm.value) {
            ToastsStore.error('Please fill in the required fields.');
            this.setState({ check: 0 });
        } else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.email.value))) {
            this.setState({check: 0});
            ToastsStore.error('Please correct email');
        } else if (this.password.value.length < 8) {
            this.setState({check: 0});
            ToastsStore.error('Please choose password with more than 8 characters');
        } else if (this.password.value != this.password_confirm.value)  {
            ToastsStore.error('Passwords do not match.');
            this.setState({check: 0});
        }

        if (this.state.check == 1) {
            const { register } = this.props;
            const data = {
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                username: this.username.value,
                email: this.email.value,
                password: this.password.value
            };
            register(data);
        }
    }

    isNum = (str) => {
      const n = Number(str);
      return n !== Infinity && String(n) === str && n >= 0;
    }

    setRoomRate = () => {
        if (this.room_rate.value < 0 ||!this.isNum(this.room_rate.value)) {
            ToastsStore.error('Incorrect value!!');
        } else {
            const { setRoomRate, getRates } = this.props;
            setRoomRate({ room: this.room_rate.value });
        }
    }

    setBathRoomRate = () => {
        if (this.bathroom_rate.value < 0 ||!this.isNum(this.bathroom_rate.value)) {
            ToastsStore.error('Incorrect value!!');
        } else {
            const { setRoomRate, getRates } = this.props;
            setBathRoomRate({ bathroom: this.bathroom_rate.value });
        }
    }

    changePassword = () => {
        if (this.new_password.value.length < 8) {
            ToastsStore.error('Password lenght must be bigger than 8 for security purposes.');
        } else {
            const data = {
                old_password: this.old_password.value,
                new_password: this.new_password.value,
                username: localStorage.getItem('user')
            }

            const { changePassword } = this.props;
            changePassword(data);
        }
    }

    changeStatus = (id) => {
        swal("", {
            buttons: {
                pending: {
                    text: "Pending",
                    value: "Pending",
                },
                completed: {
                    text: "Completed",
                    value: "Completed",
                },
                canceled: {
                    text: "Canceled",
                    value: "Canceled",
                },
                confirmed: {
                    text: "Confirmed",
                    value: "Confirmed",
                },
            },
        }).then((value) => {
            const { changeStatus } = this.props;
            changeStatus({id: id, status: value});
        })
    }

    archiveBooking = (id) => {
        const r = window.confirm("Are you sure? This will only hide booking for admin, user and cleaner can still see it.");
        if (r == true) {
            const { archiveBooking } = this.props;
            archiveBooking({id: id});
        }
    }

    render() {
        console.log("=============", this.props.manage_calendar);

        const cleaners = this.props.cleaners.map((cleaner, index) => {
            return this._getUsers(cleaner, index);
        });

        let fetch_booking = this.props.fetch_booking.map((m_c, id) => {
            let color = 'text-primary';
            if (m_c.status == 'Pending') {
                color = 'text-warning';
            } else if (m_c.status == 'Confirmed') {
                color = 'text-primary';
            } else if (m_c.status == 'Canceled') {
                color = 'text-danger';
            } else if (m_c.status == 'Completed') {
                color = 'text-success';
            }            
            return (
                <div className="p-4 col-md-4 mr-3 shadow card border-left-primary" id={'booking_' + id} style={{ bordeRadius: '10px', marginBottom: '2vw', wordBreak: 'break-all' }}>
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Name:</span> {m_c.name}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">State:</span> {m_c.state}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">City:</span> {m_c.city}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Address:</span> {m_c.address}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">E-mail</span> {m_c.email}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Phone No.</span> {m_c.phone_no}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Rooms:</span> {m_c.rooms}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Bathrooms:</span> {m_c.bathrooms}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Time:</span> {m_c.time}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Price:</span> {m_c.price}</h5><br />
                    <h5 className="text-primary" style={{display:'inline', marginRight: '2vw'}}><span className="text-secondary">Cleaner Appointed:</span> {m_c.cleaner_appointed}</h5><br />
                    <h5 className={color} style={{display:'inline', marginRight: '2vw'}}><span className="text-primary">Status:</span> {m_c.status}</h5><br />
                    <button id="{m_c._id}" onClick={() => this.changeStatus(m_c._id)} className="btn btn-success" style={{display:'inline'}}><b>Change Status</b></button><br /><br />
                    <button id="{m_c._id} archive" onClick={() => this.archiveBooking(m_c._id)} className="btn btn-primary" style={{display:'inline'}}><b>Archive Booking</b></button><br /><br />
                </div>
            )
        });

        return(
            <>
                <div id="wrapper">
                    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                            <div className="sidebar-brand-icon rotate-n-15">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="sidebar-brand-text mx-3">Cleaner Panel</div>
                        </a>
                        <div className="sidebar-heading">
                            Bookings Management
                        </div>
                        <hr className="sidebar-divider my-0" />

                        <li className="nav-item active">
                            <a onClick={() => this.changeMenu('new-bookings')} className="nav-link text-white" href="#">
                                <i id="first_menu" className="fas fa-users"></i>
                                <span>New Bookings</span>
                            </a>
                        </li>

                        <li className="nav-item active">
                            <a onClick={() => this.changeMenu('my-bookings')} className="nav-link" href='#'>
                                <i id="second_menu" className="fas fa-calendar"></i>
                                <span>My Bookings</span>
                            </a>
                        </li>

                        <div className="sidebar-heading">
                            Schedule Management
                        </div>
                        <hr className="sidebar-divider my-0" />

                        <li className="nav-item active">
                            <a onClick={() => this.changeMenu('schedule')} className="nav-link" href='#'>
                                <i id="third_menu" className="fas fa-clock"></i>
                                <span>Manage Calendar Availability</span>
                            </a>
                        </li>

                        <hr className="sidebar-divider" />

                        <div className="sidebar-heading">
                            Manage Account Settings
                        </div>

                        <li className="nav-item active">
                            <a onClick={() => this.changeMenu('change_password')} className="nav-link" href='#'>
                                <i id="fourth_menu" className="fas fa-key"></i>
                                <span>Change Admin Password</span>
                            </a>
                        </li>

                        <hr className="sidebar-divider" />

                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>

                    </ul>

                    <div id="content-wrapper" className="d-flex flex-column mt-4" style={{marginTop:'3vw'}}>
                        <div id="all-bookings" className="container-fluid">
                            <h1 className="text-primary">New Bookings:</h1>
                            <div id="spin1" className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="row" id="new-bookings">

                            </div>
                        </div>
                        <div id="my-bookings" className="container-fluid d-none">
                            <h1 className="text-primary">ALL BOOKINGS:</h1>
                            <div id="spin" className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <div className="row" id="bookings">

                            </div>

                        </div>
                        <div id="schedule" className="row d-none" style={{marginLeft: 25}}>
                            <h1 className="text-primary container-fluid">SCHEDULE</h1>
                            <div id="spin2" className="lds-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div id="cleaner-calendar" className="col-md-4">
                            </div>
                            <div className="col-md-7">
                                <h3 className="text-primary">Add new date to schedule</h3>
                                <h2>Choose available date:</h2>
                                <input type="date" id="datePicker" style={{width:'10vw', marginBottom: '1.5vw'}} />
                                <h2>Choose available time:</h2>
                                <h4>From</h4>
                                <select id='from-time'>
                                    <option value='01:00'>01:00</option>
                                    <option value='01:30'>01:30</option>
                                    <option value='02:00'>02:00</option>
                                    <option value='02:30'>02:30</option>
                                    <option value='03:00'>03:00</option>
                                    <option value='03:30'>03:30</option>
                                    <option value='04:00'>04:00</option>
                                    <option value='04:30'>04:30</option>
                                    <option value='05:00'>05:00</option>
                                    <option value='05:30'>05:30</option>
                                    <option value='06:00'>06:00</option>
                                    <option value='06:30'>06:30</option>
                                    <option value='07:00'>07:00</option>
                                    <option value='07:30'>07:30</option>
                                    <option value='08:00'>08:00</option>
                                    <option value='08:30'>08:30</option>
                                    <option value='09:00'>09:00</option>
                                    <option value='09:30'>09:30</option>
                                    <option value='10:00'>10:00</option>
                                    <option value='10:30'>10:30</option>
                                    <option value='11:00'>11:00</option>
                                    <option value='11:30'>11:30</option>
                                    <option value='12:00'>12:00</option>
                                    <option value='12:30'>12:30</option>
                                </select>
                                <select name="am-pc" id="from-option">
                                        <option value='AM'>AM</option>
                                        <option value='PM'>PM</option>                    
                                </select>
                                <h4>To</h4>
                                <select id='to-time'>
                                    <option value='01:00'>01:00</option>
                                    <option value='01:30'>01:30</option>
                                    <option value='02:00'>02:00</option>
                                    <option value='02:30'>02:30</option>
                                    <option value='03:00'>03:00</option>
                                    <option value='03:30'>03:30</option>
                                    <option value='04:00'>04:00</option>
                                    <option value='04:30'>04:30</option>
                                    <option value='05:00'>05:00</option>
                                    <option value='05:30'>05:30</option>
                                    <option value='06:00'>06:00</option>
                                    <option value='06:30'>06:30</option>
                                    <option value='07:00'>07:00</option>
                                    <option value='07:30'>07:30</option>
                                    <option value='08:00'>08:00</option>
                                    <option value='08:30'>08:30</option>
                                    <option value='09:00'>09:00</option>
                                    <option value='09:30'>09:30</option>
                                    <option value='10:00'>10:00</option>
                                    <option value='10:30'>10:30</option>
                                    <option value='11:00'>11:00</option>
                                    <option value='11:30'>11:30</option>
                                    <option value='12:00'>12:00</option>
                                    <option value='12:30'>12:30</option>
                                </select>
                                <select name="am-pm" id="to-option">
                                        <option value='AM'>AM</option>
                                        <option value='PM'>PM</option>                    
                                </select>
                                <br />
                                <button onclick="addScheduleDate()" className="btn btn-success mb-3 mt-3">Add Now</button>
                                <h3 className="text-primary">Add new repeating schedule date</h3>
                                <h2>Choose available day:</h2>
                                <select id="day" name="day" multiple>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                                <h2>Choose available time:</h2>
                                <h4>From</h4>
                                <select id='from-time-repeat'>
                                    <option value='01:00'>01:00</option>
                                    <option value='01:30'>01:30</option>
                                    <option value='02:00'>02:00</option>
                                    <option value='02:30'>02:30</option>
                                    <option value='03:00'>03:00</option>
                                    <option value='03:30'>03:30</option>
                                    <option value='04:00'>04:00</option>
                                    <option value='04:30'>04:30</option>
                                    <option value='05:00'>05:00</option>
                                    <option value='05:30'>05:30</option>
                                    <option value='06:00'>06:00</option>
                                    <option value='06:30'>06:30</option>
                                    <option value='07:00'>07:00</option>
                                    <option value='07:30'>07:30</option>
                                    <option value='08:00'>08:00</option>
                                    <option value='08:30'>08:30</option>
                                    <option value='09:00'>09:00</option>
                                    <option value='09:30'>09:30</option>
                                    <option value='10:00'>10:00</option>
                                    <option value='10:30'>10:30</option>
                                    <option value='11:00'>11:00</option>
                                    <option value='11:30'>11:30</option>
                                    <option value='12:00'>12:00</option>
                                    <option value='12:30'>12:30</option>
                                </select>
                                <select name="am-pm" id="from-repeat-option">
                                        <option value='AM'>AM</option>
                                        <option value='PM'>PM</option>                    
                                </select>
                                <h4>To</h4>
                                <select id='to-time-repeat'>
                                    <option value='01:00'>01:00</option>
                                    <option value='01:30'>01:30</option>
                                    <option value='02:00'>02:00</option>
                                    <option value='02:30'>02:30</option>
                                    <option value='03:00'>03:00</option>
                                    <option value='03:30'>03:30</option>
                                    <option value='04:00'>04:00</option>
                                    <option value='04:30'>04:30</option>
                                    <option value='05:00'>05:00</option>
                                    <option value='05:30'>05:30</option>
                                    <option value='06:00'>06:00</option>
                                    <option value='06:30'>06:30</option>
                                    <option value='07:00'>07:00</option>
                                    <option value='07:30'>07:30</option>
                                    <option value='08:00'>08:00</option>
                                    <option value='08:30'>08:30</option>
                                    <option value='09:00'>09:00</option>
                                    <option value='09:30'>09:30</option>
                                    <option value='10:00'>10:00</option>
                                    <option value='10:30'>10:30</option>
                                    <option value='11:00'>11:00</option>
                                    <option value='11:30'>11:30</option>
                                    <option value='12:00'>12:00</option>
                                    <option value='12:30'>12:30</option>
                                </select>
                                <select name="am-pm" id="to-repeat-option">
                                        <option value='AM'>AM</option>
                                        <option value='PM'>PM</option>                    
                                </select><br />
                                <button onclick="addScheduleRepeat()" className="btn btn-success mb-3 mt-3">Add Now</button>
                            </div>
                        </div>
                        <div id="change_password" className="container d-none">
                            <h1 className="text-secondary">Change Account password:</h1>
                            <label for="old_password"><b>Old Password</b></label><br />
                            <input type="password" id="old_password" placeholder="Old Password" ref={input => this.old_password = input} /><br />
                            <label for="new_password"><b>New Password</b></label><br />
                            <input type="password" id="new_password" placeholder="New Password" ref={input => this.new_password = input} /><br />
                            <button type="button" onclick={this.changePassword} className="btn btn-success mt-3"><b>Change Password</b></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    cleaners: state.admin.Clean_Users,
    room_rate: state.admin.room_rate,
    manage_calendar: state.admin.manage_calendar,
    fetch_booking: state.admin.fetch_booking
});

const mapDispatchToProps = dispatch => {
  return {
    getRates: () => getRates(dispatch),
  }
}

export default withRouter(connect(mapStateToProps, { newBooking, fetchBookings, getCleanerCalendar, getRates, changeStatus, suspendAccount, getUsers, register, setRoomRate, setBathRoomRate, changePassword, manageCalendar, archiveBooking, removeCalendarDate })(Cleaner));