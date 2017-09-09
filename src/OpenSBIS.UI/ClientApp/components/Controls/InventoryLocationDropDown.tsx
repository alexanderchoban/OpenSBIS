import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';

interface InventoryLocationDropDownState {
    loading: boolean;
    inventories: InventoryLocation[];
    companyId: number;
}

interface InventoryLocationDropDownProps {
    onChange: any;
    name: string;
    companyId: number;
    allowAll?: string;
    value?: number;
}

export class InventoryLocationDropDown extends React.Component<InventoryLocationDropDownProps, InventoryLocationDropDownState> {
    constructor(props) {
        super(props);
        this.state = { inventories: [], loading: true, companyId: 0 };
        this.getData();

        this.getData = this.getData.bind(this);
    }

    public static defaultProps: Partial<InventoryLocationDropDownProps> = {
        allowAll: "true",
        value: 0
    };

    public render() {
        let contents = this.state.loading
            ? <select><option>Loading...</option></select>
            : this.renderCompanyDropDown(this.state.inventories);

        return <div>
            {contents}
        </div>;
    }

    private getData() {
        this.setState({ inventories: [], loading: true });

        var url = process.env.API_URL + '/api/InventoryLocation';

        if (this.props.companyId > 0) {
            url += '?companyId=' + this.props.companyId;
        }

        fetch(url)
            .then(response => response.json() as Promise<InventoryLocation[]>)
            .then(data => {
                this.setState({ inventories: data, loading: false });
            });

        this.setState({ companyId: this.props.companyId });
    }

    private renderCompanyDropDown(inventories: InventoryLocation[]) {
        if (this.props.companyId != this.state.companyId)
            this.getData();

        if (this.props.companyId < 1 && this.props.allowAll == "true")
        {
            return <select className="form-control" disabled onChange={this.props.onChange} name={this.props.name}>
                <option value="0">Please select a company.</option>
            </select>;
        }

        return <select value={this.props.value} className="form-control" onChange={this.props.onChange} name={this.props.name}>
            <option value="0">Select...</option>
            {inventories.map(inventoryLocation =>
                <option value={inventoryLocation.id}>{inventoryLocation.name}</option>
            )}
        </select>;
    }
}

