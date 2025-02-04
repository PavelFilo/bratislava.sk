import { BlogItem, BlogSearchCard } from '@bratislava/ui-bratislava/BlogSearchCard/BlogSearchCard'
import Button from '@components/forms/simple-components/Button'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export interface BlogSearchCardsProps {
  blogs: BlogItem[]
}

export const BlogSearchCards = ({ blogs }: BlogSearchCardsProps) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const SHOW_LESS_COUNT = 3

  const blogsToShow = isOpen ? blogs : blogs.slice(0, SHOW_LESS_COUNT)

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="hidden flex-col gap-y-6 lg:flex">
        <div className="flex flex-col gap-y-6">
          {blogsToShow.map((blog) => {
            return (
              <BlogSearchCard key={blog.attributes?.slug} item={blog} imageClassName="w-56 h-50" />
            )
          })}
        </div>
        {blogs.length > SHOW_LESS_COUNT && (
          <Button
            variant="category-outline"
            className="self-center"
            onPress={() => setIsOpen(!isOpen)}
          >
            {isOpen ? t('showLess') : t('showMore')}
          </Button>
        )}
      </div>
      <ResponsiveCarousel
        className="lg:hidden"
        items={blogs.map((blog) => {
          return (
            <BlogSearchCard key={blog.attributes?.slug} item={blog} className="h-60 shrink-0" />
          )
        })}
      />
    </div>
  )
}
