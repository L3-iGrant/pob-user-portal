import {
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
} from "reactstrap";
import nextImage from "../../../assets/img/logo/next2.png";
import logo200Image from "../../../assets/img/logo/iGrant_210_55_BW.svg";
import styled from "styled-components";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import authService from "services/authService";

const formStyle = {
    padding: "2rem",
};

const divStyle = {
    height: 0,
};

const inputStyleImg = {
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 1.2,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 0,
    backgroundColor: "white",
};

const inputStyleEmail = {
    borderWidth: 1.2,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 1.2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    outline: "none",
    fontSize: "14px",
    boxShadow: "none",
};

const inputStylePwd = {
    borderTopWidth: 0,
    borderBottomWidth: 1.2,
    borderLeftWidth: 1.2,
    borderRightWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 0,
    fontSize: "14px",
    outline: "none",
    boxShadow: "none",
};

const textStyle = {
    color: "white",
    fontWeight: 400,
    fontSize: "14px",
};

const StyledLink = styled.a`
    color: white;
    font-size: 14px;
`;

export const LoginPage = () => {
    const history = useHistory();
    const [loginState, setLoginState] = useState(true);
    const [loginLoaderState, setLoginLoaderState] = useState(false);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [loginMessage, setLoginMessage] = useState<string>('');

    const onSignInClick = async (email: string, password: string) => {
        setLoginState(true);
        setLoginLoaderState(true);
        const response = await authService.loginUser(email, password);
        // console.log(response);
        setLoginState(response);
        setLoginLoaderState(false);
        if (response) {
            const responseUserType = await authService.getUserType(email);
            // console.log(responseUserType);
            history.push(`/${responseUserType.toLowerCase()}/`);
        } else {
            setLoginMessage('Failed to login');
        }
    }

    return (
        <div>
            <div className="text-center pb-2">
                <img
                    src={logo200Image}
                    className="rounded"
                    style={{ cursor: "pointer", width: "20vw" }}
                    alt="logo"
                />
            </div>
            <Form onSubmit={() => { }} style={formStyle}>
                <FormGroup>
                    <Input
                        style={inputStyleEmail}
                        name="user_id"
                        onChange={(e: any) => { setEmail(e.target.value); }}
                        required
                    />
                    <div style={divStyle} />
                    <InputGroup>
                        <Input
                            style={inputStylePwd}
                            name="user_password"
                            onChange={(e: any) => { setPassword(e.target.value); }}
                            onKeyPress={() => { }}
                            required
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText style={inputStyleImg}>
                                <img
                                    src={nextImage}
                                    style={{ cursor: "pointer" }}
                                    alt=">>"
                                    onClick={() => { onSignInClick(email as string, password as string); }}
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <div>{loginMessage}</div>
                <div className="col text-center pt-1">
                    <pre>
                        <Label style={{ height: "42px", fontSize: "12px" }}></Label>
                    </pre>
                </div>
                <hr style={{ backgroundColor: "white" }} />
                <div className="text-center pt-1">
                    <h6>
                        <div style={textStyle}>
                            {" "}
                            Not an iGrant.io business? &nbsp;
                            <StyledLink href={"/company/"}>
                                Enroll Now
                            </StyledLink>
                        </div>
                    </h6></div>
            </Form>
        </div>
    );
}

export default LoginPage;