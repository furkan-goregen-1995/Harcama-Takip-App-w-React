import './Login.module.css'
import {useState} from 'react'
import React from 'react'
import { Button, Container, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email:'',
    password:'',
    showPassword:false
  })
  const {login,hata,bekliyor} = useLogin()

  const handleChange = (prop) => (event) =>{
    setValues({ ...values, [prop]: event.target.value });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    login(values.email,values.password)
    navigate('/')
  }

  const handleClickShowPassword = () =>{
    setValues(
      {...values,
      showPassword:!values.showPassword}
    )
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography sx={{mt:15,ml:5,fontWeight:'bold'}} variant='h4' color="darkslateblue">
        Giriş Yap
        </Typography>
        <FormControl fullWidth sx={{mt:5}}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <FilledInput value={values.email} onChange={handleChange('email')} id="email" label="Email"></FilledInput>
        </FormControl>
        <FormControl fullWidth sx={{mt:5}}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <FilledInput type={values.showPassword ? 'text':'password'} id="password" label="Parola" value={values.password}
           onChange={handleChange('password')} endAdornment={
             <InputAdornment position='end'>
               <IconButton arial-label="Toggle Password" onClick={handleClickShowPassword} edge='end'>
                 {values.showPassword ? <VisibilityOff/> : <Visibility/>}
               </IconButton>
             </InputAdornment>
           }></FilledInput>
        </FormControl>
        {!bekliyor && <Button type="submit" variant="outlined" color="info" size="large" sx={{mt:5}}>GİRİŞ</Button>}
        {bekliyor && <Button type="submit" variant="outlined" color="info" size="large" sx={{mt:5}}>BEKLENİYOR</Button>}
        {hata && <p>{hata}</p>}
      </form>
    </Container>
  )
} 
