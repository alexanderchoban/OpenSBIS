import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';
import { CompanyDropDown } from '../Controls/CompanyDropDown';

interface inventoryLocationsDataState {
    inventoryLocations: InventoryLocation[];
    loading: boolean;
    currentCompany: number;
}

export class InventoryLocationList extends React.Component<{}, inventoryLocationsDataState> {
    constructor() {
        super();
        this.state = { currentCompany: 0, inventoryLocations: [], loading: true };
        this.getData(0);

        this.getData = this.getData.bind(this);
        this.deleteInventoryLocation = this.deleteInventoryLocation.bind(this);
        this.deleteInventoryLocation = this.deleteInventoryLocation.bind(this);
        this.companyChange = this.companyChange.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderInventoryLocationTable(this.state.inventoryLocations);

        return <div>
            <h1>Inventory Locations</h1>
            <p>These are the current inventory locations configured in the system.</p>
            <CompanyDropDown name="company" onChange={this.companyChange} value={this.state.currentCompany} />
            {contents}
            <Link className='btn btn-default' to={'/InventoryLocation-new'}>Add</Link>
        </div>;
    }

    private companyChange(event) {
        this.getData(event.target.value);
    }

    private getData(id) {
        this.setState({ inventoryLocations: [], loading: true });
        var url = process.env.API_URL + '/api/InventoryLocation';

        if(id > 0)
        {
            url += '?companyId=' + id;
        }

        fetch(url)
            .then(response => response.json() as Promise<InventoryLocation[]>)
            .then(data => {
                this.setState({ currentCompany: id, inventoryLocations: data, loading: false });
            });
    }

    private async deleteInventoryLocation(event) {
        await fetch(process.env.API_URL + '/api/InventoryLocation/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        this.getData(this.state.currentCompany);
    }

    private renderInventoryLocationTable(inventoryLocations: InventoryLocation[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {inventoryLocations.map(InventoryLocation =>
                    <tr key={InventoryLocation.id}>
                        <td>{InventoryLocation.id}</td>
                        <td>{InventoryLocation.company.name}</td>
                        <td>
                            <Link to={'/InventoryLocation/' + InventoryLocation.id}>
                                {InventoryLocation.name}
                            </Link>
                        </td>
                        <td><button className="btn btn-danger" value={InventoryLocation.id} onClick={this.deleteInventoryLocation}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

