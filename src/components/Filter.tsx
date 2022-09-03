import { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreObject } from '../types';

interface FilterInterface {
  minCount: number | '';
  maxCount: number | '';
}

class Filter extends Component<unknown, FilterInterface> {
  static get propTypes() {
    return {
      handleFilter: PropTypes.func.isRequired,
      count: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    };
  }

  static defaultProps = {
    prop1: { foobar: 'foobar' },
  };

  private handleFilter: any;
  private count: string;
  private label: string;

  constructor(props: any) {
    super(props);
    this.state = { minCount: '', maxCount: '' };
    this.handleFilter = props.handleFilter;
    this.count = props.count;
    this.label = props.label;
  }

  setValue(event: React.FormEvent<HTMLDivElement>) {
    const target = event.target as HTMLInputElement;
    const arg: any = {
      [target.name]: target.value,
    };
    this.setState(arg);
  }

  filterMethod(el: StoreObject) {
    if (!el) return;
    const property = el[this.count];
    const { minCount, maxCount } = this.state;
    const conditional =
      (minCount === '' || parseInt(property, 10) >= minCount) &&
      (maxCount === '' || parseInt(property, 10) <= maxCount);
    return conditional;
  }

  submit() {
    this.handleFilter(this.filterMethod.bind(this));
  }

  clean() {
    this.setState({
      minCount: '',
      maxCount: '',
    });
    this.handleFilter(() => true);
  }

  render() {
    const { minCount, maxCount } = this.state;
    return (
      <div className="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
        <div className="row container p-0 m-0">
          <div className="col">
            <p className="font-weight-normal text-end my-2">{this.label}</p>
          </div>
          <div className="col">
            <input
              value={minCount}
              onChange={this.setValue.bind(this)}
              name="minCount"
              className="form-control"
              type="number"
              placeholder="min."
              id="rangeFilterCountMin"
            />
          </div>
          <div className="col">
            <input
              value={maxCount}
              onChange={this.setValue.bind(this)}
              className="form-control"
              name="maxCount"
              type="number"
              placeholder="máx."
              id="rangeFilterCountMax"
            />
          </div>
          <div className="col-3 p-0">
            <div className="btn-group" role="group">
              <button
                onClick={this.submit.bind(this)}
                type="button"
                className="btn btn-light btn-block"
                id="rangeFilterCount"
              >
                Filtrar
              </button>
              <button
                onClick={this.clean.bind(this)}
                type="button"
                className="btn btn-link btn-sm"
                id="clearRangeFilter"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
