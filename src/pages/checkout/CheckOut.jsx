import React, { useState } from 'react';
import { Checkbox, Input, Button, Form, Radio } from 'antd';
import image from '../../assets/images/image 32.svg'
import masterCardIcn from '../../assets/images/Mastercard.svg'
import nagadIcn from '../../assets/images/Nagad.svg'
import visa from '../../assets/images/Visa.svg'
import { Link } from 'react-router-dom';
import cartIcn from '../../assets/icons/Cart1.svg'

const CheckOut = ({CheckOut, setCheckOut, total, totalCartItems}) => {
    const [firstName, setFirstName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [apartmentFloor, setApartmentFloor] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [saveInfo, setSaveInfo] = useState(false);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleApartmentFloorChange = (e) => {
        setApartmentFloor(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSaveInfoChange = (e) => {
        setSaveInfo(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className=' absolute h-full z-20 animate-[slideInUp_1s] pt-[3rem] overflow-auto bg-white w-full top-0 right-0  flex justify-around sm:flex-col sm:h-fit'>
            <Form onSubmit={handleSubmit} className=' w-[40%] leading-[2.5rem] sm:m-auto sm:w-[16rem]'>
                <h1 className='text-[2rem] mb-[2rem]'>Billing Details</h1>
                <label>
                    First Name:
                    <Input type="text" value={firstName} onChange={handleFirstNameChange} />
                </label>
                <br />
                <label>
                    Company Name:
                    <Input type="text" value={companyName} onChange={handleCompanyNameChange} />
                </label>
                <br />
                <label>
                    Address:
                    <Input type="text" value={address} onChange={handleAddressChange} />
                </label>
                <br />
                <label>
                    Apartment/Floor:
                    <Input type="text" value={apartmentFloor} onChange={handleApartmentFloorChange} />
                </label>
                <br />
                <label>
                    Phone:
                    <Input type="text" value={phone} onChange={handlePhoneChange} />
                </label>
                <br />
                <label>
                    Email:
                    <Input type="text" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    <Checkbox type="checkbox" checked={saveInfo} onChange={handleSaveInfoChange} />
                     Save this inFormation for faster checkout next time
                </label>
                <br />
            </Form>

            <section className='sm:m-auto leading-[4rem]'>
                <div className=' w-[65%] border m-auto mt-[3rem] p-[0.3rem]  '>
                    <div className='flex justify-between'>
                        <p>Total Cart Items :</p>
                        <p className=' flex'>{totalCartItems}<img src={cartIcn} className='w-[1.6rem]' alt="" /></p>
                    </div> <hr />
                    <div className='flex justify-between'>
                        <p>Shipping :</p>
                        <p>free</p>
                    </div> <hr />
                    <div className='flex justify-between'>
                        <p>Total Amount :</p>
                        <p> ${total} </p>
                    </div>
                </div>
                <p>Select payment method</p>
                <div className=' mt-[2rem] flex gap-5'>
                    <Radio> Bank</Radio>
                    <img src={image} alt="" />
                    <img src={visa} alt="visa" />
                    <img src={masterCardIcn} alt="mastercard" />
                    <img src={nagadIcn} alt="" />
                </div>
                <Radio> Cash on delivery</Radio> <br />
                <Link to='/login'><Button className='m-[2rem] bg-[#380C65] text-white'> Place Order </Button> </Link> <Button className='bg-[#380C65] text-white' onClick={()=>setCheckOut(CheckOut)}>View cart</Button>
                
            </section>
        </div>
    );
};

export default CheckOut;