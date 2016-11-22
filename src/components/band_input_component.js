import React from 'react';
import BandIndex from './band_index_component'

export default class BandInput extends React.Component {
  onSubmit(event){
    event.preventDefault();
    this.props.store.dispatch({type: 'ADD_BAND', payload: {title: event.target.children[1].value}})
    // console.log(this.props.store.getState())
  }
      render(){
          return(
              <div>
                  <form onSubmit={this.onSubmit.bind(this)}>
                      <label>Enter Band: </label>
                      <input />
                      <button type="submit">Submit</button>
                  </form>

                  <h1>Bands</h1>
                    <ul>
                        {this.props.store.getState().map((band, i) =>
                          <BandIndex key={i} band={band} />)}
                    </ul>
              </div>
          )
      }
}
