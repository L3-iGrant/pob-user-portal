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

const btnSz = {
    height: "1.8rem",
    width: "10rem",
    padding: 0,
    fontSize: "12px",
};

const camelToTitle = (camelCase: string) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; showViewCredentialsDrawer: any; data: any; }) => {

    console.log(props.data);
    const table: any[] = (props.data || []).map((entry: any, key: any) => {
        return {
            key,
            attribute: camelToTitle(entry.name.split('.').at(-1)),
            value: entry.value
        }
    })

    return (
        <Modal backdrop="static" unmountOnClose={true} isOpen={props.open}>
            <div className="modal-content">
                <div className="modal-header model-header-style" >
                    <button type="button" className="back" aria-label="Back" onClick={() => {
                        props.onClose();
                        // props.showViewCredentialsDrawer();
                    }}>
                        <span aria-hidden="true">{'<'}</span>
                    </button>
                    <h3 >VIEW CREDENTIALS</h3>

                    <button type="button" className="close" aria-label="Close" onClick={props.onClose}>
                        <span aria-hidden="true">×</span>
                    </button>

                </div>
                <div className="modal-body" style={{ paddingTop: "0" }}>
                    <div className="modal-sub-header-text">
                        CERTIFICATE OF REGISTRATION
                    </div>
                    <Row style={{'padding' : '10px'}}>
                        <BootstrapTable
                            id="btPurpose"
                            data={table}
                            bootstrap4={true}
                            keyField="id"
                            hover={true}
                            columns={columns}
                            striped={false}
                            classes="table-policy-configuration"
                        ></BootstrapTable>
                    </Row>
                </div>
                <ModalFooter className="modal-footer">
                    <button style={btnSz} className="btn btn-default" onClick={props.onClose}>Cancel</button>
                </ModalFooter>
            </div>
        </Modal >
    );
};

export default ViewSelectedCredentialPage;