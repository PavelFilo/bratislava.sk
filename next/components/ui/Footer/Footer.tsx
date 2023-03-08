// @ts-strict-ignore
import FBLogo from '@assets/images/FB.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import Image from "next/legacy/image";
import React from 'react'

import BABrand from '../../../assets/images/BABrand.svg'
import EULogo from '../../../assets/images/EULogo.svg'
import IGLogo from '../../../assets/images/IG.svg'
import YTLogo from '../../../assets/images/YT.svg'
import { FooterSection, FooterSectionProps } from '../FooterSection/FooterSection'
import EULogoPng from '../images/EULogo.png'

export interface FooterProps {
  className?: string
  facebookLink?: string
  instagramLink?: string
  youtubeLink?: string
  address?: string
  email?: string
  phone?: string
  sections?: FooterSectionProps[]
  accessibilityLink?: { title: string; url: string }
  copyright?: string
  /**
   * Active link should not have url
   */
  languageLinks?: { title: string; url?: string; locale: string }[]
}

export const Footer = ({
  className,
  facebookLink,
  instagramLink,
  youtubeLink,
  address,
  email,
  phone,
  sections,
  accessibilityLink,
  copyright,
  languageLinks,
}: FooterProps) => {
  const { Link: UILink } = useUIContext()

  return (
    <footer className={cx(className, 'text-p2 text-gray-600')}>
      <section
        className="flex items-center justify-between pt-14"
        aria-label="Logo and Social Media Links"
      >
        <BABrand />
        <div className="flex items-center justify-between xl:w-52">
          <nav
            className="hidden cursor-pointer gap-4 text-gray-400 xl:flex"
            aria-label="Social Media Links"
          >
            {facebookLink && (
              <a href={facebookLink} target="_blank" rel="noreferrer">
                <FBLogo />
              </a>
            )}
            {instagramLink && (
              <a href={instagramLink} target="_blank" rel="noreferrer">
                <IGLogo />
              </a>
            )}
            {youtubeLink && (
              <a href={youtubeLink} target="_blank" rel="noreferrer">
                <YTLogo />
              </a>
            )}
          </nav>
          <span className="hidden xl:block">
            <EULogo />
          </span>
        </div>
      </section>

      <section
        aria-label="Contact Info and Sections"
        className="flex flex-col gap-x-28 py-14 xl:flex-row"
      >
        <div className="flex flex-col gap-y-6 xl:gap-y-16" aria-label="Contact Info">
          <p className="whitespace-pre-wrap leading-6">{address}</p>
          <div className="flex flex-col gap-y-1 underline xl:gap-y-5">
            <a className="block" href={`mailto:${email}`}>
              {email}
            </a>
            <a className="block" href={`tel:${phone?.replace(/ /g, '')}`}>
              {phone}
            </a>
          </div>
        </div>
        <div
          className="mt-10 flex w-full flex-col justify-around gap-y-10 xl:w-2/3 xl:flex-row xl:mt-0 xl:flex xl:flex-wrap"
          aria-label="Project Info sections"
        >
          {sections?.map((section, i) => (
            <FooterSection key={i} title={section.title} pageLinks={section.pageLinks} />
          ))}
        </div>
      </section>

      <hr />

      <section
        aria-label="Accessibility and Copyright"
        className="flex grid-cols-3 flex-col gap-y-6 pt-14 text-center xl:grid xl:flex-row xl:justify-between xl:gap-y-0"
      >
        {accessibilityLink && (
          <UILink href={accessibilityLink.url} className="hover:underline xl:text-left">
            {accessibilityLink.title}
          </UILink>
        )}
        <div className="flex justify-center gap-x-10 xl:hidden" aria-label="lang">
          {languageLinks?.map(({ url, title, locale }, i) => (
            <React.Fragment key={i}>
              {url === undefined ? (
                <span className="font-semibold">{title}</span>
              ) : (
                <UILink className="font-normal" href={url} locale={locale}>
                  {title}
                </UILink>
              )}
            </React.Fragment>
          ))}
        </div>
        <nav
          className="mt-5 flex justify-center gap-5 text-gray-400 xl:hidden"
          aria-label="Social Media Links"
        >
          {facebookLink && (
            <a href={facebookLink} target="_blank" rel="noreferrer">
              <FBLogo />
            </a>
          )}
          {instagramLink && (
            <a href={instagramLink} target="_blank" rel="noreferrer">
              <IGLogo />
            </a>
          )}
          {youtubeLink && (
            <a href={youtubeLink} target="_blank" rel="noreferrer">
              <YTLogo />
            </a>
          )}
        </nav>
        <span className="mt-5 xl:hidden">
          <Image src={EULogoPng} />
        </span>
        <p className="mt-2 xl:mt-0">{copyright}</p>
        <div className="hidden text-right xl:block" aria-label="lang">
          {languageLinks.map(({ url, title, locale }, i) => (
            <React.Fragment key={i}>
              {url === undefined ? (
                <span className="font-semibold">{title}</span>
              ) : (
                <UILink className="font-normal" href={url} locale={locale}>
                  {title}
                </UILink>
              )}
              {i < languageLinks.length - 1 && <span> / </span>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </footer>
  );
}

export default Footer
