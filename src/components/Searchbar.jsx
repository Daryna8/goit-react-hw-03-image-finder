import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSetSearchQuery(this.state.query);
  };
  handleChangeQuery = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleChangeQuery}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
