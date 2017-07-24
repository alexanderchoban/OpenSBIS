import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CompaniesList } from './components/Companies/CompaniesList';
import { AddCompany } from './components/Companies/AddCompany';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/companies' component={ CompaniesList } />
    <Route path='/newcompany' component={ AddCompany } />
</Layout>;
