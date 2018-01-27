import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';

interface CompaniesDataState {
    loading: boolean;
    companies: Company[];
}

interface CompanyDropDownProps {
    onChange: any;
    name: string;
    disabled?: string;
    value?: number;
    companies: Company[];
}

export class CompanyDropDown extends React.Component<CompanyDropDownProps, CompaniesDataState> {
    constructor(props: CompanyDropDownProps) {
        super(props);
        this.state = { loading: true, companies: props.companies };
    }

    public static defaultProps: Partial<CompanyDropDownProps> = {
        disabled: "false",
        value: 0
    };

    public render() {
        let contents = this.renderCompanyDropDown(this.state.companies);

        return <div>
            {contents}
        </div>;
    }

    private renderCompanyDropDown(companies: Company[]) {
        if (companies != null) {
        return <select className="form-control" value={this.props.value} onChange={this.props.onChange} name={this.props.name}>
                <option value="0">Select...</option>
                {companies.map(company =>
                    <option value={company.id}>{company.name}</option>
                )}
        </select>;
        }

        return <select className="form-control" value={this.props.value} onChange={this.props.onChange} name={this.props.name}>
            <option value="0">No companies.</option>
        </select>
    }
}

interface Company {
    id: number;
    name: string;
}