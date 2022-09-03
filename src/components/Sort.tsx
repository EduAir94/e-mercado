import { Component } from "react";
import { SortData, StoreObject } from "../types";
import PropTypes from 'prop-types';

interface MyState {
    value:string;
}


class Sort extends Component<unknown, MyState> {

    static get propTypes() { 
        return { 
            handleSort: PropTypes.func.isRequired, 
            count: PropTypes.string.isRequired
        }; 
    }

    private handleSort:any;
    private data:SortData[] = [];

    constructor(props:any) {
      super(props);
      this.state = {value: ''};
      this.handleSort = props.handleSort;
      this.data = [
        {
          id: 'sortAsc',
          content: 'A-Z',
          exec: (a:StoreObject, b:StoreObject) => a.name.localeCompare(b.name),
        },
        {
          id: 'sortDesc',
          content: 'Z-A',
          exec: (a:StoreObject, b:StoreObject) => b.name.localeCompare(a.name),
        },
        {
          id: 'sortByCount',
          content: (<i className="fas fa-sort-amount-down mr-1" />),
          exec: (a:StoreObject, b:StoreObject) =>  b[props.count] - a[props.count],
        },
      ];
    }
  
    setValue(event:React.FormEvent<HTMLDivElement>) {
        const val = (event.target as HTMLInputElement).value;
        this.setState({
            value: val 
        })
        const f = this.data.find((el) => el.id === val);
        if(f) {
            console.log(f, val);
            this.handleSort(f.exec);
        }
    }
  
    render() {
      return (
        <div className="col text-end">
          <div
            onChange={this.setValue.bind(this)}
            className="btn-group btn-group-toggle mb-4"
            data-bs-toggle="buttons"
          >
            {this.data.map(({ id, content }) => (
              <div key={id}	
              >
                <input
                  type="radio"
                  className="btn-check"	
                  value={id}
                  name="options"
                  id={id}
                />
                <label className={'btn ' + (this.state.value === id ? 'btn-dark' : 'btn-light')} htmlFor={id}>
                  {content}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    }
}

export default Sort;