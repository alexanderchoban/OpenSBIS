import * as React from 'react';
import 'isomorphic-fetch';
import { Link, NavLink } from 'react-router-dom';
import { CompanyDropDown } from '../Controls/CompanyDropDown';

interface productsDataState {
    products: Product[];
    loading: boolean;
    currentCompany: number;
}

export class ProductList extends React.Component<{}, productsDataState> {
    constructor() {
        super();
        this.state = { currentCompany: 0, products: [], loading: true };
        this.getData(0);

        this.getData = this.getData.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.companyChange = this.companyChange.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.products);

        return <div>
            <h1>Products</h1>
            <p>These are the current products configured in the system.</p>
            <CompanyDropDown name="company" onChange={this.companyChange} value={this.state.currentCompany} />
            {contents}
            <Link className='btn btn-default' to={'/Product-new'}>Add</Link>
        </div>;
    }

    private companyChange(event) {
        this.getData(event.target.value);
    }

    private getData(id) {
        this.setState({ products: [], loading: true });
        var url = '/api/Product';

        if(id > 0)
        {
            url += '?companyId=' + id;
        }

        fetch(url)
            .then(response => response.json() as Promise<Product[]>)
            .then(data => {
                this.setState({ currentCompany: id, products: data, loading: false });
            });
    }

    private async deleteProduct(event) {
        await fetch('/api/Product/' + event.target.value, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        this.getData(this.state.currentCompany);
    }

    private renderProductTable(products: Product[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Sku</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map(Product =>
                    <tr key={Product.id}>
                        <td>{Product.company.name}</td>
                        <td>
                            <Link to={'/Product/' + Product.id}>
                                {Product.sku}
                            </Link>
                        </td>
                        <td>
                            <Link to={'/Product/' + Product.id}>
                                {Product.name}
                            </Link>
                        </td>
                        <td>{Product.quantity}</td>
                        <td><button className="btn btn-danger" value={Product.id} onClick={this.deleteProduct}>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

