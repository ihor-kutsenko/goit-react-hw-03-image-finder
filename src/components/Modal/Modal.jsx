import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <img className={css.img} src={this.props.src} alt={this.props.alt} />
          <p className={css.description}>{this.props.alt}</p>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
