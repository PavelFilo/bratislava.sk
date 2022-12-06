import * as React from 'react'
import { useCheckboxGroup } from 'react-aria'
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately'

export const CheckboxGroupContext = React.createContext({} as CheckboxGroupState)

type CheckBoxGroupBase = {
  children: React.ReactNode
  value?: string[]
  label?: string
  className?: string
  onChange: (value: any[]) => void
}

const CheckboxGroup = (props: CheckBoxGroupBase) => {
  const { children, className } = props
  const state: CheckboxGroupState = useCheckboxGroupState(props)
  const { groupProps } = useCheckboxGroup(props, state)

  return (
    <div {...groupProps} className={className}>
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup
