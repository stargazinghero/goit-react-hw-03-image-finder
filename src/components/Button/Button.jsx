import { ButtonItem } from './Button.styled';

export const Button = ({ loadMore }) => {
  return <ButtonItem onClick={loadMore}>Load more</ButtonItem>;
};
