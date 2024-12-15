import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import authService from "services/authService";
import '../../../../styles/components/login.css';
import loginIcon from '../../../../assets/img/login/arrow.png';
import defaultLogo from '../../../../assets/img/icons/pob_logo_01.png';
import { antIcon } from "../graphic/antIcon";
import { Logo } from '../graphic/Logo';
import { Form, Input, Checkbox, Divider, Spin, Button } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../../../../localization/i18n';
import LanguageSelector from "../../../../localization/languageselector/menu";
import { getAuthTokenFromLocalStorage } from 'utils/localStorage';
import { doLogin, keycloak } from 'services/keycloakService';
import protectionLogo from '../../../../assets/img/icons/protection.png';

const StyledLink = styled(Link)`
    color: #40a9ff;
    font-size: 14px;
`;

const PasskeyIcon = () => (
    <svg id="icon-passkey" xmlns="http://www.w3.org/2000/svg" viewBox="3 1.5 19.5 19" width="18" height="18" style={{ marginRight: '8px' }}>
        <g id="icon-passkey-all">
            <circle id="icon-passkey-head" cx="10.5" cy="6" r="4.5"></circle>
            <path id="icon-passkey-key" d="M22.5,10.5a3.5,3.5,0,1,0-5,3.15V19L19,20.5,21.5,18,20,16.5,21.5,15l-1.24-1.24A3.5,3.5,0,0,0,22.5,10.5Zm-3.5,0a1,1,0,1,1,1-1A1,1,0,0,1,19,10.5Z"></path>
            <path id="icon-passkey-body" d="M14.44,12.52A6,6,0,0,0,12,12H9a6,6,0,0,0-6,6v2H16V14.49A5.16,5.16,0,0,1,14.44,12.52Z"></path>
        </g>
    </svg>
);

const StyledKeycloakButton = styled(Button)`
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
`;

export const LoginPage = () => {
    const history = useHistory();
    const [loginLoaderState, setLoginLoaderState] = useState(false);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [loginMessage, setLoginMessage] = useState<any>('');
    const { t, i18n } = useTranslation();
    useEffect(() => {

        let authToken: string | null = getAuthTokenFromLocalStorage();
        if (authToken !== null) {
            history.push(`/company/`);
        }


        return () => { };
    })
    const onSignInClick = async (email: string, password: string) => {
        setLoginMessage('');
        setLoginLoaderState(true);
        const response = await authService.loginUser(email, password);
        setLoginLoaderState(false);
        if (response) {
            const responseUserType = await authService.getUserType(email);
            history.push(`/${responseUserType.toLowerCase()}/`);
        } else {
            setLoginMessage(t('Failed to login'));
        }
    }

    const handleKeycloakLogin = async () => {
        try {
            doLogin();
            const success = await authService.loginWithKeycloak();
            if (success) {
                const email = keycloak.tokenParsed?.email;
                if (email) {
                    const responseUserType = await authService.getUserType(email);
                    history.push(`/${responseUserType.toLowerCase()}/`);
                }
            }
        } catch (error) {
            console.error('Keycloak login failed:', error);
            setLoginMessage(t('Failed to login'));
        }
    };

    return (
        <div className="login-container">
            <div className='login-container-main'>
                <div className='logo'><img src={defaultLogo} alt={'logo'} /></div>
                <p className="login-title">{t('Login to MyCompany Wallet')}</p>
                <Form className="login-form">
                    <div className='login-input-group'>
                        <Form.Item>
                            <Input
                                prefix={
                                    <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                                }
                                placeholder={t('Email') || ''}
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
                                placeholder={t("Password") || ''}
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
                            {(<Checkbox defaultChecked={true}>{t("Remember me")}</Checkbox>)}
                        </div>
                    </Form.Item>
                    <Divider>{t('Or')}</Divider>

                    <Form.Item>
                        <StyledKeycloakButton
                            block
                            size="large"
                            className="keycloak-login-button"
                            onClick={handleKeycloakLogin}
                        >
                            {/* <PasskeyIcon /> */}
                            <img
                                src={protectionLogo}
                                alt="protection"
                                style={{
                                    marginRight: '8px',
                                    width: '25px',
                                    height: '25px'
                                }}
                            />
                            Sign in with EUDI Wallet
                        </StyledKeycloakButton>
                    </Form.Item>
                </Form>
            </div>
            <div className='login-footer-container'>
                <div className="login-footer">
                    <p className='copyright'>Copyright © 2023-2025 Bolagsverket, Sweden.{t('All rights reserved')}.</p>
                    <div style={{ paddingBottom: 10 }}>
                        <LanguageSelector />
                    </div>
                    <Logo />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;