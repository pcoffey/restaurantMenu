import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    myInput = React.createRef();

    goToStore = (event) => {
        // stop form from submitting
        event.preventDefault();
        // get the text from the input
        const storeName = this.myInput.value.value;
        // change the page to /store/id
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return (
            <React.Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    { /* Comments */ }
                    <h2>Please Enter A Store</h2>
                    <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
                    <button type="submit">Visit Store!</button>
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker;