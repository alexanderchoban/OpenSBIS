import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as CompaniesState from '../../store/Companies';

// At runtime, Redux will merge together...
type CompanyListProps =
    CompaniesState.CompaniesState        // ... state we've requested from the Redux store
    & typeof CompaniesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ userId: string }>; // ... plus incoming routing parameters

class CompanyList extends React.Component<CompanyListProps, {}> {
    constructor() {
        super();

        this.deleteCompany = this.deleteCompany.bind(this);
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        let userId = parseInt(this.props.match.params.userId) || 0;
        this.props.requestCompanies(userId);
    }

    componentWillReceiveProps(nextProps: CompanyListProps) {
        // This method runs when incoming props (e.g., route params) change
        let userId = parseInt(nextProps.match.params.userId) || 0;
        this.props.requestCompanies(userId);
    }

    public render() {
        let contents = this.props.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderCompanyTable();

        return <div>
            <h1>Companies</h1>
            <p>Here are the companies that your user has access to.</p>
            {contents}
            <Link className='btn btn-default' to={'/company-new'}>Add</Link>
        </div>;
    }

    private deleteCompany(event: any) {
        this.props.deleteCompany(event.target.value);
    }

    private renderCompanyTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Company Id</th>
                    <th>Company Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.companies.map(company =>
                    <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>
                            <Link to={'/company/' + company.id}>
                                {company.name}
                            </Link>
                        </td>
                        <td><button className="btn btn-danger" value={company.id} onClick={this.deleteCompany}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export default connect(
    (state: ApplicationState) => state.companies, // Selects which state properties are merged into the component's props
    CompaniesState.actionCreators                 // Selects which action creators are merged into the component's props
)(CompanyList) as typeof CompanyList;
