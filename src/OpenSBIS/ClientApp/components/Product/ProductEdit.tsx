import * as React from 'react';
import 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as ReactDOM from "react-dom";
import { AlertBox } from '../Controls/AlertBox';
import { CompanyDropDown } from '../Controls/CompanyDropDown';
import { InventoryLocationDropDown } from '../Controls/InventoryLocationDropDown';

interface ProductEditState {
    alertMessage: string;
    alertType: string;
    companyId: number;
    inventoryLocationId: number;
    name: string;
    sku: string;
    quantity: number;
    id: number;
    companyName: string;
}

export class ProductEdit extends React.Component<{}, ProductEditState> {

    constructor() {
        super();
        this.state = { id: 0, name: "", alertMessage: "", alertType: "hidden", companyId: 0, inventoryLocationId: 0, sku: "", quantity: 0, companyName: "" };

        const queryString = require('query-string');
        fetch('/api/Product/' + location.href.substr(location.href.lastIndexOf('/') + 1))
            .then(response => response.json() as Promise<Product>)
            .then(data => {
                this.setState({ companyName: data.company.name, id: data.id, name: data.name, companyId: data.companyId, inventoryLocationId: data.inventoryLocationId, sku: data.sku, quantity: data.quantity});
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/Product/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.id,
                CompanyId: this.state.companyId,
                Name: this.state.name
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
                    <input readOnly className="form-control" name="name" type="text" value={this.state.companyName} />
                </div>
                <div className="form-group">
                    <label>Inventory Location</label>
                    <InventoryLocationDropDown name="inventoryLocationId" onChange={this.handleChange} companyId={this.state.companyId} value={this.state.inventoryLocationId} allowAll="false" />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>SKU</label>
                    <input className="form-control" name="sku" type="text" value={this.state.sku} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input className="form-control" name="quantity" type="text" value={this.state.quantity} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }
}

