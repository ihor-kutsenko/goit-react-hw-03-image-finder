import PropTypes from 'prop-types';

import css from './Button.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func,
};
export default LoadMoreBtn;
