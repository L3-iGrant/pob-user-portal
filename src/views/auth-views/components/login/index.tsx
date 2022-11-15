import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import authService from "services/authService";
import '../../../../styles/components/login.css';
import loginIcon from '../../../../assets/img/login/arrow.png';
import defaultLogo from '../../../../assets/img/icons/pob_logo.png';
import { antIcon } from "../graphic/antIcon";
import { Logo } from '../graphic/Logo';
import { Form, Input, Checkbox, Divider, Spin } from "antd";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    color: #40a9ff;
    font-size: 14px;
`;

export const LoginPage = () => {
    const history = useHistory();
    const [loginLoaderState, setLoginLoaderState] = useState(false);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [loginMessage, setLoginMessage] = useState<string>('');

    const onSignInClick = async (email: string, password: string) => {
        setLoginMessage('');
        setLoginLoaderState(true);
        const response = await authService.loginUser(email, password);
        setLoginLoaderState(false);
        if (response) {
            const responseUserType = await authService.getUserType(email);
            history.push(`/${responseUserType.toLowerCase()}/`);
        } else {
            setLoginMessage('Failed to login');
        }
    }

    return (
        <div className="login-container">
            <div className='login-container-main'>
                <div className='logo'><img src={defaultLogo} alt={'logo'} /></div>
                <p className="login-title">{"Login to MyCompany Wallet"}</p>
                <Form className="login-form">
                    <div className='login-input-group'>
                        <Form.Item>
                            <Input
                                prefix={
                                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                                }
                                placeholder={"Email"}
                                size="large"
                                className="username-input"
                                onChange={(e: any) => { setEmail(e.target.value); }}
                            />
                        </Form.Item>
                        <Divider className='login-divider-m0' />
                        <Form.Item>
                            <Input
                                prefix={
                                    <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                                }
                                type="password"
                                placeholder={"Password"}
                                size="large"
                                className="password-input"
                                suffix={
                                    loginLoaderState ? (
                                        <Spin className='login-btn' indicator={antIcon} />
                                    ) : (
                                        <div><img className='login-btn right-arrow' onClick={() => { onSignInClick(email as string, password as string); }}
                                            src={loginIcon} alt={'login_logo'} /></div>
                                    )
                                }
                                onChange={(e: any) => { setPassword(e.target.value); }}
                            />
                        </Form.Item>
                    </div>
                    {loginMessage !== '' && <div className='login-error'>{loginMessage}</div>}
                    <Form.Item>
                        <div className="login-checkbox">
                            {(<Checkbox defaultChecked={true}>{"Remember me"}</Checkbox>)}
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div className='login-footer-container'>
                <div className="login-footer">
                    <p className='copyright'> Copyright © 2023-2025 Bolagsverket, Sweden. All rights reserved.</p>
                    <Logo />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;