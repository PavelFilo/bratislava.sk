import { OfficialBoardCard } from '@components/ui/OfficialBoardCard/OfficialBoardCard'
import { ParsedOfficialBoardDocument } from 'backend/services/ginis'
import { useEffect, useState } from 'react'

import Divider from '../Divider/Divider'
import Pagination from '../Pagination/Pagination'

export interface OfficialBoardCardsProps {
  documents: ParsedOfficialBoardDocument[]
  dividerStyle?: string
  title: string
  viewButtonText: string
  downloadButtonText: string
  query: string | string[]
}

export const OfficialBoardCards = ({
  documents,
  dividerStyle,
  title,
  viewButtonText,
  downloadButtonText,
  query,
}: OfficialBoardCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPageDesktop = 14
  const itemsPerPageMobile = 10
  const currentItemsCountDesktop = documents.length - (currentPage - 1) * itemsPerPageDesktop
  const currentItemsCountMobile = documents.length - (currentPage - 1) * itemsPerPageMobile
  const dividerBreakpointDesktop = itemsPerPageDesktop / 2
  const dividerBreakpointMobile = itemsPerPageMobile / 2
  const dividerBugSolved = false

  useEffect(() => {
    if (query) {
      setCurrentPage(1)
    }
  }, [query])

  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-6">
      <div className="text-h4 font-medium">{title}</div>
      <div className="hidden flex-col lg:flex">
        <div className="flex flex-col gap-y-5 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageDesktop, currentPage * itemsPerPageDesktop)
            .map((doc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <OfficialBoardCard
                  {...doc}
                  viewButtonText={viewButtonText}
                  downloadButtonText={downloadButtonText}
                />
                {dividerBugSolved &&
                  index === dividerBreakpointDesktop - 1 &&
                  currentItemsCountDesktop > dividerBreakpointDesktop && (
                    <Divider className="py-24" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          totalCount={Math.ceil(documents.length / itemsPerPageDesktop)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex flex-col gap-y-6 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageMobile, currentPage * itemsPerPageMobile)
            .map((doc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <OfficialBoardCard
                  {...doc}
                  viewButtonText={viewButtonText}
                  downloadButtonText={downloadButtonText}
                />
                {dividerBugSolved &&
                  index === dividerBreakpointMobile - 1 &&
                  currentItemsCountMobile > dividerBreakpointMobile && (
                    <Divider className="py-10" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          totalCount={Math.ceil(documents.length / itemsPerPageDesktop)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
