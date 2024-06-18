import { Modal } from '@mantine/core'
import Auth from './login-container/Auth'


type Props = {
    show: boolean
    onDismiss: () => void
}

function LoginModal({show, onDismiss}: Props) {


  return (
    <Modal 
      opened={show} 
      onClose={onDismiss} 
      withCloseButton={false} 
      fullScreen
      closeOnEscape={false}
    >
        <Auth/>
    </Modal>
  )
}

export default LoginModal