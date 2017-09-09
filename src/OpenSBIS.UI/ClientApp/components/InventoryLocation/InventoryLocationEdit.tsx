import * as React from 'react';
import 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as ReactDOM from "react-dom";
import { AlertBox } from '../Controls/AlertBox';

interface InventoryLocationEditState {
    inventoryLocation: InventoryLocation;
    alertMessage: string;
    alertType: string;
    editName: string;
}

export class InventoryLocationEdit extends React.Component<{}, InventoryLocationEditState> {

    constructor() {
        super();
        this.state = { editName: "", alertMessage: "", alertType: "hidden", inventoryLocation: { id: 0, name: "Not Loaded", companyId: 0, company: { id: 0, name: "" } } };

        const queryString = require('query-string');
        fetch(process.env.API_URL + '/api/InventoryLocation/' + location.href.substr(location.href.lastIndexOf('/') + 1))
            .then(response => response.json() as Promise<InventoryLocation>)
            .then(data => {
                this.setState({ editName: data.name , inventoryLocation: { id: data.id, name: data.name, companyId: data.companyId, company: { id: data.company.id, name: data.company.name } } });
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(process.env.API_URL + '/api/InventoryLocation/' + this.state.inventoryLocation.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.inventoryLocation.id,
                CompanyId: this.state.inventoryLocation.companyId,
                Name: this.state.editName
            })
            })
            .then((response) => {
                if (response.ok) {
                    this.setState({ alertType: "alert-success", alertMessage: "Saved" });
                }
                else {
                    this.setState({ alertType: "alert-warning", alertMessage: response.json.toString() });
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({ alertType: "alert-danger", alertMessage: "Fatal error making connection." });
            });
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name

        this.setState({
            [name]: value
        });
    }

    closeAlert(event) {
        this.setState({ alertType: "hidden", alertMessage: "" });
    }

    public render() {
        return <div>
            <h1>Edit Inventory Location</h1>
            <AlertBox message={this.state.alertMessage} type={this.state.alertType} onClick={this.closeAlert} />
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company</label>
                    <input readOnly className="form-control" name="name" type="text" value={this.state.inventoryLocation.company.name} />
                    <label>InventoryLocation Name</label>
                    <input className="form-control" name="editName" type="text" value={this.state.editName} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }
}

