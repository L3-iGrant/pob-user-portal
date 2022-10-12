import { Drawer, Input } from 'antd';
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
import React, { useState } from 'react';
import companyService from 'services/companyService';

const { TextArea } = Input;

// const StyledActionButton = styled.div`
//     margin-bottom: 10px;
//     width: 100%;
// `;

// const StyledButton = styled(Button)`
//     border-color: #1890ff;
//     background: #1890ff;
//     background-color: #505050;
//     border-color: #505050;
// `;

const StyledTextP1 = styled.p`
    font-size: 18px;
`;


const StyledTextP3 = styled.p<{ status: boolean }>`
    font-size: 16px;
    color: green;
    color: ${p => (p.status ? 'green' : 'red')};
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

export const WalletConfigurationsPage = (props: { onClose: any; open: boolean; }) => {
    const [invitationUrl, setInvitationUrl] = useState('');
    const [acceptInvitationStatus, setAcceptInvitationStatus] = useState<boolean>(false);
    const [acceptInvitationMessage, setAcceptInvitationMessage] = useState<string>('');
    const [loadStatus, setLoadStatus] = useState<boolean>(false);

    // const footerActionButtons = () => {
    //     return (
    //         <div>
    //             <Row>
    //                 <StyledActionButton>
    //                     <Button block size={"middle"} onClick={props.onClose}>Cancel</Button>
    //                 </StyledActionButton>
    //             </Row>
    //             <Row>
    // <StyledActionButton>
    //     <StyledButton loading={loadStatus} disabled={loadStatus} type="primary" block size={"middle"} onClick={async () => {
    //         setAcceptInvitationMessage('');
    //         setLoadStatus(true);
    //         const response = await companyService.acceptInvitation(invitationUrl);
    //         if (response) {
    //             setAcceptInvitationMessage('Connection successful');
    //             setAcceptInvitationStatus(true);
    //         } else {
    //             setAcceptInvitationMessage('Connection failed');
    //             setAcceptInvitationStatus(false);
    //         }
    //         setLoadStatus(false);
    //     }}>CONNECT</StyledButton>
    // </StyledActionButton>
    //             </Row>
    //         </div>
    //     );
    // }

    return (
        <Modal backdrop="static" unmountOnClose={true} isOpen={props.open}>
            <div className="modal-content">
                <div className="modal-header model-header-style" style={headerStyle}>

                    <h3>MY WALLET - CONFIGURE</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body" style={{ paddingTop: "0" }}>
                    <p className='modal-content-text'>
                        Here, you can configure your own external wallet where you can save your credentials etc.
                    </p>
                    <StyledTextP1 className='modal-header-text'>Wallet Configurations</StyledTextP1>
                    <div className='modal-sub-header-text' >Connection invitation</div>
                    <p>
                        <TextArea className='styled-textarea' rows={8} onChange={(e) => { console.log(e.target.value); setInvitationUrl(e.target.value); }} />
                    </p>
                    <StyledTextP3 status={acceptInvitationStatus}>{acceptInvitationMessage}</StyledTextP3>
                </div>
                <ModalFooter className="modal-footer">

                    <button style={btnSz} className="btn btn-default" onClick={props.onClose}>Cancel</button>

                    <button
                        style={btnSz}
                        className="btn btn-default"
                        onClick={async () => {
                            setAcceptInvitationMessage('');
                            setLoadStatus(true);
                            const response = await companyService.acceptInvitation(invitationUrl);
                            if (response) {
                                setAcceptInvitationMessage('Connection successful');
                                setAcceptInvitationStatus(true);
                            } else {
                                setAcceptInvitationMessage('Connection failed');
                                setAcceptInvitationStatus(false);
                            }
                            setLoadStatus(false);
                        }}
                    >Submit</button>

                </ModalFooter>
            </div>
        </Modal >
    );
};

export default WalletConfigurationsPage;