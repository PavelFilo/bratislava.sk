import { IProjectsQueryData } from '@backend/dtos/projectDto'
import { Enum_Pagecategory_Color, GeneralQuery } from '@backend/graphql'
import { client } from '@backend/graphql/gql'
import { fetchProjects } from '@backend/utils/temporary'
import PageLayout from '@components/layouts/PageLayout'
import ProjectsPageContent from '@components/pages/projects/projectsPageContent'
import { LocalizationsProvider } from '@components/providers/LocalizationsProvider'
import { GlobalCategoryColorProvider } from '@utils/colors'
import { GeneralContextProvider } from '@utils/generalContext'
import { useTitle } from '@utils/useTitle'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export const getServerSideProps: GetServerSideProps<PageProps, { page: string }> = async ({
  locale,
  query,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating search ${locale}.`)

  if (!locale) return { notFound: true }

  const [general, messages, projectsResponse] = await Promise.all([
    client.General({ locale }),
    import(`../messages/${locale}.json`),
    fetchProjects(query?.page ? +query?.page : 1),
  ])

  return {
    props: {
      general,
      data: projectsResponse.data,
      messages: messages.default,
    },
  }
}

export type PageProps = {
  general: GeneralQuery
  data: IProjectsQueryData
}

const Page = ({ general, data }: PageProps) => {
  const t = useTranslations()
  const title = useTitle(t('projects'))

  return (
    <GeneralContextProvider general={general}>
      <LocalizationsProvider localizations={{ sk: '/projekty', en: '/projects' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <GlobalCategoryColorProvider color={Enum_Pagecategory_Color.Green} />

        <PageLayout>
          <ProjectsPageContent data={data} />
        </PageLayout>
      </LocalizationsProvider>
    </GeneralContextProvider>
  )
}

export default Page
