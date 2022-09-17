import { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreObject } from '../types';
import { Form } from 'react-bootstrap';

interface FilterInterface {
  minCount: number | '';
  maxCount: number | '';
  search: string;
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
    this.state = { minCount: '', maxCount: '', search: '' };
    this.handleFilter = props.handleFilter;
    this.count = props.count;
    this.label = props.label;
    this.searchUpdate.bind(this);
  }

  setValue(event: React.FormEvent<HTMLDivElement>) {
    const target = event.target as HTMLInputElement;
    const arg: any = {
      [target.name]: target.value,
    };
    this.setState(arg);
  }

  // highlight words found by regex in text.
  highLightWords(el: StoreObject, search: string) {
    const { name, description } = el;
    if (search) {
      el.html_name = name.replace(
        new RegExp(search, 'gi'),
        (match: string) => `<span class="bg-warning">${match}</span>`
      );
      el.html_description = description.replace(
        new RegExp(search, 'gi'),
        (match: string) => `<span class="bg-warning">${match}</span>`
      );
    } else {
      el.html_name = name;
      el.html_description = description;
    }
  }

  filterMethod(el: StoreObject) {
    if (!el) return;
    const property = el[this.count];
    const { minCount, maxCount, search } = this.state;
    const conditional =
      (minCount === '' || parseInt(property, 10) >= minCount) &&
      (maxCount === '' || parseInt(property, 10) <= maxCount);
    if (conditional && search !== '') {
      this.highLightWords(el, search);
      const { name, description } = el;
      return new RegExp(search, 'i').test(name + description);
    }
    this.highLightWords(el, search);
    return conditional;
  }

  submit() {
    console.log('Value', this.state);
    this.handleFilter(this.filterMethod.bind(this));
  }

  async clean() {
    await this.setState({
      ...this.state,
      minCount: '',
      maxCount: '',
    });
    console.log('Clean', this.state);
    this.handleFilter(this.filterMethod.bind(this));
  }

  async searchUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    await this.setState({ search: e.target.value });
    console.log('SEARCH', e.target.value);
    this.submit();
  }

  render() {
    const { minCount, maxCount, search } = this.state;
    return (
      <div className="col-12 col-lg-6 offset-lg-6 col-md-12 mb-1 container">
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
          <div className="col-12 col-md-3 p-md-0">
            <div className="btn-group w-100 py-2 py-md-0" role="group">
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
          <div className="col-12 py-2">
            <Form.Control
              defaultValue={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.searchUpdate(e)}
              type="search"
              placeholder="Busca por nombre / descripción"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
