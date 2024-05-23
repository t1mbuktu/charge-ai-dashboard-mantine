import { Modal, Title } from "@mantine/core"
import PersonalSettings from "./PersonalSettings.tsx/PersonalSettings"

type Props = {
  show: boolean
  onDismiss: () => void
}

function SettingsModal({show, onDismiss}: Props) {
  return (
    <Modal 
            opened={show} 
            onClose={onDismiss} 
            title={
                <Title order={2}>
                Settings
                </Title>
            }
        >
        <PersonalSettings />
        </Modal>
  )
}

export default SettingsModal