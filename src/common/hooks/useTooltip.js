import { useState } from "react"

export const useTooltip = () => {
  const [visibled, setVisibled] = useState(false)
  const [[positionLeft, positionTop], sePosition] = useState([0, 0])
  const [value, setValue] = useState(false)
  const handleShow = () => {
    setVisibled(true)
  }
  const handleHide = () => {
    setVisibled(false)
  }
  const handleMove = value => ({ clientX, clientY }) => {
    sePosition([clientX + 20, clientY - 100])
    setValue(value)
  }
  return {
    visibled,
    position: [positionLeft, positionTop],
    value,
    handleShow,
    handleHide,
    handleMove,
  }
}
