import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import heroBackground from '/Nature.jfif';

const Hero = () => {
    return (
        <div className='hero py-5' style={{ backgroundImage: `url(${heroBackground})`, borderRadius:'10px' }}>
            <Container  className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 shadow rounded'>
                    <h1 className='text-center mb-4'>Authentication</h1>
                    <p className='text-center mb-4'>
                        This is a boilerplate for MERN authentication that stores a JWT in
                        an HTTP-Only cookie. It also uses Redux Toolkit and the React
                        Bootstrap library
                    </p>
                    <div className='d-flex justify-content-center'>
                        <LinkContainer to='/login'>
                            <Button variant='primary' className='me-3'>
                                Sign In
                            </Button>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Button variant='secondary' >
                                Sigh Up
                            </Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Hero;