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
import { AlertBox } from '../Controls/AlertBox';

interface InventoryLocationNewDataState {
    name: string;
    company: number;
    done: boolean;
    alertMessage: string;
    alertType: string;
}

export class InventoryLocationNew extends React.Component<{}, InventoryLocationNewDataState> {
    constructor() {
        super();
        this.state = { alertMessage: "", alertType: "hidden", name: "", company: 0, done: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch('/api/InventoryLocation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                CompanyId: this.state.company
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
                <Redirect to={"/InventoryLocation"} />
            );
        }

        return <div>
            <h1>Add New Inventory Location</h1>
            <AlertBox message={this.state.alertMessage} type={this.state.alertType} onClick={this.closeAlert} />
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company</label>
                    <CompanyDropDown name="company" onChange={this.handleChange} value={this.state.company} />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }

}

