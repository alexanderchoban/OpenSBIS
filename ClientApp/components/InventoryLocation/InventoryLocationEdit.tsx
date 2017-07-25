import * as React from 'react';
import 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

interface InventoryLocation {
    id: number;
    companyId: number;
    name: string;
}

export class InventoryLocationEdit extends React.Component<{}, InventoryLocation> {
    constructor() {
        super();
        this.state = { id: 0, name: "Not Loaded", companyId: 0 };

        const queryString = require('query-string');
        fetch('/api/InventoryLocation/' + location.href.substr(location.href.lastIndexOf('/') + 1))
            .then(response => response.json() as Promise<InventoryLocation>)
            .then(data => {
                this.setState({ id: data.id, name: data.name });
            });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/InventoryLocation/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.id,
                Name: this.state.name
            })
        });
    }

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name

        this.setState({
            [name]: value
        });
    }

    public render() {
        return <div>
            <h1>Edit Inventory Location</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company Id</label>
                    <input readOnly className="form-control" name="name" type="text" value={this.state.companyId} />
                    <label>Inventory Location Id</label>
                    <input readOnly className="form-control" name="name" type="text" value={this.state.id} />
                    <label>InventoryLocation Name</label>
                    <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }
}

