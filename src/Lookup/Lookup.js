import React, { Component } from 'react';
import axios from 'axios';
import './Lookup.css';


class lookup extends Component {
    state = { keyword:'', searchResults: [] }

    
    updateKeywordHandler = ev =>{
        this.setState({
        keyword: ev.target.value
        });
    }

    runSearchHandler = () => {
        const requestUrl = 'https://itunes.apple.com/search?term='+this.state.keyword.replace(' ','+');
        axios.get(requestUrl)
            .then(response => {
                this.setState({
                    searchResults: response.data.results
                });
            });
    }

    priceFilterHandler = (ev) => {
        let tempResult = this.state.searchResults;
        tempResult = tempResult.filter(item => {
            return item.collectionPrice<=ev.target.value;
        });
        this.setState({searchResults: tempResult});
    }

    render() {
        let sResult;
        if(this.state.searchResults){
            sResult = this.state.searchResults.map(entry => {
                return <div className="sResult" key={entry.collectionId +''+ entry.trackId}>
                    <h4>{entry.collectionName}</h4>
                    <p>Track: {entry.trackCensoredName}</p>
                    <p>Artist(s): {entry.collectionArtistName}</p>
                    <p>Genre: {entry.primaryGenreName}</p>
                    <p>Album Price: {entry.collectionPrice} {entry.currency}</p>
                </div>
            });
        }
        return <div>
            <input type="text" placeholder="Enter name of song or artist" onChange={this.updateKeywordHandler} onKeyUp={this.runSearchHandler}/>
            <h3>You searched for {this.state.keyword} </h3>
            <hr />
            Price Filter:
            <input type="number" placeholder="Maximum Cost" onChange={this.priceFilterHandler} />
                        
            <hr />
            {sResult}
        </div>
    }
}

export default lookup;