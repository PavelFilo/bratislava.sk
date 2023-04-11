import { InstagramIcon } from '@assets/images'
import { FooterColumnBlockFragment, FooterFragment } from '@bratislava/strapi-sdk-homepage'
import MLink from '@components/forms/simple-components/MLink'
import { useLocalizations } from '@components/providers/LocalizationsProvider'
import { FacebookIcon } from '@components/ui/images'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { isDefined } from '@utils/isDefined'
import { Trans, useTranslation } from 'next-i18next'
import * as React from 'react'

export const FooterSocialLinks = ({ facebookUrl, instagramUrl }: FooterFragment) => {
  return (
    <>
      {facebookUrl && (
        <MLink href={facebookUrl} target="_blank" rel="noreferrer" className="p-2">
          <FacebookIcon />
        </MLink>
      )}
      {instagramUrl && (
        <MLink href={instagramUrl} target="_blank" rel="noreferrer" className="p-2">
          <InstagramIcon />
        </MLink>
      )}
    </>
  )
}

export const FooterContacts = ({ address, mediaEmail, email, phone }: FooterFragment) => {
  const { t } = useTranslation(['common'], { keyPrefix: 'Footer' })

  return (
    <>
      {address && <p className="whitespace-pre-wrap">{address}</p>}
      <div className="flex flex-col gap-y-3">
        {mediaEmail && (
          <span>
            {t('contactForMedia')}{' '}
            <MLink href={`mailto:${mediaEmail}`} variant="underlined">
              {mediaEmail}
            </MLink>
          </span>
        )}
        {email && (
          <MLink className="block" href={`mailto:${email}`} variant="underlined">
            {email}
          </MLink>
        )}
        {phone && (
          <MLink className="block" href={`tel:${phone?.replace(/ /g, '')}`} variant="underlined">
            {phone}
          </MLink>
        )}
      </div>
    </>
  )
}

export const FooterAccessibilityLink = ({ accessibilityPageLink }: FooterFragment) => {
  return accessibilityPageLink ? (
    <MLink variant="underlined" {...getCommonLinkProps(accessibilityPageLink)} />
  ) : null
}

export const FooterCopyright = ({ innovationsLink }: FooterFragment) => {
  return (
    <Trans
      ns="common"
      i18nKey="Footer.copyright"
      components={{
        innovations: (
          <MLink
            variant="underlined"
            // Must be there to satisfy Typescript.
            // eslint-disable-next-line react/no-children-prop
            {...getCommonLinkProps(innovationsLink)}
          />
        ),
      }}
      values={{ year: new Date().getFullYear() }}
    />
  )
}

export const FooterColumnLinks = ({ links }: FooterColumnBlockFragment) => {
  return (
    <>
      {links?.filter(isDefined)?.map((link) => (
        <MLink variant="underlined" {...getCommonLinkProps(link)} />
      ))}
    </>
  )
}

export const FooterLanguageSwitcher = () => {
  const { otherLanguage, currentLanguage } = useLocalizations()

  return (
    <>
      {otherLanguage && (
        <>
          <MLink href={otherLanguage.path} variant="underlined" locale={otherLanguage.locale}>
            {otherLanguage.longName}
          </MLink>
          <span>/</span>
        </>
      )}
      <span className="font-semibold">{currentLanguage.longName}</span>
    </>
  )
}