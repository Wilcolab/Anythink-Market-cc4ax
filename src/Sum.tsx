import * as React from 'react';
import { IMemento, Memento } from './Memento';


export class Sum extends React.Component implements IMemento {
  
  save(): Memento {
    return new Memento(this.state);
  }
  restore(m: Memento): void {
    this.setState(m.state);
  }

  state = {log:[], result:0};

  add = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.keyCode == 13) {
      const log = [...this.state.log, Number(event.currentTarget.value)];

      const result = log.reduce((r, n) => r + n);

      this.setState({log, result});
    }
  };

  reset = () => this.setState({log:[], result:0});

  render() {
    return (
      <React.Fragment>
        <input type="number" onKeyDown={this.add}/>
        {this.state.log.map((value, i) => <div key={i}><h3>{value}</h3></div>)}
        <div style= {{color: 'red'}}>
          <h3>{this.state.result}</h3>
        </div>
      </React.Fragment>
    )
  }
}




// import React, { useState } from "react";
// const Sum = () => {
  
//   const [value1, setValue1] = useState();
//   const [value2, setValue2] = useState();
//   const [result, setResult] = useState();
  
//   const calculateSum = () => setResult(value1 + value2);
  
//   return (
//     <div>
//      <input 
//        data-testid="value1" 
//        value={value1}
//        onChange={e => setValue1(e.target.value)}
//      />
//      <input 
//        data-testid="value2" 
//        value={value2}
//        onChange={e => setValue2(e.target.value)}
//      />
//      <button data-testid="sum-button" onClick={calculateSum} /> 
//      <p data-testid="result-txt">{result}</p>
//     </div>
//    );
// };

// export default Sum;