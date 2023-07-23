import { Component } from 'react';
import PropTypes from 'prop-types';
import { HiSearch } from 'react-icons/hi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notifyOptions from 'components/NotifyOptions/NotifyOptions';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Enter your search request, please!', notifyOptions);
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmit}>
          <input
            className={css.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.query}
          />
          <button type="submit" className={css.searchBtn}>
            <span>
              <HiSearch size={40} />
            </span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
