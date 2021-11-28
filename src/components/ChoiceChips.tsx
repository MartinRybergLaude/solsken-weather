import React from 'react'
import styles from './ChoiceChips.module.scss'

export interface Pair {
  key: string
  value: string
}
interface Props {
  setSelected: (name: string) => void
  selected: string
  options: Pair[]
}
export default function ChoiceChips(props: Props) {
  function getSelectedClass(selected: string): string {
    return selected === props.selected  ? styles.chipSelected : ""
  }
  return (
    <>
      {props.options.map((item, index) => {
        return (
        <div className={styles.chip + " " + getSelectedClass(item.key)} onClick={() => props.setSelected(item.key)}>
          <p>{item.value}</p>
        </div>
        )
      })}
    </>
  )
}
