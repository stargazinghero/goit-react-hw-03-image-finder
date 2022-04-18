import axios from 'axios';
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

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25251210-ac1999c1ffdbc1fb6fbdee37e';
let totalHits = 0;
export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    searchQuery: '',
    per_page: 12,
    isLoading: false,
    sumHits: 0,
    showModal: false,
    largeImage: [],
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery, per_page } = this.state;
    const { scrollWindow } = this;
    if (prevState.page !== page && page !== 1) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
        );
        const images = await response.data;
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...images.hits],
            isLoading: false,
            sumHits: prevState.sumHits + images.hits.length,
          };
        });
        scrollWindow();
        totalHits = images.totalHits;
      } catch (error) {
        this.setState({ isLoading: false });
        toast.error(`${error}`);
      }
    }
  }

  onSubmit = async queryValue => {
    const { per_page } = this.state;
    try {
      this.setState({ isLoading: true, searchQuery: queryValue });
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=${per_page}`
      );
      const images = await response.data;
      if (images.hits.length === 0) {
        this.setState({ isLoading: false });
        toast.error('There are no images matching your search query');
        return;
      }
      this.setState({
        gallery: images.hits,
        isLoading: false,
        sumHits: images.hits.length,
      });
      totalHits = images.totalHits;
    } catch (error) {
      this.setState({ isLoading: false });
      toast.error(`${error}`);
    }
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  resetPage = () => {
    this.setState({ page: 1 });
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
    const { resetPage, onSubmit, openLargeImage, loadMore, toggleModal } = this;
    const { isLoading, gallery, sumHits, showModal, largeImage } = this.state;
    return (
      <Container>
        <Searchbar resetPage={resetPage} onSubmit={onSubmit} />
        {isLoading && !gallery.length ? (
          <Loader />
        ) : (
          <ImageGallery gallery={gallery} openLargeImage={openLargeImage} />
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
