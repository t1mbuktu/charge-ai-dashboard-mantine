import { LoadingOverlay as LO } from '@mantine/core';


type Props = {
    show?: boolean
}

function LoadingOverlay({show}: Props) {
  return (
    <LO visible={show !== undefined ? show : true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
  )
}

export default LoadingOverlay