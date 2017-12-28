import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as InventoryLocationsState from '../../store/InventoryLocations';
import { CompanyDropDown } from '../Controls/CompanyDropDown';

// At runtime, Redux will merge together...
type InventoryLocationListProps =
    InventoryLocationsState.InventoryLocationsState        // ... state we've requested from the Redux store
    & typeof InventoryLocationsState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ userId: string }>; // ... plus incoming routing parameters

class InventoryLocationList extends React.Component<InventoryLocationListProps, {currentCompany: number}> {
    constructor() {
        super();
        this.state = { currentCompany: 0 };

        this.deleteInventoryLocation = this.deleteInventoryLocation.bind(this);
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        let userId = parseInt(this.props.match.params.userId) || 0;
        this.props.requestInventoryLocations(userId);
    }

    componentWillReceiveProps(nextProps: InventoryLocationListProps) {
        // This method runs when incoming props (e.g., route params) change
        let userId = parseInt(nextProps.match.params.userId) || 0;
        this.props.requestInventoryLocations(userId);
    }

    public render() {
        let contents = this.props.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderInventoryLocationTable();

        return <div>
            <h1>InventoryLocations</h1>
            <p>Here are the inventoryLocations that your user has access to.</p>
            <CompanyDropDown name="company" onChange={this.companyChange} value={this.state.currentCompany} />
            {contents}
            <Link className='btn btn-default' to={'/inventoryLocation-new'}>Add</Link>
        </div>;
    }

    private companyChange(event: any){
        event.preventDefault();
        this.state = { currentCompany: event.target.value };
    }

    private deleteInventoryLocation(event: any) {
        this.props.deleteInventoryLocation(event.target.value);
    }

    private renderInventoryLocationTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>InventoryLocation Id</th>
                    <th>InventoryLocation Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.props.inventoryLocations.map(inventoryLocation =>
                    <tr key={inventoryLocation.id}>
                        <td>{inventoryLocation.id}</td>
                        <td>
                            <Link to={'/inventoryLocation/' + inventoryLocation.id}>
                                {inventoryLocation.name}
                            </Link>
                        </td>
                        <td><button className="btn btn-danger" value={inventoryLocation.id} onClick={this.deleteInventoryLocation}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export default connect(
    (state: ApplicationState) => state.inventoryLocations, // Selects which state properties are merged into the component's props
    InventoryLocationsState.actionCreators,                 // Selects which action creators are merged into the component's props
)(InventoryLocationList) as typeof InventoryLocationList;
