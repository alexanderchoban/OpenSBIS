import * as React from 'react';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as CompaniesState from '../../store/Companies';

// At runtime, Redux will merge together...
type CompanyProps =
    CompaniesState.CompaniesState        // ... state we've requested from the Redux store
    & typeof CompaniesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ userId: string }>; // ... plus incoming routing parameters

interface CompanyNewDataState {
    name: string;
    done: boolean;
}

class CompanyNew extends React.Component<CompanyProps, CompanyNewDataState> {
    constructor() {
        super();

        this.state = { name: "", done: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        let userId = parseInt(this.props.match.params.userId) || 0;
        this.props.requestCompanies(userId);
    }

    componentWillReceiveProps(nextProps: CompanyProps) {
        // This method runs when incoming props (e.g., route params) change
        let userId = parseInt(nextProps.match.params.userId) || 0;
        this.props.requestCompanies(userId);
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        this.props.addCompany(this.state.name);
        this.setState({ done: true });
    }

    handleChange(event: any) {
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

export default connect(
    (state: ApplicationState) => state.companies, // Selects which state properties are merged into the component's props
    CompaniesState.actionCreators                 // Selects which action creators are merged into the component's props
)(CompanyNew) as typeof CompanyNew;
