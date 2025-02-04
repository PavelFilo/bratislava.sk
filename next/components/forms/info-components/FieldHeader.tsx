import cx from 'classnames'
import Tooltip from 'components/forms/info-components/Tooltip/Tooltip'
import { DOMAttributes } from 'react'

import { ExplicitOptionalType } from '../types/ExplicitOptional'

interface FieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  explicitOptional?: ExplicitOptionalType
  helptext?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: string
}

const FieldHeader = (props: FieldHeaderProps) => {
  const {
    label,
    htmlFor,
    required,
    explicitOptional = 'none',
    helptext = '',
    labelProps,
    descriptionProps,
    tooltip,
  } = props

  // STYLES
  const labelStyle = cx('text-default-respo relative font-semibold text-gray-800', {
    'after:text-default-respo font-semibold after:content-["*"] after:ml-0.5 after:absolute after:bottom-0.5 after:text-main-700':
      required,
  })

  const helptextHandler = () =>
    helptext
      .trim()
      .split('\n')
      .map((sentence, i) => <span key={i}>{sentence}</span>)

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between">
        <div className="flex w-full justify-between">
          {/* LABEL */}
          <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>
            {label}
          </label>
          {
            /* OPTIONAL */ !required && explicitOptional === 'left' && (
              <p className="text-small sm:text-default ml-2 flex items-center">(optional)</p>
            )
          }
          <div className="flex-column flex items-center">
            {
              /* TOOLTIP */
              tooltip && (
                <div
                  className={cx('flex-column flex items-center', {
                    'ml-5': required,
                    'ml-2': !required,
                  })}
                >
                  <Tooltip text={tooltip} />
                </div>
              )
            }
          </div>
        </div>
        {
          /* OPTIONAL */ !required && explicitOptional === 'right' && (
            <p className="text-small sm:text-default ml-2 flex items-center">(optional)</p>
          )
        }
      </div>
      {
        /* DESCRIPTION */
        helptext && (
          <div {...descriptionProps} className="text-default-respo mb-1 text-gray-700">
            {helptextHandler()}
          </div>
        )
      }
    </div>
  )
}

export default FieldHeader
