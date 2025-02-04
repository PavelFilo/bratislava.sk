import { ArrowLeftIcon } from '@assets/ui-icons'
import CloseIcon from '@components/forms/icon-components/CloseIcon'
import cx from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'

import Button from '../../simple-components/Button'

type ModalBase = {
  show: boolean
  divider?: boolean
  onClose: () => void
  onSubmit: (params: OnSubmitParams) => void
  content: (({}: any) => JSX.Element)[] | (({}: any) => JSX.Element)
  header?: string
  confirmLabel?: string
  cancelLabel?: string
  className?: string
}

type OnSubmitParams = {
  data?: any
}

type ModalHeaderBase = Omit<
  ModalBase,
  'content' | 'confirmLabel' | 'cancelLabel' | 'onSubmit' | 'show' | 'startedIndex'
> & {
  hasHeader: boolean
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
  header?: string
}

const ModalHeader = ({
  divider = false,
  onClose,
  currentScreenIndex,
  setCurrentScreenIndex,
  header,
  hasHeader,
}: ModalHeaderBase) => {
  const headerStyle = cx('flex justify-between gap-6 bg-white px-6 py-4 sm:rounded-t-lg', {
    'border-b-solid border-b-form-input-default border-b-2': divider,
  })
  const headlineStyle = cx('text-large h-7 font-semibold', {
    'text-center ml-1': currentScreenIndex > 0,
  })

  if (!hasHeader) return null

  return (
    <div className={headerStyle}>
      {currentScreenIndex > 0 ? (
        <div
          className="ml-1 flex cursor-pointer flex-row items-center"
          onClick={() => {
            setCurrentScreenIndex(currentScreenIndex - 1)
          }}
        >
          <ArrowLeftIcon />
        </div>
      ) : null}
      <div className={headlineStyle}>{header}</div>
      <div className="ml-1 flex flex-row items-center justify-end">
        <CloseIcon className="cursor-pointer" type="info" onClick={onClose} />
      </div>
    </div>
  )
}

type ModalFooterBase = Omit<ModalBase, 'content' | 'header' | 'show' | 'startedIndex'> & {
  hasFooter: boolean
  currentScreenIndex: number
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>
  contentLength: number
}

const ModalFooter = ({
  divider,
  onClose,
  currentScreenIndex,
  setCurrentScreenIndex,
  contentLength,
  hasFooter,
  confirmLabel,
  cancelLabel,
  onSubmit,
}: ModalFooterBase) => {
  const footerStyle = cx(
    'w-592 flex h-18 items-center justify-between gap-6 rounded-b-lg bg-white px-6 py-3',
    {
      'border-t-solid border-t-form-input-default border-t-2': divider,
    },
  )

  if (!hasFooter) return null

  return (
    <div className={footerStyle}>
      <button
        className="text-default flex cursor-pointer items-center font-semibold"
        onClick={onClose}
        type="button"
      >
        <span aria-hidden="true">{cancelLabel}</span>
      </button>
      <Button
        variant="black"
        size="sm"
        onPress={() => {
          if (currentScreenIndex < contentLength - 1) {
            setCurrentScreenIndex(currentScreenIndex + 1)
          } else {
            setCurrentScreenIndex(0)
            onSubmit({})
          }
        }}
      >
        {currentScreenIndex >= contentLength - 1 ? confirmLabel : 'Next'}
      </Button>
    </div>
  )
}

const ModalBody = ({
  content,
  currentScreenIndex,
  hasHeader,
  hasFooter,
  onSubmit,
  onClose,
}: {
  content: ((props?: any) => JSX.Element)[] | ((props?: any) => JSX.Element)
  currentScreenIndex: number
  hasHeader: boolean
  hasFooter: boolean
  onClose: () => void
  onSubmit: (params: OnSubmitParams) => void
}) => {
  return (
    <div
      className={cx('flex h-full w-full flex-col bg-white p-6', {
        'rounded-t-10': !hasHeader,
        'rounded-b-10': !hasFooter,
      })}
    >
      {hasHeader ? null : (
        <div className="ml-1 flex flex-row items-center justify-end">
          <CloseIcon className="cursor-pointer" type="info" onClick={onClose} />
        </div>
      )}
      <div className="flex h-[calc(100%-80px)] w-full flex-col items-start rounded-lg p-2">
        {Array.isArray(content)
          ? content.length - 1 >= currentScreenIndex && content[currentScreenIndex]()
          : content({ onSubmit })}
      </div>
    </div>
  )
}

const Modal = ({
  show,
  onClose,
  content,
  onSubmit,
  divider = false,
  header,
  confirmLabel,
  cancelLabel,
  className,
}: ModalBase) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0)

  // useEffect(() => {
  //   document.body.style.overflow = show ? 'hidden' : ''
  // }, [show])

  if (!show) {
    return null
  }

  const hasHeader = Array.isArray(content) || Boolean(header)
  const hasFooter = Array.isArray(content)
  return (
    <div
      className="fixed inset-x-0 top-0 z-20 flex h-full w-full items-center justify-center"
      style={{ background: 'rgba(var(--color-gray-800), .4)', marginTop: '0' }}
      onClick={() => {
        setCurrentScreenIndex(0)
        onClose()
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className={cx('rounded-full shadow-lg', className)}>
        <ModalHeader
          header={header}
          currentScreenIndex={currentScreenIndex}
          setCurrentScreenIndex={setCurrentScreenIndex}
          divider={divider}
          hasHeader={hasHeader}
          onClose={() => {
            setCurrentScreenIndex(0)
            onClose()
          }}
        />
        <ModalBody
          content={content}
          hasHeader={hasHeader}
          hasFooter={hasFooter}
          currentScreenIndex={currentScreenIndex}
          onSubmit={onSubmit}
          onClose={onClose}
        />
        <ModalFooter
          onSubmit={onSubmit}
          confirmLabel={confirmLabel}
          currentScreenIndex={currentScreenIndex}
          contentLength={content.length}
          setCurrentScreenIndex={setCurrentScreenIndex}
          hasFooter={hasFooter}
          cancelLabel={cancelLabel}
          divider
          onClose={() => {
            setCurrentScreenIndex(0)
            onClose()
          }}
        />
      </div>
    </div>
  )
}

export default Modal
