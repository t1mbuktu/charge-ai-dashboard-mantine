import { Button, Group, Modal, Text } from "@mantine/core"
import classes from './DeleteModal.module.css'

type Props = {
    itemToDelete: string
    onDelete: () => void
    show: boolean
    onDismiss: () => void
}

function DeleteModal({itemToDelete, onDelete, show, onDismiss}: Props) {
  return (
    <Modal opened={show} onClose={onDismiss} title={'Delete?'}>
        <Text className={classes.body}>
            {`Are you shure you want to delete ${itemToDelete}?`}
        </Text>
        <Group justify="flex-end">
            <Button color="rgba(190, 2, 2, 1)" onClick={onDelete}>Delete</Button>
            <Button color='gray' variant="light" onClick={onDismiss}>Cancel</Button>
        </Group>
    </Modal>
  )
}

export default DeleteModal