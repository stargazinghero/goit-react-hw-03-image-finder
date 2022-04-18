import PropTypes from 'prop-types';
import { ButtonItem } from './Button.styled';

export const Button = ({ loadMore }) => {
  return <ButtonItem onClick={loadMore}>Load more</ButtonItem>;
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
