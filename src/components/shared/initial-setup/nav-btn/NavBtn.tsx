import { Button, Group } from '@mantine/core'

type Props = {
    className?: string;
    onSaveNext?: () => void,
    onPrev?: () => void
    showSaveNext?: boolean,
    showPrev?: boolean
}

function NavBtn({className, onSaveNext, onPrev, showSaveNext = true, showPrev = true}: Props) {
  return (
    <Group className={className} justify='flex-end'>
        {showPrev &&
        <Button variant="light" color="gray" onClick={onPrev}>Back</Button>}    
        {showSaveNext &&
        <Button variant="filled" onClick={onSaveNext}>Save & Next</Button>}
    </Group>
  )
}

export default NavBtn