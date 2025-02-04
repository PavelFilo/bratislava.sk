import { TextWithImageSectionFragment } from '@backend/graphql'
import { TextWithImage } from '@bratislava/ui-bratislava/TextWithImage/TextWithImage'
import React from 'react'

type TextWithImageSectionProps = {
  section: TextWithImageSectionFragment
}

const TextWithImageSection = ({ section }: TextWithImageSectionProps) => {
  return (
    <TextWithImage
      imageSrc={section.imageSrc?.data?.attributes?.url ?? ''}
      imageWidth={section.imageSrc?.data?.attributes?.width}
      imageHeight={section.imageSrc?.data?.attributes?.height}
      imagePosition={section.imagePosition ?? 'left'}
      content={section.content ?? ''}
      imageShadow={section.imageShadow ?? false}
      imageAlternativeText={section.imageSrc?.data?.attributes?.alternativeText ?? undefined}
    />
  )
}

export default TextWithImageSection
