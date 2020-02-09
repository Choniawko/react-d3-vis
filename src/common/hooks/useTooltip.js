import { useState } from "react"

export const useTooltip = () => {
  const [visibled, setVisibled] = useState(false)
  const [[positionLeft, positionTop], sePosition] = useState([0, 0])
  const [value, setValue] = useState(false)
  const handleShowTooltip = () => {
    setVisibled(true)
  }
  const handleHideTooltip = () => {
    setVisibled(false)
  }
  const handleMoveTooltip = ({ x0, x1 }) => ({ clientX, clientY }) => {
    sePosition([clientX, clientY])
    setValue(`Range: ${x0} - ${x1}`)
  }
  return {
    visibled,
    position: [positionLeft, positionTop],
    value,
    handleShowTooltip,
    handleHideTooltip,
    handleMoveTooltip,
  }
}
