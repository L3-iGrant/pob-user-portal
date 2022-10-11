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

const camelToTitle = (camelCase:string) => camelCase
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase())
  .trim();

export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; showViewCredentialsDrawer: any; data:any; }) => {

    console.log(props.data);
    const table: any[] = (props.data || []).map( (entry:any, key:any) => {
        return {
            key,
            attribute: camelToTitle(entry.name.split('.').at(-1)),
            value: entry.value
        }
    })

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
                            data={table}
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