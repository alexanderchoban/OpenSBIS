import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { CompanyEdit } from './components/Company/CompanyEdit';
import { CompanyList } from './components/Company/CompanyList';
import { CompanyNew } from './components/Company/CompanyNew';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route exact path='/company' component={ CompanyList } />
    <Route exact path='/company-new' component={ CompanyNew } />
    <Route path='/company/:id' component={ CompanyEdit } />
</Layout>;
