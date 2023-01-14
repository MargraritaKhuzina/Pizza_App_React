import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  // создано на этом сайте https://skeletonreact.com/
  // скелет, который отображается до того как подгружены основные даннные
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="427" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
);
