import CalendarIcon from '@assets/images/forms/calendar-icon.svg'
import cx from 'classnames'
import FieldErrorMessage from 'components/forms/info-components/FieldErrorMessage'
import { forwardRef, ReactNode, RefObject, useRef } from 'react'
import { I18nProvider, OverlayProvider, useButton, useDatePicker } from 'react-aria'
import { useDatePickerState } from 'react-stately'

import { usePageWrapperContext } from '../../../layouts/PageWrapper'
import Calendar from './Calendar/Calendar'
import DateField from './DateField'
import Popover from './Popover'

type ButtonBase = {
  children?: ReactNode
  className?: string
}

const Button = ({ children, className, ...rest }: ButtonBase) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton({ children, ...rest }, ref)
  return (
    <button
      className={cx('focus:outline-none', className)}
      type="button"
      {...buttonProps}
      ref={ref}
    >
      {children}
    </button>
  )
}

type DatePickerBase = {
  label?: string
  description?: string
  tooltip?: string
  required?: boolean
  explicitOptional?: boolean
  disabled?: boolean
  errorMessage?: string
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerBase>(
  (
    { label, disabled, errorMessage, required, explicitOptional, tooltip, description, ...rest },
    ref,
  ) => {
    const { locale } = usePageWrapperContext()
    const state = useDatePickerState({
      label,
      errorMessage,
      isRequired: required,
      isDisabled: disabled,
      ...rest,
      shouldCloseOnSelect: false,
    })
    const { fieldProps, buttonProps, calendarProps, dialogProps, errorMessageProps } =
      useDatePicker(
        { errorMessage, isDisabled: disabled, label, ...rest },
        state,
        ref as RefObject<HTMLDivElement>,
      )

    const closeHandler = () => {
      state?.close()
      // https://github.com/adobe/react-spectrum/discussions/3318
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state?.setDateValue(null)
    }
    return (
      <I18nProvider locale={locale}>
        <div className="relative w-full max-w-xs">
          <div ref={ref}>
            <DateField
              {...fieldProps}
              label={label}
              description={description}
              required={required}
              explicitOptional={explicitOptional}
              disabled={disabled}
              tooltip={tooltip}
              errorMessage={errorMessage}
              isOpen={state?.isOpen}
            >
              <Button {...buttonProps} className={disabled ? 'opacity-50' : ''}>
                <CalendarIcon />
              </Button>
            </DateField>
          </div>
          {state?.isOpen && (
            <OverlayProvider>
              <Popover {...dialogProps} isOpen={state?.isOpen} onClose={closeHandler}>
                <Calendar
                  {...calendarProps}
                  onClose={closeHandler}
                  onSubmit={() => state?.close()}
                />
              </Popover>
            </OverlayProvider>
          )}
          {!disabled && (
            <FieldErrorMessage errorMessage={errorMessage} errorMessageProps={errorMessageProps} />
          )}
        </div>
      </I18nProvider>
    )
  },
)

export default DatePicker