/* eslint-disable react/prop-types,import/no-unresolved */
import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({ src, caption }) {
  return (
    <figure>
      <img src={useBaseUrl(src)} alt={caption} />
      <figcaption>{`${caption}`}</figcaption>
    </figure>
  )
}