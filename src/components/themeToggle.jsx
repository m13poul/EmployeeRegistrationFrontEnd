import React from 'react'
import { useSelector } from 'react-redux'
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { useDispatch } from 'react-redux'
import { setDarkTheme } from '../features/themeSlice'
import useTheme from '../Hooks/useTheme'

function ThemeToggle() {
  const dark = useSelector(state => state.theme.dark)
  const dispatch = useDispatch()
  const { changeTheme } = useTheme()

  return (
    <div title='Switch Theme'>
      {dark === 'dark' ? (
        <MdLightMode onClick={() => {
          dispatch(setDarkTheme('light'))
          changeTheme()
        }} />
      ) : (
        <MdDarkMode onClick={() => {
          dispatch(setDarkTheme('dark'))
          changeTheme()
        }} />
      )}
    </div>
  )
}

export default ThemeToggle