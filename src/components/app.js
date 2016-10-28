import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  onSubmit(e){
    e.preventDefault();
    this.props.store.dispatch({type: 'ADD_BAND', payload: {title: e.target.firstChild.value}})
    e.target.firstChild.value = ''
  }

  render(){
    return(
      <div>
        <h1>Bands</h1>
        <ul>
          {this.props.store.getState().map((band, i) => <li key={i}>{band.title}</li>)}
        </ul>

        <form onSubmit={this.onSubmit.bind(this)}>
          <input />
          <button type="submit">Submit</button>
        </form>

      </div>
    )
  }
}
