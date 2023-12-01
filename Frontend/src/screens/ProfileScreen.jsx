import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify';
import Loader from '../components/Loader'
import { setCredentials } from '../slices/AuthSlice';
import { useUpdateUserMutation } from '../slices/userApiSlice'
const PROFILE_IMAGE_DIR_PATH = 'http://localhost:3001/Images/'
import cardbackground from '/landscape.jfif';
import formbackground from '/Nature.jfif';





const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState();

  const dispatch = useDispatch();


  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const [UpdateProfile, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email, image]);

  const handleImageChange = (e) => {
    e.preventDefault()
    const selectedFile = e.target.files[0]
    setImage(selectedFile)
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z\s'-]+$/
    if (!nameRegex.test(name)) {
      toast.error('Name is not valid')
      return
    }
    if (!emailRegex.test(email)) {
      toast.error("Email Not Valid")
      return
    }
    if (password !== confirmPassword) {
      toast.error("Passwords donot match");
    } else {
      try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);
        console.log(formData);
        const responseFromApiCall = await UpdateProfile(formData).unwrap();
        console.log(responseFromApiCall);
        dispatch(setCredentials({ ...responseFromApiCall }))
        toast.success('Profile Updated Succesfully')
      } catch (error) {
        console.log(error.data.message);
        toast.error("An error occured")
      }
    }
  };

  return (
    <>
      {/* User Profile Card */}
      <Card className="mb-4" style={{ backgroundImage: `url(${cardbackground})` }}>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="mr-3">
              {userInfo.profileImage && (
                <img
                  src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImage}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
              )}

            </div>
            <div>
              <Card.Title>{userInfo.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{userInfo.email}</Card.Subtitle>
            </div>
          </div>
        </Card.Body>
      </Card>
      <div style={{ backgroundImage: `url(${formbackground})` }}>
        <FormContainer>
          <h1>Update Profile</h1>
          <form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label >Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='email'>
              <Form.Label >Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='password'>
              <Form.Label >Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='confirmpassword'>
              <Form.Label >Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="mb-4">
              <input onChange={handleImageChange} type="file" name="image" />
            </div>
            {image && (
              <div>
                <p>Selected Image:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{ maxWidth: '100%', maxHeight: '150px', width: 'auto', height: 'auto' }}
                />
              </div>
            )}
            {isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </form>
        </FormContainer>
      </div>
    </>
  )
}

export default ProfileScreen