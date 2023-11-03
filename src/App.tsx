import { useEffect } from 'react'
import UAParser from 'ua-parser-js'

const parser = new UAParser()
const browser = parser.getBrowser()
const os = parser.getOS()

export const App = () => {
  useEffect(() => {
    console.log({ os, browser })
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      event.preventDefault()
      console.log(event.key)
    }

    document.addEventListener('keydown', handleKeyboardEvent)

    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent)
    }
  }, [])

  return (
    <>
      <h1>Sanity check.</h1>
    </>
  )
}
