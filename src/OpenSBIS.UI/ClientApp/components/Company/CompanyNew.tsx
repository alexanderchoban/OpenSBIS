import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import 'isomorphic-fetch';

interface CompanyNewDataState {
    name: string;
    done: boolean;
}

export class CompanyNew extends React.Component<{}, CompanyNewDataState> {
    constructor() {
        super();
        this.state = { name: "", done: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch(process.env.API_URL + '/api/company', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name
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
                <Redirect to={"/company"} />
            );
        }

        return <div>
            <h1>Add New Company</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company Name</label>
                    <input className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }

}

