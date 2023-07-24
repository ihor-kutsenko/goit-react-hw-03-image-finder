import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notifyOptions from './NotifyOptions/NotifyOptions';
import Container from './Container/Container';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchImages from 'services/pixabayApi';
import StartText from './StartText/StartText';
import Loader from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    showLoadMoreBtn: false,
    modalOpen: false,
    largeImageURL: '',
    imageTags: null,
    total: 0,
    perPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if ((query && prevState.query !== query) || page > prevState.page) {
      this.searchImages(query, page);
    }
    if (prevState.query !== query) {
      this.setState({
        images: [],
      });
    }
  }

  async searchImages() {
    const { query, page, perPage } = this.state;

    this.setState({ isLoading: true });
    try {
      const data = await fetchImages(query, page, perPage);

      if (data.hits.length === 0) {
        this.setState({ showLoadMoreBtn: false });
        toast.info('No images found!', notifyOptions);
        return;
      }
      this.setState(({ images }) => {
        return {
          images: [...images, ...data.hits],
          total: data.totalHits,
        };
      });

      if (data.hits.length > 0 && page === 1) {
        toast.success(
          `Hooray! We found ${data.totalHits} images.`,
          notifyOptions
        );
      }
      if (data.hits.length < perPage) {
        this.setState({ showLoadMoreBtn: false });
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          notifyOptions
        );
      } else {
        this.setState({ showLoadMoreBtn: true });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onFormSearh = query => {
    this.setState(prevState => {
      if (prevState.query === query) {
        return;
      } else
        return {
          query,
          page: 1,
        };
    });
  };

  onLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        if (this.state.images.length < this.state.perPage) {
          this.setState({ showLoadMoreBtn: false });
          toast.info(
            "We're sorry, but you've reached the end of search results.",
            notifyOptions
          );
        }
      }
    );
  };

  openModal = (largeImageURL, imageTags) => {
    this.setState({
      modalOpen: true,
      largeImageURL,
      imageTags,
      isLoading: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      largeImageURL: '',
      isLoading: false,
    });
  };

  render() {
    const {
      images,
      isLoading,
      showLoadMoreBtn,
      error,
      largeImageURL,
      modalOpen,
      imageTags,
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onFormSearh} />
        {images.length === 0 && <StartText />}
        {error && toast.error('Please try again later!', notifyOptions)}
        <Container>
          {isLoading && <Loader />}
          <ImageGallery images={images} onClick={this.openModal} />
          {showLoadMoreBtn && <LoadMoreBtn onLoadMore={this.onLoadMore} />}
          {modalOpen && (
            <Modal
              src={largeImageURL}
              alt={imageTags}
              onClose={this.closeModal}
            ></Modal>
          )}
        </Container>
        <ToastContainer />
      </>
    );
  }
}
