import styled from "styled-components";
import { Drawer, Alert, Row, Table, Col, Popconfirm, Button, Space } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {CloseCircleOutlined} from "@ant-design/icons";

const columns: any[] = [
    {
        title: <h3>{'Attribute'}</h3>,
        dataIndex: 'attribute',
        key: 'attribute',
    },
    {
        title: <h3>{'Value'}</h3>,
        dataIndex: 'value',
        key: 'value',
    }
];

const StyledTable = styled(Table)`
    border: 1px solid #ddd;
    border-radius: 5px;
`

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledDeleteOutlined = styled(DeleteOutlined)`
    font-size: 20px;
    cursor: pointer;
`;


export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; selectedViewCredentialAttributes: any; onViewCredentialsDrawerClose: any; }) => {

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => {
                            props.onClose();
                        }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    const [open, setOpen] = useState(false);

    const camelToTitle = (camelCase: string) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

    const updateAttributesTable = (credentialsAttributeList: any[]) => {
        let index = 1;
        let tempData = [];
        for (let item in credentialsAttributeList) {
            tempData.push({ 
                key: `${index}`, 
                attribute: camelToTitle(item.split('.').at(-1) || ''), 
                value: credentialsAttributeList[item] 
            });
            index = index + 1;
        }
        return tempData;
    };
    return (
        <Drawer title="VIEW CREDENTIALS" placement="right" onClose={() => {props.onClose();}} 
            open={props.open} 
            extra={
                <Space>
                 <Popconfirm
                    title="Are you sure delete this certificate?"
                    open={open}
                    onOpenChange={(newOpen: boolean)=> {setOpen(newOpen);}}
                    onConfirm={()=>{}}
                    onCancel={()=>{
                        setOpen(false);
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                        <DeleteOutlined />
                </Popconfirm> 
                 <CloseCircleOutlined onClick={props.onClose}/>
                </Space>               
            } 
            footer={footerActionButtons()}
            closeIcon={<LeftOutlined/>}
        >
            <p>
                <StyledTable columns={columns} dataSource={updateAttributesTable(props.selectedViewCredentialAttributes)} bordered pagination={false} />
            </p>
        </Drawer>
    );
}

export default ViewSelectedCredentialPage;