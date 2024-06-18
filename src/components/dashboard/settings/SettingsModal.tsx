import { Button, Modal, Title } from "@mantine/core"
import { PersonalSettings, PersonalSettingsRef } from "./PersonalSettings.tsx/PersonalSettings"
import { useRef } from "react"
import classes from './Settings.module.css'

type Props = {
  show: boolean
  onDismiss: () => void
}

function SettingsModal({show, onDismiss}: Props) {
  const psRef = useRef<PersonalSettingsRef>(null)

  const onSave = () => {
    psRef.current?.save();
    onDismiss();
  }

  return (
    <Modal
      opened={show} 
      onClose={onDismiss}
      closeOnEscape={false}
      title={
          <Title order={2}>
          Settings
          </Title>
    }
    >
      <PersonalSettings ref={psRef}/>
      <Button className={classes.save} onClick={onSave}>Save</Button>
    </Modal>
  )
}

export default SettingsModal