import { Card, Col, Row } from 'reactstrap';
import LoginPage from './loginpage';
import bgImage from '../../../assets/img/bg/Business_Login.jpg';

export const LandingPage = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
        }}>
            <Row
                style={{
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Col md={6} lg={4}>
                    <Card body style={{
                        backgroundColor: '#688BA9',
                        color: 'white',
                        borderRadius: '1.5rem',
                        borderWidth: 0, opacity: 0.9,
                        borderColor: '#dfdfdf',
                        padding: '2rem',
                    }}>
                        <LoginPage />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LandingPage;