import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    let { largeImageURL, tags } = this.props.image;
    return (
      <>
        <div className="Overlay" onClick={this.handleBackdropClick}>
          <div className="Modal">
            <img src={largeImageURL} alt={tags} />
          </div>
        </div>
      </>
    );
  }
}
