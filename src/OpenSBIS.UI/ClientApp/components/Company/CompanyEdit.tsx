import * as React from 'react';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as CompaniesState from '../../store/Companies';

// At runtime, Redux will merge together...
type CompanyEditProps =
    CompaniesState.CompaniesState        // ... state we've requested from the Redux store
    & typeof CompaniesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ userId: string }>; // ... plus incoming routing parameters

interface Company {
    id: number;
    name: string;
}

interface CompanyEditState {
    done: boolean;
    company: Company;
}

class CompanyEdit extends React.Component<CompanyEditProps, CompanyEditState> {
    constructor() {
        super();
        this.state = { done: false, company: { id: 0, name: "Not Loaded" } };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        var comp = this.props.companies.filter(
            function (comp) { return comp.id == Number(location.href.substr(location.href.lastIndexOf('/') + 1)) });

        if (comp.length == 1) {
            this.state = { done: false, company: { id: comp[0].id, name: comp[0].name } };
        } else {
            alert("Error loading data!");
        }
    }

    componentWillReceiveProps(nextProps: CompanyEditProps) {
        // This method runs when incoming props (e.g., route params) change
        var comp = this.props.companies.filter(
            function (comp) { return comp.id == Number(location.href.substr(location.href.lastIndexOf('/') + 1)) });

        if (comp.length == 1) {
            this.state = { done: false, company: { id: comp[0].id, name: comp[0].name } };
        } else {
            alert("Error loading data!");
        }
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.props.updateCompany(this.state.company);
        this.setState({ done: true });
    }

    handleChange(event: any) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name

        this.setState({ company: { id: this.state.company.id, name: value } });
    }

    public render() {
        if (this.state.done) {
            return (
                <Redirect to={"/company"} />
            );
        }

        return <div>
            <h1>Edit Company</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Company Id</label>
                    <input readOnly className="form-control" name="id" type="text" value={this.state.company.id} />
                    <label>Company Name</label>
                    <input className="form-control" name="name" type="text" value={this.state.company.name} onChange={this.handleChange} />
                </div>
                <button className='btn btn-default' type="submit">Save</button>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.companies, // Selects which state properties are merged into the component's props
    CompaniesState.actionCreators                 // Selects which action creators are merged into the component's props
)(CompanyEdit) as typeof CompanyEdit;
