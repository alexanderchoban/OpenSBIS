import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { CompanyEdit } from './components/Company/CompanyEdit';
import { CompanyList } from './components/Company/CompanyList';
import { CompanyNew } from './components/Company/CompanyNew';
import { InventoryLocationEdit } from './components/InventoryLocation/InventoryLocationEdit';
import { InventoryLocationList } from './components/InventoryLocation/InventoryLocationList';
import { InventoryLocationNew } from './components/InventoryLocation/InventoryLocationNew';
import { ProductEdit } from './components/Product/ProductEdit';
import { ProductList } from './components/Product/ProductList';
import { ProductNew } from './components/Product/ProductNew';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />

    <Route exact path='/company' component={ CompanyList } />
    <Route path='/company-new' component={ CompanyNew } />
    <Route path='/company/:id' component={ CompanyEdit } />

    <Route exact path='/inventorylocation' component={ InventoryLocationList } />
    <Route path='/inventorylocation-new' component={ InventoryLocationNew } />
    <Route path='/inventorylocation/:id' component={ InventoryLocationEdit } />

    <Route exact path='/product' component={ ProductList } />
    <Route path='/product-new' component={ ProductNew } />
    <Route path='/product/:id' component={ ProductEdit } />
</Layout>;