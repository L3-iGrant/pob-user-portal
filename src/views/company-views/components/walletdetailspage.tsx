import {
    Col,
    Row,
    Modal,
    CardImg,
    ModalFooter,
    Button,
} from "reactstrap";
import { Tooltip, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import { Card } from "antd";
import styled from "styled-components";
import React, { useState } from 'react';

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledWalletDiv = styled.div`
    font-size: 12px;
    font-weight: 600;
`;

const StyledAnchor = styled.a`
    font-size: 12px;
    font-weight: 600;
    color: blue !important;
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

export const WalletDetailsPage = (props: { onClose: any; open: boolean; walletData: any }) => {
    // const footerActionButtons = () => {
    //     return (
    //         <div>
    //             <StyledActionButton>
    //                 <Button block size={"middle"} onClick={() => { }}>Cancel</Button>
    //             </StyledActionButton>
    //         </div>
    //     );
    // }

    const { walletData } = props;
    const [selectedValue, setSelectedValue] = useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    console.log({ walletData })

    return (
        <Modal backdrop="static" unmountOnClose={true} isOpen={props.open}>
            <div className="modal-content">
                <div className="modal-header model-header-style" style={headerStyle}>

                    <h3 >MY WALLET - SETTINGS</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body modal-content-text" style={{ paddingTop: "0" }}>
                    <div>
                        This is the details of your company wallet which you can use to share your credentials with any third-party.
                    </div>
                    <div>
                        <FormControlLabel
                            value="Data Source"
                            control={<Radio
                                checked={selectedValue === 'a'}
                                onChange={handleChange}
                                value="a"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                                color="default"

                            />}
                            label={<span className="modal-sub-header-text">Default Wallet (Provided by Bolagsverket)</span>}
                        />
                    </div>
                    {selectedValue === 'a' ? <div>
                        <div className="card card-body">
                            <p className="card-text-override">
                                <strong>Wallet Details</strong>
                            </p>
                            <StyledWalletDiv>
                                Agent service endpoint
                            </StyledWalletDiv>
                            <StyledWalletDiv>
                                <StyledAnchor>{walletData.AgentServiceEndpoint}</StyledAnchor>
                            </StyledWalletDiv>
                            <StyledWalletDiv>Ledger Name: {walletData.LedgerName}</StyledWalletDiv>
                            <StyledWalletDiv>Ledger URL: {walletData.LedgerURL}</StyledWalletDiv>
                        </div>
                    </div> : null}
                    <div style={{'paddingTop': '10px'}}>
                        <FormControlLabel
                            value="Data Source"
                            control={<Radio
                                checked={selectedValue === 'b'}
                                onChange={handleChange}
                                value="b"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'B' }}
                                color="default"
                            />}
                            label={<span className="modal-sub-header-text">Not Configured (Configure)</span>}
                        />
                    </div>
                    {selectedValue === 'b' ? <div>
                        <div className="card card-body">
                             <p className="card-text-override">
                                <strong>Wallet Details</strong>
                            </p>
                            <StyledWalletDiv>
                                Agent service endpoint
                            </StyledWalletDiv>
                            <StyledWalletDiv>
                                <StyledAnchor>{walletData.serviceEndpoint}</StyledAnchor>
                            </StyledWalletDiv>
                            <StyledWalletDiv>Agent label: {walletData.label}</StyledWalletDiv>
                            <StyledWalletDiv>DID: {(walletData['@type'] || '').split(';')[0]}</StyledWalletDiv>
                        </div>
                    </div> : null}
                </div>
                <ModalFooter className="modal-footer">
                    <button style={btnSz} className="btn btn-default" onClick={props.onClose}>Cancel</button>
                </ModalFooter>
            </div>
        </Modal >
    );
};

export default WalletDetailsPage;