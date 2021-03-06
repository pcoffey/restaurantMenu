import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate localstorage
        const localStorageRef = localStorage.getItem(params.storeid);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${params.storeid}/fishes`, {
          context: this,
          state: "fishes"
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(
          this.props.match.params.storeid,
          JSON.stringify(this.state.order)
        );
      }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // take a copy of the exsiting state
        const fishes = {...this.state.fishes};
        // add our new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //set new fishes object to state
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        // take copy of surrent satte
        const fishes = { ...this.state.fishes };
        // update that state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({ fishes });
    }

    deleteFish = key => {
        // take a copy of state
        const fishes = { ...this.state.fishes};
        // update the state
        fishes[key] = null;
        // update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order }
        // either add to order or update
        order[key] = order[key] + 1 || 1;
        // call setState to update out state object
        this.setState({ order });
    }

    removeFromOrder = key => {
        // take a copy of state
        const order = { ...this.state.order }
        // remove from order (since no firebase can use delete)
        delete order[key];
        // call setState to update out state object
        this.setState({ order });
    }    

     render() {
         return (
             <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish key={key} 
                            index={key}
                            details={this.state.fishes[key]}
                            addToOrder={this.addToOrder}
                        /> 
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                    storeid={this.props.match.params.storeid}
                />
             </div>
         );
     }
}

export default App;