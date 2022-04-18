import axios from 'axios';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { Container } from './App.styled';

import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

import { animateScroll as scroll } from 'react-scroll';

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
    if (prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `${BASE_URL}/?key=${API_KEY}&q=${this.state.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=${this.state.per_page}`
        );
        const images = await response.data;
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...images.hits],
            isLoading: false,
            sumHits: prevState.sumHits + images.hits.length,
          };
        });
        this.scrollWindow();
        totalHits = images.totalHits;
      } catch (error) {
        this.setState({ isLoading: false });
        console.log(error);
      }
    }
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({ isLoading: true });
        const response = await axios.get(
          `${BASE_URL}/?key=${API_KEY}&q=${this.state.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=${this.state.per_page}`
        );
        const images = await response.data;
        if (images.hits.length === 0) {
          this.setState({ isLoading: false });
          toast.error('There are no images matching your search query');
          return;
        }
        this.setState(prevState => {
          return {
            gallery: images.hits,
            isLoading: false,
          };
        });
        this.state.sumHits = images.hits.length;
        totalHits = images.totalHits;
      } catch (error) {
        this.setState({ isLoading: false });
        console.log(error);
      }
    }
  }

  onSubmit = searchQuery => {
    this.setState({ searchQuery });
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
    this.state.gallery.map(image => {
      if (image.id === id) {
        this.toggleModal();
        return this.setState({ largeImage: image });
      }
      return image;
    });
  };

  render() {
    return (
      <Container>
        <Searchbar resetPage={this.resetPage} onSubmit={this.onSubmit} />
        {this.state.isLoading && !this.state.gallery.length ? (
          <BallTriangle
            color="#00BFFF"
            height={80}
            width={80}
            wrapperStyle={{ margin: '0 auto' }}
          />
        ) : (
          <ImageGallery
            gallery={this.state.gallery}
            openLargeImage={this.openLargeImage}
          />
        )}
        {this.state.isLoading && this.state.gallery.length && (
          <BallTriangle
            color="#00BFFF"
            height={80}
            width={80}
            wrapperStyle={{ margin: '0 auto' }}
          />
        )}
        {totalHits !== this.state.sumHits &&
          this.state.gallery.length > 0 &&
          this.state.isLoading === false && <Button loadMore={this.loadMore} />}
        <ToastContainer />
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            largeImage={this.state.largeImage}
          />
        )}
      </Container>
    );
  }
}
