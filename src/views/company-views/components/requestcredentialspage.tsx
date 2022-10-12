import {
    Card,
    Col,
    Row,
    Modal,
    CardImg,
    ModalFooter,
    Button,
} from "reactstrap";
import styled from "styled-components";

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledButton = styled(Button)`
    border-color: #1890ff;
    background: #1890ff;
    background-color: #505050;
    border-color: #505050;
`;

const StyledLink = styled.a`
    color: #40a9ff;
    font-weght: bold;
`;

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

export const RequestCredentialsPage = (props: { onClose: any; open: boolean; }) => {
    /* const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => { }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton type="primary" block size={"middle"} onClick={() => { }}>Submit</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    } */

    return (
        <Modal backdrop="static" unmountOnClose={true} isOpen={props.open}>
            <div className="modal-content">
                <div className="modal-header model-header-style" style={headerStyle}>

                    <h3>REQUEST CREDENTIALS</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body" style={{ paddingTop: "0" }}>
                    {/* <Drawer title="REQUEST CREDENTIALS" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}> */}
                    <p className="modal-content-text">
                        You are about to request credentials from Bolagsverket, Sweden. Confirm the details below and click submit the request to issue credentials.
                    </p>
                    <p className="modal-content-text">
                        Requested credential: Certificate of registration and register extract
                    </p>
                    <p className="modal-content-text">Once submitted, the requested credentials will be issued to the <StyledLink href="/company/">configured wallet</StyledLink>.</p>
                </div>
                <ModalFooter className="modal-footer">

                    <button style={btnSz} className="btn btn-default" onClick={props.onClose}>Cancel</button>

                    <button
                        style={btnSz}
                        className="btn btn-default"
                        onClick={() => { }}
                    >Submit</button>

                </ModalFooter>
            </div>
        </Modal >
    );
};

export default RequestCredentialsPage;