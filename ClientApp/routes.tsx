import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { CompanyEdit } from './components/Company/CompanyEdit';
import { CompanyList } from './components/Company/CompanyList';
import { CompanyNew } from './components/Company/CompanyNew';
import { InventoryLocationEdit } from './components/InventoryLocation/InventoryLocationEdit';
import { InventoryLocationList } from './components/InventoryLocation/InventoryLocationList';
import { InventoryLocationNew } from './components/InventoryLocation/InventoryLocationNew';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />

    <Route exact path='/company' component={ CompanyList } />
    <Route path='/company-new' component={ CompanyNew } />
    <Route path='/company/:id' component={ CompanyEdit } />

    <Route exact path='/inventorylocation' component={ InventoryLocationList } />
    <Route path='/inventorylocation-new' component={ InventoryLocationNew } />
    <Route path='/inventorylocation/:id' component={ InventoryLocationEdit } />
</Layout>;
