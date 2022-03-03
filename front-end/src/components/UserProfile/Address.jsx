import { Box, Grid, Typography, Button, Avatar } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddressForm from './AddressForm';

const Address = (props) => {
    const { Item } = props
    const [openForm, setOpenForm] = React.useState(false)
    const { employee, errors, setEmployee, setErrors, updateAddress } = props

    const handleChange = () => {
        setOpenForm(!openForm)
    }
    return (
        <Item sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', m: 3 }} justifyContent='space-between'>
                <Box sx={{ display: 'inherit' }}>
                    <Avatar sx={{ width: 30, height: 30, backgroundColor: 'orange' }}>
                        <LocationOnIcon fontSize='small' sx={{ color: 'white' }} />
                    </Avatar>
                    <Typography sx={{ ml: 2, color: 'black' }} variant='subtitle1'>Address</Typography>
                </Box>
                {
                    openForm ?
                    ''
                        :
                        <Button variant='outlined' sx={{ borderColor: 'orange', backgroundColor: '#ffffcc' }} onClick={handleChange}>edit</Button>
                }
            </Box>
            {
                openForm ?
                    <AddressForm
                    employee={employee} 
                    errors={errors}
                    setEmployee={setEmployee}
                    setErrors={setErrors}
                    updateAddress={updateAddress}
                    handleChange={handleChange}>
                    </AddressForm>
                    :
                    <Box>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Country</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>VietNam</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>City</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>Danang</Typography>
                            </Grid>
                        </Grid>
                        <Grid container columns={{ xs: 2, md: 4 }} sx={{ mr: 3 }}>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>Postal Code</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>123456</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3 }} variant='body2'>State</Typography>
                            </Grid>
                            <Grid item xs={1} md={1} sx={{ mb: 2 }}>
                                <Typography sx={{ mx: 3, color: 'black' }} variant='body2'>-</Typography>
                            </Grid>
                        </Grid>
                    </Box>
            }
        </Item>

    )
}

export default Address