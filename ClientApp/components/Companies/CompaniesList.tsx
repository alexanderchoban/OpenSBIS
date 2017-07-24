import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';

interface CompaniesDataState {
    companies: Company[];
    loading: boolean;
}

export class CompaniesList extends React.Component<{}, CompaniesDataState> {
    constructor() {
        super();
        this.state = { companies: [], loading: true };
        this.getData();

        this.getData = this.getData.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCompanyTable(this.state.companies);

        return <div>
            <h1>Companies</h1>
            <p>These are the current companies configured in the system.</p>
            {contents}
            <Link className='btn btn-default' to={'/newcompany'}>Add</Link>
        </div>;
    }

    private getData() {
        this.setState({ companies: [], loading: true });

        fetch('/api/Company')
            .then(response => response.json() as Promise<Company[]>)
            .then(data => {
                this.setState({ companies: data, loading: false });
            });
    }

    private async deleteCompany(event) {
        await fetch('/api/company/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        this.getData();
    }

    private renderCompanyTable(companies: Company[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {companies.map(company =>
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td><button className="btn btn-danger" value={company.id} onClick={this.deleteCompany}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Company {
    id: number;
    name: string;
}
