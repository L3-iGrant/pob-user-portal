// import { Drawer, Alert, Row, Table } from 'antd';
import {
    Modal,
    CardImg,
    ModalFooter,
} from "reactstrap";
import { Card as CardReact, CardBody, CardTitle, CardText } from "reactstrap";
import { Card, Row, Col } from "antd";
import styled from "styled-components";
import credentialLogo from '../../../assets/img/icons/bolagsverket.png';

const colDispStyle = {
    fontSize: "14px",
    cursor: "pointer",
    padding: ".35rem",
    borderWidth: "1px solid !important",
    borderColor: "#dee2e6",
};

const headerDispStyle = {
    backgroundColor: "#f0f0f0",
    padding: ".35rem",
    fontWeight: "bold",
    border: "solid",
    borderWidth: "0px 1px 3px 1px",
    borderColor: "#dee2e6",
};

const headerStyle = {
    fontSize: "16px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
};

const btnSz = {
    height: "1.8rem",
    width: "10rem",
    padding: 0,
    fontSize: "12px",
};

const StyledAlert = styled(Card)`
    background-color: white;
    border-color: #ddd;
    font-size: 12px;
    font-weight: 400;
    margin-top: 10px;
    height: 90%;
`;

const StyledEmptyCredentialsMessage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const columns = [
    {
        dataField: "attribute",
        text: "Attribute",
        headerStyle: { ...headerDispStyle, width: "50%" },
        style: colDispStyle,
    },
    {
        dataField: "value",
        text: "Value",
        headerStyle: { ...headerDispStyle, width: "50%" },
        style: colDispStyle,
    },
]

export const ViewCredentialsPage = (props: { onClose: any; open: boolean; showViewSelectedCredentialDrawer: any; }) => {

    const data: any[] = [
        {
            key: '1',
            attribute: 'Entity name effective',
            value: 'December 10, 1994',
        },
        {
            key: '2',
            attribute: 'Registration date',
            value: '1999',
        },
        {
            key: '3',
            attribute: 'Entity status effective',
            value: 'August 12, 2022',
        },
        {
            key: '4',
            attribute: 'Expiry date',
            value: 'August 11, 2023',
        }
    ];

    return (
        <Modal backdrop="static" unmountOnClose={true} isOpen={props.open}>
            <div className="modal-content">
                <div className="modal-header" style={headerStyle}>

                    <h3 style={{ marginBottom: "0px", fontWeight: "bold" }}>VIEW CREDENTIALS</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body-without-top-padding" style={{ paddingTop: "0" }}>
                    <div>
                        Below is the list of available credentials in your wallet.
                    </div>
                    <StyledAlert>
                        <Row>
                            <CardReact onClick={() => {
                                // props.onClose();
                                props.showViewSelectedCredentialDrawer();
                            }} style={{ minHeight: "100px", minWidth: "100%", borderRadius: "40px", borderColor: "#505050" }}>
                                <CardBody>
                                    <Row style={{ 'alignItems': 'center', height: '38px' }}>
                                        <Col span={16}>
                                            <CardTitle className="mb-0">CERTIFICATE OF REGISTRATION</CardTitle>
                                        </Col>
                                        <Col span={8}>
                                            <img src={credentialLogo} style={{ width: "50px" }} alt="credential" />
                                        </Col>
                                    </Row>
                                    <CardText style={{ fontSize: "14px", marginTop: "10px", marginBottom: "0px" }}>
                                        Bygg AB, Sweden
                                    </CardText>
                                    <CardText style={{ fontSize: "14px" }}>
                                        Issued by: Bolagsverket, Sweden
                                    </CardText>
                                </CardBody>
                            </CardReact>
                        </Row>
                        {/* <StyledEmptyCredentialsMessage>Empty, no credentials existing</StyledEmptyCredentialsMessage> */}
                    </StyledAlert>
                </div>
                <ModalFooter className="modal-footer">
                    <button style={btnSz} className="btn btn-default" onClick={props.onClose}>Cancel</button>
                </ModalFooter>
            </div>
        </Modal >
    );
};

export default ViewCredentialsPage;