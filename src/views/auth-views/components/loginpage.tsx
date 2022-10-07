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
    font-weight: bold;
`;

export const LoginPage = () => {
    return (
        <div>
            <div className="text-center pb-2">
                <img
                    src={logo200Image}
                    className="rounded"
                    style={{ cursor: "pointer" }}
                    alt="logo"
                    onClick={() => { }}
                />
            </div>
            <Form onSubmit={() => { }} style={formStyle}>
                <FormGroup>
                    <Input
                        style={inputStyleEmail}
                        name="user_id"
                        value={''}
                        onChange={() => { }}
                        required
                    />
                    <div style={divStyle} />
                    <InputGroup>
                        <Input
                            style={inputStylePwd}
                            name="user_password"
                            value={''}
                            onChange={() => { }}
                            onKeyPress={() => { }}
                            required
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText style={inputStyleImg}>
                                <img
                                    src={nextImage}
                                    style={{ cursor: "pointer" }}
                                    alt=">>"
                                    onClick={() => { }}
                                />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
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