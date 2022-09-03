import { Component } from 'react';
import { SortData, StoreObject } from '../types';
import PropTypes from 'prop-types';

interface MyState {
  value: string;
}

class Sort extends Component<unknown, MyState> {
  static get propTypes() {
    return {
      handleSort: PropTypes.func.isRequired,
      count: PropTypes.string.isRequired,
      sort: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['numeric', 'text']),
    };
  }

  private handleSort: any;
  private data: SortData[] = [];

  private sortContent = {
    name: {
      sortAsc: 'A-Z',
      sortDesc: 'Z-A',
      sortByCount: <i className="fas fa-sort-amount-down mr-1" />,
    },
    cost: {
      sortAsc: (
        <span>
          <i className="fas fa-sort-amount-up mr-1" />$
        </span>
      ),
      sortDesc: (
        <span>
          <i className="fas fa-sort-amount-down mr-1" />$
        </span>
      ),
      sortByCount: (
        <span>
          <i className="fas fa-sort-amount-down mr-1" />
          Rel.
        </span>
      ),
    },
  };

  private defaultSort = (a: StoreObject, b: StoreObject) => a.id - b.id;

  constructor(props: any) {
    super(props);
    this.state = { value: '' };
    this.handleSort = props.handleSort;
    const { count, sort, type } = props;
    const s = this.sortContent[sort as 'name' | 'cost'];
    this.data = [
      {
        id: 'sortAsc',
        content: s.sortAsc,
        exec:
          type === 'text'
            ? (a: StoreObject, b: StoreObject) => a[sort].localeCompare(b[sort])
            : (a: StoreObject, b: StoreObject) => a[sort] - b[sort],
      },
      {
        id: 'sortDesc',
        content: s.sortDesc,
        exec:
          type === 'text'
            ? (a: StoreObject, b: StoreObject) => b[sort].localeCompare(a[sort])
            : (a: StoreObject, b: StoreObject) => b[sort] - a[sort],
      },
      {
        id: 'sortByCount',
        content: s.sortByCount,
        exec: (a: StoreObject, b: StoreObject) => b[count] - a[count],
      },
    ];
  }

  setValue(event: React.FormEvent<HTMLDivElement>) {
    let id = (event.target as HTMLInputElement).value;
    if (this.state.value === id) id = '';
    this.setState({
      value: id,
    });
    const f = this.data.find((el) => el.id === id);
    if (f) {
      console.log(f, id);
      this.handleSort(f.exec);
    } else {
      this.handleSort(this.defaultSort);
    }
  }

  render() {
    return (
      <div className="col text-end">
        <div className="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
          {this.data.map(({ id, content }) => (
            <div key={id}>
              <input
                onClick={this.setValue.bind(this)}
                type="radio"
                className="btn-check"
                value={id}
                name="options"
                id={id}
              />
              <label
                className={'btn ' + (this.state.value === id ? 'btn-dark' : 'btn-light')}
                htmlFor={id}
              >
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
