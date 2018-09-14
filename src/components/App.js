import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };
    addFish = fish => {
        // take a copy of the exsiting state
        const fishes = {...this.state.fishes};
        // add our new fish to fishes variable
        fishes[`fish${Date.now()}`] = fish;
        //set new fishes object to state
        this.setState({ fishes });
    };
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
                <Order />
                <Inventory 
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes} 
                />
             </div>
         );
     }
}

export default App;