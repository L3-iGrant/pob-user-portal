import styled from "styled-components";
import { Drawer, Alert, Row, Table, Col, Popconfirm, Button, Space, notification } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import companyService from "services/companyService";

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


export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; selectedViewCredentialAttributes: any; onViewCredentialsDrawerClose: any; selectedViewCredentialReferent: string; }) => {

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

    const openSuccessNotification = (message: string, description: string) => {
        notification.success({ message, description, duration: 5 });
    };

    const openErrorNotification = (message: string, description: string) => {
        notification.error({ message, description, duration: 5 });
    };

    return (
        <Drawer title="VIEW CREDENTIALS" placement="right" onClose={() => { props.onClose(); }}
            open={props.open}
            extra={
                <Space>
                    <Popconfirm
                        title="Are you sure you want to delete this credential?"
                        open={open}
                        onOpenChange={(newOpen: boolean) => { setOpen(newOpen); }}
                        onConfirm={async () => {
                            const response = await companyService.deleteCertificate('6343ecbb6de5d70001ac038e', props.selectedViewCredentialReferent);
                            if (response) {
                                openSuccessNotification('Delete successful', `Successfully deleted certificate (referent: ${props.selectedViewCredentialReferent})`);
                                props.onClose();
                            } else {
                                openErrorNotification('Delete failed', `Failed to delete certificate (referent: ${props.selectedViewCredentialReferent})`);
                            }
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="bottomRight"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                    <CloseCircleOutlined onClick={props.onClose} />
                </Space>
            }
            footer={footerActionButtons()}
            closeIcon={<LeftOutlined />}
        >
            <p>
                <StyledTable columns={columns} dataSource={updateAttributesTable(props.selectedViewCredentialAttributes)} bordered pagination={false} />
            </p>
        </Drawer>
    );
}

export default ViewSelectedCredentialPage;