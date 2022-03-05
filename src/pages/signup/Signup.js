import './Signup.module.css'
import {useState} from 'react'
import { useSignup } from '../../hooks/useSignup'
import React from 'react'
import { Button, Container, OutlinedInput, FormControl, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  
  const navigate = useNavigate()
  const {signup,bekliyor,hata} = useSignup()

  const [values, setValues] = useState({
    email:'',
    password:'',
    showPassword:false,
    userName:''
  })

  const handleChange = (prop) => (event) =>{
    setValues({ ...values, [prop]: event.target.value });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    signup(values.email,values.password,values.userName)
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
        Üye Ol
        </Typography>
        <FormControl fullWidth sx={{mt:5}}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <OutlinedInput value={values.email} onChange={handleChange('email')} id="email" label="Email"></OutlinedInput>
        </FormControl>
        <FormControl fullWidth sx={{mt:5}}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput type={values.showPassword ? 'text':'password'} id="password" label="Parola" value={values.password}
           onChange={handleChange('password')} endAdornment={
             <InputAdornment position='end'>
               <IconButton arial-label="Toggle Password" onClick={handleClickShowPassword} edge='end'>
                 {values.showPassword ? <VisibilityOff/> : <Visibility/>}
               </IconButton>
             </InputAdornment>
           }></OutlinedInput>
        </FormControl>
        <FormControl fullWidth sx={{my:5}}>
          <InputLabel htmlFor='user-name'>Kullanıcı ad</InputLabel>
          <OutlinedInput value={values.userName} onChange={handleChange('userName')} id="user-name" label="Kullanıcı Ad"></OutlinedInput>
        </FormControl>
        {!bekliyor && <Button type="submit" variant="contained" color="info" size="large" sx={{mt:5}}>Üye Ol</Button>}
        {bekliyor && <Button disabled type="submit" variant="contained" color="info" size="large" sx={{mt:5}}>Bekliyor</Button>}
        {hata && <p>{hata}</p>}
      </form>
    </Container>
  )
} 
