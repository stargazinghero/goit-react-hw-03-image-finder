import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import { ModalContainer, ModalImg, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { toggleModal } = this.props;
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  handleBackdropClick = e => {
    const { toggleModal } = this.props;
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.largeImage;
    const { handleBackdropClick } = this;
    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalContainer>
          <ModalImg src={largeImageURL} alt={tags} />
        </ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}
