import * as React from 'react';
import 'oidc-client'
const OidcClient = require('oidc-client');

export class Home extends React.Component<{}, {}> {
    constructor() {
        super();

    }

    public render() {
        return <div>
            <h1>Hello, world!</h1>
            <p>Welcome to your new OpenSBIS instance:</p>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a> and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
        </div>;
    }
}