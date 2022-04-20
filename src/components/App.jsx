import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { Container } from './App.styled';

import 'react-toastify/dist/ReactToastify.css';

import * as API from 'services/api';
import { mapper } from 'services/mapper';

let totalHits = 0;
let sumHits = 0;
export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    searchQuery: '',
    per_page: 12,
    isLoading: false,
    showModal: false,
    largeImage: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery, per_page } = this.state;
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true });
        const images = await API.getImages(searchQuery, page, per_page);
        const imagesData = mapper(images.hits);
        if (images.hits.length === 0) {
          this.setState({ isLoading: false });
          toast.error('There are no images matching your search query');
          return;
        }
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...imagesData],
            isLoading: false,
          };
        });
        totalHits = images.totalHits;
        sumHits += images.hits.length;
      } catch (error) {
        this.setState({ isLoading: false });
        toast.error(`${error}`);
      }
    }
  }

  onSubmit = queryValue => {
    this.setState({
      gallery: [],
      isLoading: false,
      page: 1,
      searchQuery: queryValue,
    });
    sumHits = 0;
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
    this.scrollWindow();
  };

  scrollWindow = () => {
    scroll.scrollToBottom({
      offset: 100,
      smooth: true,
    });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        showModal: !prevState.showModal,
      };
    });
  };

  openLargeImage = id => {
    const { toggleModal } = this;
    const { gallery } = this.state;
    gallery.map(image => {
      if (image.id === id) {
        toggleModal();
        return this.setState({ largeImage: image });
      }
      return image;
    });
  };

  render() {
    const { onSubmit, openLargeImage, loadMore, toggleModal } = this;
    const { isLoading, gallery, showModal, largeImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={onSubmit} />
        {isLoading && !gallery.length ? (
          <Loader />
        ) : (
          gallery.length > 0 && (
            <ImageGallery gallery={gallery} openLargeImage={openLargeImage} />
          )
        )}
        {isLoading && gallery.length && <Loader />}
        {totalHits !== sumHits && gallery.length > 0 && isLoading === false && (
          <Button loadMore={loadMore} />
        )}
        <ToastContainer />
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
      </Container>
    );
  }
}
