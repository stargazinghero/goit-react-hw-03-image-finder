import { BallTriangle } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <BallTriangle
      color="#00BFFF"
      height={80}
      width={80}
      wrapperStyle={{ margin: '0 auto' }}
    />
  );
};
