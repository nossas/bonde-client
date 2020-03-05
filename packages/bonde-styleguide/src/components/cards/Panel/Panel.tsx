import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from '../../..';
import Flexbox from '../../layout/Flexbox2/Flexbox2';
import IconColorful from '../../content/IconColorful/IconColorful';
import Image from '../../content/Image/Image';
import Spacing from '../../layout/Spacing/Spacing';
import Text from '../../content/Text/Text';
import Title from '../../content/Title/Title';

const textColor = '#4a4a4a';

const placeHolderShimmer = keyframes`
  0% { transform: translateX(-180%) }
  100% { transform: translateX(70%) }
`;

const BackgroundMasker = styled.div`
  background: #fff;
  position: absolute;
`;

const AnimatedBackground = styled.div`
  animation-name: ${placeHolderShimmer};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(
    to right,
    transparent 30%,
    #dddddd 70%,
    transparent 100%
  );
  height: 300px;
  position: relative;
`;

const PanelLoading = styled(({ className, minHeight, title }) => (
  <Card title={title} minHeight={minHeight}>
    <div className={className}>
      <AnimatedBackground />
      <BackgroundMasker style={{ top: 182, left: 0, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 185, bottom: 0, width: 18 }} />
      <BackgroundMasker style={{ top: 200, left: 185, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 218, left: 0, right: 0, height: 12 }} />
      <BackgroundMasker style={{ top: 230, left: 254, right: 0, height: 14 }} />
      <BackgroundMasker style={{ top: 244, left: 0, right: 0, height: 18 }} />
      <BackgroundMasker style={{ top: 262, left: 120, right: 0, height: 10 }} />
      <BackgroundMasker style={{ top: 272, left: 0, right: 0, height: 28 }} />
    </div>
  </Card>
))`
  background: #eeeeee;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  min-height: 300px;
  position: relative;
  overflow: hidden;
`;

const DefaultImage = styled(({ className }) => (
  <div className={className}>
    <IconColorful name="community" size={130} />
  </div>
))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 185px;
  background-color: #424242;
`;

const Panel = ({
  loading,
  image,
  minHeight,
  sectionTitle,
  author,
  title,
  description,
  onClick,
}) =>
  loading ? (
    <PanelLoading title={sectionTitle} minHeight={minHeight} />
  ) : (
    <Card title={sectionTitle} minHeight={minHeight} onClick={onClick}>
      <Flexbox vertical spacing="between">
        <div>
          {image ? <Image src={image} height={185} /> : <DefaultImage />}

          <Spacing padding={{ x: 16, y: 14 }}>
            <Title.H4>{title}</Title.H4>
            {description && (
              <Spacing margin={{ x: 8, y: 0 }}>
                <Text fontSize={16} lineHeight={1.31} color={textColor}>
                  {description}
                </Text>
              </Spacing>
            )}
          </Spacing>
        </div>

        <Spacing padding={{ x: 16, y: 14 }}>
          <Text fontSize={13} lineHeight={1.85} color={textColor}>
            {author}
          </Text>
        </Spacing>
      </Flexbox>
    </Card>
  );

const { bool, string, number } = PropTypes;

Panel.propTypes = {
  loading: bool,
  sectionTitle: string,
  minHeight: number,
  image: string,
  title: string.isRequired,
  description: string,
  author: string.isRequired,
};

Panel.defaultProps = {
  loading: false,
  minHeight: 320,
};

Panel.displayName = 'Panel';

/** @component */
export default Panel;
