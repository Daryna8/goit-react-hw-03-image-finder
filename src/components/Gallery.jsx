import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchPhotosByQuery } from 'services/PixabayApi';
import { Button } from './Button';
import { InfinitySpin } from 'react-loader-spinner';
import { Modal } from './Modal';

const DEFAULT_PAGE_NUM = 1;

export class Gallery extends Component {
  state = {
    images: [],
    currentImage: null,
    page: DEFAULT_PAGE_NUM,
    loading: false,
    error: null,
    searchQuery: '',
    totalHits: null,
    isOpenModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ loading: true, error: null });
        const { hits, totalHits } = await fetchPhotosByQuery({
          q: searchQuery,
          page: DEFAULT_PAGE_NUM,
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
          page: DEFAULT_PAGE_NUM,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSetSearchQuery = text => {
    this.setState({ searchQuery: text, images: [], page: 1 });
  };

  handleLoadMore = async () => {
    const { searchQuery, page } = this.state;
    const newPageNum = page + 1;

    try {
      this.setState({ loading: true, error: null });
      const { hits } = await fetchPhotosByQuery({
        q: searchQuery,
        page: newPageNum,
      });
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: newPageNum,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleClickImage = image => {
    this.setState({ currentImage: image, isOpenModal: true });
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
  };

  render() {
    const { images, currentImage, totalHits, loading, isOpenModal, error } =
      this.state;
    const totalImagesLoaded = images.length;
    return (
      <div>
        <Searchbar handleSetSearchQuery={this.handleSetSearchQuery} />
        {loading && !totalImagesLoaded && (
          <div
            style={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <InfinitySpin
              visible={true}
              height="180"
              width="180"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
            />
          </div>
        )}
        {error && <h2 className="Error-Message">{error}</h2>}

        <ImageGallery images={images} onClickImage={this.handleClickImage} />

        {totalImagesLoaded && totalImagesLoaded < totalHits ? (
          <Button loading={loading} handleLoadMore={this.handleLoadMore} />
        ) : null}
        {isOpenModal ? (
          <Modal image={currentImage} closeModal={this.handleToggleModal} />
        ) : null}
      </div>
    );
  }
}
