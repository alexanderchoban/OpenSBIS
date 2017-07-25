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

interface InventoryLocationNewDataState {
    name: string;
    company: number;
    done: boolean;
}

export class InventoryLocationNew extends React.Component<{}, InventoryLocationNewDataState> {
    constructor() {
        super();
        this.state = { name: "", company: 0, done: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        });

        this.setState({ done: true });
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name

        this.setState({
            [name]: value
        });
    }

    public render() {
        if (this.state.done) {
            return (
                <Redirect to={"/InventoryLocation"} />
            );
        }

        return <div>
            <h1>Add New Inventory Location</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <CompanyDropDown name="company" onChange={this.handleChange} />
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

