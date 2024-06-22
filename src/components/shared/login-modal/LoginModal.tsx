import { Modal } from '@mantine/core'
import Auth from './login-container/Auth'


type Props = {
    show: boolean
}

function LoginModal({show}: Props) {


  return (
    <Modal 
      opened={show}
      onClose={() => console.log('')}
      withCloseButton={false} 
      fullScreen
      closeOnEscape={false}
    >
        <Auth/>
    </Modal>
  )
}

export default LoginModal