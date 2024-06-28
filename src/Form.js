import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    startdate: null, 
    time: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    phone: '',
    startdate: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      startdate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();
  };

  const validateInputs = () => {
    const { username, email, phone, startdate, time } = formData;
    const newErrors = {};

    if (username.trim() === '') {
      newErrors.username = 'ФИО является обязательным полем';
    }

    if (!validateUsername(username)){
        newErrors.username = 'Введите ФИО кириллицей'
    }

    if (!validateEmail(email) && !validatePhone(phone)) { 
      newErrors.email = 'Пожалуйста введите верный email'; 
      newErrors.phone = 'Пожалуйста введите верный номер телефона';
    } else {
      if (!validateEmail(email)) {
        newErrors.email = 'Пожалуйста введите верный email';
      }
      if (!validatePhone(phone)) {
        newErrors.phone = 'Пожалуйста введите верный номер телефона';
      } 
    }

    if (!startdate || startdate < new Date()) {
      newErrors.startdate = 'Пожалуйста, выберите дату после сегодняшнего дня';
    }

    if (!/^\d+$/.test(time)) {
      newErrors.time = 'Пожалуйста, введите целое число';
    }

    setFormErrors(newErrors);

   
    if (Object.keys(newErrors).length === 0) {
        let notificationMessage = 'Форма успешно отправлена: ';
    
        Object.entries(formData).forEach(([key, value]) => {
            notificationMessage += `${key}: ${value}; `; 
        });
    
        let notificationElement = document.getElementById('notification');
        notificationElement.innerHTML = notificationMessage;
    }

    
    
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  };

  const validatePhone = (phone) => {
    return /^\d{11}$/.test(phone);
  };

  const validateUsername = (username) => {
    return /[а-яА-ЯЁё]+([а-яА-ЯЁё]+)?\s[а-яА-ЯЁё]+(-[а-яА-ЯЁё]+)?/.test(username);
  }

  return (
<div className="container">
    <form onSubmit={handleSubmit} id="form">
    <h1 className='form_name'>Бронирование</h1>
    <div className={`input-group ${formErrors.username ? 'error' : ''}`}>
        <label htmlFor="username">ФИО:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="error">{formErrors.username}</div>
      </div>
      <div className={`input-group ${formErrors.email ? 'error' : ''}`}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error">{formErrors.email}</div>
      </div>
      <div className={`input-group ${formErrors.phone ? 'error' : ''}`}>
        <label htmlFor="phone">Телефон:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="error">{formErrors.phone}</div>
      </div>
      <div className={`input-group ${formErrors.startdate ? 'error' : ''}`}>
        <label htmlFor="startdate">Дата:</label>
        <DatePicker
          id="startdate"
          selected={formData.startdate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy" 
          minDate={new Date()}
        />
        <div className="error">{formErrors.startdate}</div>
      </div>
      <div className={`input-group ${formErrors.time ? 'error' : ''}`}>
        <label htmlFor="time">Время:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <div className="error">{formErrors.time}</div>
      </div>
      <button type="submit">Отправить</button>
      <div id="notification"></div>
    </form>
</div>
  );
};


export default Form;