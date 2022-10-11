// import { Drawer, Alert, Row, Table } from 'antd';
import {
    Card,
    Col,
    Row,
    Modal,
    CardImg,
    ModalFooter,
} from "reactstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

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

export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; showViewCredentialsDrawer: any; }) => {

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
                    <button type="button" className="back" aria-label="Back" onClick={() => {
                        props.onClose();
                        // props.showViewCredentialsDrawer();
                    }}>
                        <span aria-hidden="true">{'<'}</span>
                    </button>
                    <h3 style={{ marginBottom: "0px", fontWeight: "bold" }}>CREDENTIALS</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body-without-top-padding-2" style={{ paddingTop: "0" }}>
                    <Row>
                        <BootstrapTable
                            id="btPurpose"
                            data={data}
                            bootstrap4={true}
                            keyField="id"
                            hover={true}
                            columns={columns}
                            striped={false}
                        ></BootstrapTable>
                    </Row>
                </div>
            </div>
        </Modal >
    );
};

export default ViewSelectedCredentialPage;