import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import 'isomorphic-fetch';
import { CompanyDropDown } from '../Controls/CompanyDropDown';
import { InventoryLocationDropDown } from '../Controls/InventoryLocationDropDown';
import { AlertBox } from '../Controls/AlertBox';

interface ProductNewDataState {
    name: string;
    companyId: number;
    done: boolean;
    alertMessage: string;
    alertType: string;
    inventoryLocationId: number;
    sku: string;
    quantity: number;
}

export class ProductNew extends React.Component<{}, ProductNewDataState> {
    constructor() {
        super();
        this.state = { alertMessage: "", alertType: "hidden", name: "", companyId: 0, done: false, inventoryLocationId: 0, sku: "", quantity: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch('/api/Product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                CompanyId: this.state.companyId,
                InventoryLocationId: this.state.inventoryLocationId,
                Sku: this.state.sku,
                Quantity: this.state.quantity
            })
        })
        .then((response) => {
            if (response.ok) {
                this.setState({ done: true });
            }
            else {
                this.setState({ alertType: "alert-warning", alertMessage: "There was an error submitting your request." });
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
        if (this.state.done) {
            return (
                <Redirect to={"/Product"} />
            );
        }

        return <div>
            <h1>Add New Product</h1>
            <AlertBox message={this.state.alertMessage} type={this.state.alertType} onClick={this.closeAlert} />
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company</label>
                    <CompanyDropDown name="companyId" onChange={this.handleChange} value={this.state.companyId} />
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

