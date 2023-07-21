import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import ReactPlayer from 'react-player';

interface Props {
  lightImageSrc: string;
  darkImageSrc: string;
}

const ImageSwitcher = ({lightImageSrc, darkImageSrc}: Props) => {
  const { isDarkTheme } = useColorMode();

  return (
    <>
      <ReactPlayer playing muted={true} loop={true} width='100%' height='100%' url={isDarkTheme ? darkImageSrc : lightImageSrc} />
    </>
  )
}

export default ImageSwitcher;