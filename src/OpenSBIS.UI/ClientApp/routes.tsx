import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import CompanyList from './components/Company/CompanyList';
import CompanyNew from './components/Company/CompanyNew';
import CompanyEdit from './components/Company/CompanyEdit';
import InventoryLocationList from './components/InventoryLocation/InventoryLocationList';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    
    <Route exact path='/company' component={ CompanyList } />
    <Route path='/company-new' component={ CompanyNew } />
    <Route path='/company/:id' component={ CompanyEdit } />

    <Route exact path='/inventorylocation' component={ InventoryLocationList } />
</Layout>;
