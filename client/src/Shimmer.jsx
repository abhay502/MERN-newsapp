import ContentLoader from 'react-content-loader';

const ShimmerEffect = () => (
    <ContentLoader
      speed={2}
      width={400}
      height={400}
      viewBox="0 0 400 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="10" rx="4" ry="4" width="380" height="200" />
      <rect x="10" y="220" rx="3" ry="3" width="200" height="20" />
      <rect x="10" y="250" rx="3" ry="3" width="350" height="10" />
      <rect x="10" y="270" rx="3" ry="3" width="250" height="10" />
      <rect x="10" y="290" rx="3" ry="3" width="380" height="10" />
    </ContentLoader>
  );
export default ShimmerEffect;