import { Col, Row, Card, Input, Avatar, Layout, Divider, Space, Grid } from 'antd';
import { Button } from 'reactstrap';
import { SettingFilled } from '@ant-design/icons';
import FooterView from "views/components/footer";
import credentialLogo from '../../../assets/img/icons/bolagsverket.png';
import styled from "styled-components";
import { Tooltip, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from "@material-ui/core";
import { BootstrapTable, TableHeaderColumn, } from 'react-bootstrap-table';
import React, { useRef, useState } from 'react';

const StyledCompanyHeader = styled.div`
    font-size: 40px;
    text-align: center;
`;

const StyledHeaderCardDefault = styled(Card)`
    .ant-card-body {
        padding-top: 0px;
        padding-bottom: 8px;
        padding-left: 8px;
    }
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledHeaderText = styled.div`
    font-size: 40px;
    text-align: left;
    margin-right: 10px;
`;

const StyledSubHeaderText = styled.div`
    font-size: 25px;
    text-align: left;
    margin-right: 10px;
`;

const StyledBootStrapTable = styled(BootstrapTable)`
    .table {
        margin-bottom: 0px;
    }
`

export const LandingPage = () => {
    const [selectedValue, setSelectedValue] = useState('a');

    const renderPaginationPanel = (props: any) => {
        return (
            <Row className="w-100 h-100 mt-1 m-0 p-0">
                <Col span={12} style={{ top: 'auto', bottom: '100%', paddingLeft: '15px' }}  >{props.components.sizePerPageDropdown}</Col>
                <Col span={12} className="d-inline-flex flex-row  justify-content-end" style={{ paddingRight: '15px' }}> {props.components.pageList} </Col>
            </Row>
        );
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const cellButton = (cell: any, row: any, enumObject: any, rowIndex: any) => {
        return (
            <div className="mx-2 my-2">
                <Button
                    outline
                    className="btn btn-default w-100"
                    onClick={() => { }}
                >
                    Issue
                </Button>
            </div>
        )
    }

    const data: any[] = [
        {
            company_name: 'Bygg AB, Sweden',
            data_requested: '20-Sep-2022 15:17 CET',
            requested_credentials: 'Company registration credentials',
            issue_status: 'New Request'
        },
        {
            company_name: 'ABC AB, Sweden',
            data_requested: '',
            requested_credentials: '',
            issue_status: ''
        },
        {
            company_name: 'Logica AB, Sweden',
            data_requested: '',
            requested_credentials: '',
            issue_status: ''
        },
        {
            company_name: 'Roman AB, Sweden',
            data_requested: '',
            requested_credentials: '',
            issue_status: ''
        }
    ];

    return (
        <div style={{ backgroundColor: "#F5F5F5", height: "100%" }}>
            <div style={{ maxWidth: '1080px', margin: 'auto' }}>
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={1}>
                        <img src={credentialLogo} style={{ width: "50px" }} alt="credential" />
                    </Col>
                    <Col span={6}>
                        <StyledCompanyHeader>Bolagsverket</StyledCompanyHeader>
                    </Col>
                    <Col span={16} offset={1}>
                        <StyledHeaderCardDefault style={{
                            marginBottom: "20px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "black"
                        }}>
                            <StyledHeaderText>Company Credential Requests</StyledHeaderText>
                        </StyledHeaderCardDefault></Col>
                </Row>
                <Row>
                    <Col span={5}>
                        <StyledSubHeaderText>ISSUE REQUESTS</StyledSubHeaderText>
                    </Col>
                    <Col span={1} style={{ marginTop: '5px' }}>
                        <SettingFilled style={{ fontSize: '30px' }} />
                    </Col>
                    <Col span={12} offset={6} style={{ textAlign: 'right' }}>
                        <FormControl>
                            <RadioGroup
                                row
                                name="request_selector"
                                defaultValue="top"
                            >
                                <FormControlLabel value="end" control={<Radio checked={selectedValue === 'a'} onChange={handleChange} value="a" color="default" />} label={<span style={{ fontSize: '20px' }}>All</span>} />
                                <FormControlLabel value="end" control={<Radio checked={selectedValue === 'b'} onChange={handleChange} value="b" color="default" />} label={<span style={{ fontSize: '20px' }}>Issued</span>} />
                                <FormControlLabel value="end" control={<Radio checked={selectedValue === 'c'} onChange={handleChange} value="c" color="default" />} label={<span style={{ fontSize: '20px' }}>New Requests</span>} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <StyledBootStrapTable data={data} striped={false} hover={true} search={false} options={{
                            exportCSVText: 'Download',
                            hideSizePerPage: false, //hide the dropdown for sizePerPage
                            alwaysShowAllBtns: true, // Always show next and previous button
                            withFirstAndLast: false, // Hide the going to First and Last page button
                            paginationPanel: renderPaginationPanel,
                            prePage: 'Prev', // Previous page button text
                            nextPage: 'Next', // Next page button text
                            firstPage: 'First', // First page button text
                            lastPage: 'Last', // Last page button text
                        }} pagination={true}>
                            <TableHeaderColumn key="lg1" className="table-secondary" isKey hidden searchable={false} dataField='id' width='50' >No</TableHeaderColumn>
                            <TableHeaderColumn key="lg2" className="table-secondary" dataField='company_name' width='15%' editable={false} dataSort={false}>Company Name</TableHeaderColumn>
                            <TableHeaderColumn key="lg3" className="table-secondary" dataField='data_requested' width='25%' editable={false} dataSort={false} >Date Requested</TableHeaderColumn>
                            <TableHeaderColumn key="lg4" className="table-secondary" dataField='requested_credentials' width='35%' editable={false} dataSort={false}>Requested Credentials</TableHeaderColumn>
                            <TableHeaderColumn key="lg5" className="table-secondary" dataField='issue_status' dataAlign='center' width='10%' editable={false} dataSort={false}>Issue Status</TableHeaderColumn>
                            <TableHeaderColumn key="lg6" className="table-secondary" dataField='action' dataAlign='center' dataFormat={cellButton} width='20%' editable={false} dataSort={false}>Action</TableHeaderColumn>
                        </StyledBootStrapTable>
                    </Col>
                </Row>
            </div>
            <FooterView />
        </div>
    );
};

export default LandingPage;