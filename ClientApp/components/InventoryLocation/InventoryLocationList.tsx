import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';

interface CompaniesDataState {
    companies: InventoryLocation[];
    loading: boolean;
}

export class InventoryLocationList extends React.Component<{}, CompaniesDataState> {
    constructor() {
        super();
        this.state = { companies: [], loading: true };
        this.getData();

        this.getData = this.getData.bind(this);
        this.deleteInventoryLocation = this.deleteInventoryLocation.bind(this);
        this.deleteInventoryLocation = this.deleteInventoryLocation.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderInventoryLocationTable(this.state.companies);

        return <div>
            <h1>Inventory Locations</h1>
            <p>These are the current inventory locations configured in the system.</p>
            {contents}
            <Link className='btn btn-default' to={'/InventoryLocation-new'}>Add</Link>
        </div>;
    }

    private getData() {
        this.setState({ companies: [], loading: true });

        fetch('/api/InventoryLocation')
            .then(response => response.json() as Promise<InventoryLocation[]>)
            .then(data => {
                this.setState({ companies: data, loading: false });
            });
    }

    private async deleteInventoryLocation(event) {
        await fetch('/api/InventoryLocation/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        this.getData();
    }

    private renderInventoryLocationTable(companies: InventoryLocation[]) {
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
                {companies.map(InventoryLocation =>
                    <tr key={InventoryLocation.id}>
                        <td>{InventoryLocation.id}</td>
                        <td>{InventoryLocation.id}</td>
                        <td>
                            <Link className='btn btn-link' to={'/InventoryLocation/' + InventoryLocation.id}>
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

interface InventoryLocation {
    id: number;
    companyId: number;
    name: string;
}
