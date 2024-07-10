import { useState } from 'react'
import Warning from './Warning'

export default function Textarea() {
  const [text, setText] = useState()
  const [showWarning, setShowWarning] = useState(false)
  const [warningText, setWarningText] = useState('')

  const handleChange = (e) => {
    let newText = e.target.value

    if (newText.includes('<script>')) {
      setWarningText('No script tag allowed!')
      setShowWarning(true)
      newText = newText.replace('<script>', '')
    } else if (newText.includes('@')) {
      setWarningText('No @ symbol allowed!')
      setShowWarning(true)
      newText = newText.replace('@', '')
    } else {
      setWarningText('')
    }

    setText(newText)
  }
  return (
    <>
      <textarea
        value={text}
        className="textarea"
        onChange={handleChange}
        placeholder="Enter your text"
        spellCheck="false"
      />
      <Warning warningText={warningText} />
    </>
  )
}
