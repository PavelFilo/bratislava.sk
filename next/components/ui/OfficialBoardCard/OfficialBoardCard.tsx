// @ts-strict-ignore
import { ArrowRightIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import FileCard from '@components/molecules/presentation/FileCard'
import ModalDialog from '@components/ui/ModalDialog/ModalDialog'
import { formatFileSize } from '@utils/formatFileSize'
import { getNumericLocalDate } from '@utils/local-date'
import { getDocumentDetailURL, getDocumentFileURL } from 'backend/services/ginis'
import { useLocale } from 'next-intl'
import React, { useState } from 'react'
import useSWR from 'swr'

import { TFile, TFileSection } from '../FileList/FileList'
import { Panel } from '../Panel/Panel'

export interface OfficialBoardCardProps {
  title: string
  id: string
  createdAt: string
  content: string
  className?: string
  viewButtonText: string
  downloadButtonText: string
}

export const OfficialBoardCard = ({
  title,
  createdAt,
  id,
  content,
  className,
  viewButtonText,
}: OfficialBoardCardProps) => {
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)

  // if you need to develop this and can't connect to bratislava VPN, check out services/ginis.ts for mocks
  const { data } = useSWR(isOpen ? getDocumentDetailURL(id) : null, () =>
    fetch(getDocumentDetailURL(id)).then((res) => res.json()),
  )

  const files: TFile[] =
    data?.['Soubory-dokumentu']?.map((file) => ({
      title: file.Nazev,
      media: {
        url: getDocumentFileURL(file['Id-souboru']),
        created_at: createdAt,
        // TODO figure out size
        size: 0,
        // size: Number.parseInt(file['Velikost']),
      },
    })) ?? []

  const fileSections: TFileSection[] = [
    {
      category: title,
      files,
    },
  ]

  return (
    <>
      <Panel className={className}>
        <div className="flex w-full flex-col gap-y-5 px-5 py-6 lg:px-10 lg:py-8">
          <div className="text-large -mb-3 font-semibold">{title}</div>
          <div className="text-small flex flex-col gap-x-6 text-font/75 lg:flex-row">
            {/* TODO: Fix local date */}
            <div>{new Date(createdAt).toLocaleDateString('sk')}</div>

            {/* <div>{`${fileExtension}; ${fileSize}`}</div> */}
          </div>
          <div>{content}</div>
          <div className="flex flex-col items-start gap-x-6">
            <Button
              variant="category-outline"
              endIcon={<ArrowRightIcon />}
              onPress={() => setIsOpen(true)}
            >
              {viewButtonText}
            </Button>
            {/* TODO  download button */}
          </div>
        </div>
        {/* <div className="flex lg:hidden h-[86px] -mt-[86px]" /> */}
      </Panel>
      <ModalDialog isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {/* TODO handle loading/error */}
        {/* <FileList fileSections={fileSections} noScroll hideCategory /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {files.map((file) => (
            <FileCard
              title={file.title}
              downloadLink={file.media?.url}
              format={file.media?.ext?.replace(/^\./, '').toUpperCase()}
              size={
                file.media && file.media.size > 0
                  ? formatFileSize(file.media?.size, locale)
                  : undefined
              }
              uploadDate={getNumericLocalDate(new Date(file.media?.created_at).toISOString())}
            />
          ))}
        </div>
      </ModalDialog>
    </>
  )
}