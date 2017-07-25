import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';

interface CompaniesDataState {
    companies: Company[];
    loading: boolean;
}

export class CompanyDropDown extends React.Component<{ onChange, name }, CompaniesDataState> {
    constructor(props) {
        super(props);
        this.state = { companies: [], loading: true };
        this.getData();

        this.getData = this.getData.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <select><option>Loading...</option></select>
            : this.renderCompanyDropDown(this.state.companies);

        return <div>
            {contents}
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

    private renderCompanyDropDown(companies: Company[]) {
        return <select className="form-control" onChange={this.props.onChange} name={this.props.name}>
                <option value="0">Select...</option>
                {companies.map(company =>
                    <option value={company.id}>{company.name}</option>
                )}
        </select>;
    }
}

interface Company {
    id: number;
    name: string;
}
