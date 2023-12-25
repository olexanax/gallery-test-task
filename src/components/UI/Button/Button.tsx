//libs
import { FC, ReactNode } from 'react'
import classNames from 'classnames'
//styles
import styles from "./styles.module.scss"

interface Props {
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void,
  props?: { [key: string]: string | number | boolean }
  isLoading?: boolean
}


const Button: FC<Props> = ({ children, disabled, onClick, props, isLoading }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={classNames(styles.button, disabled ? styles.disabled : '', isLoading ? styles.loading : '')}
    >
      {isLoading ? "Loading..." : children}
    </button>
  )
}

export default Button