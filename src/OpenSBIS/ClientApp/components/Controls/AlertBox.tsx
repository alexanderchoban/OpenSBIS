import * as React from 'react';


export class AlertBox extends React.Component<{ message, type, onClick }> {
    constructor(props) {
        super(props);
    }

    public render() {
        return <div className={"alert alert-dismissible " + this.props.type} role="alert">
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true" onClick={this.props.onClick}>&times;</span></button>
            {this.props.message}
        </div>;
    }


}
