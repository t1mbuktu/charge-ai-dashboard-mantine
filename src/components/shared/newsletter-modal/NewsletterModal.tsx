import { Button, Group, Modal, Text, TextInput } from '@mantine/core'
import classes from './NewsletterModal.module.css'

type Props = {
    show: boolean
    onDismiss: () => void
}

function NewsletterModal({show, onDismiss}: Props) {


  return (
    <Modal 
        opened={show} 
        onClose={onDismiss} 
        withCloseButton
        title='Newsletter'
        closeOnEscape={false}
    >
        <Text>Subscribe to our Newsletter to get Infos about our release and future features</Text>
        <Group className={classes.input} align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
    </Modal>
  )
}

export default NewsletterModal