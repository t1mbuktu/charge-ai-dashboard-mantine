import { Modal, Title, Group, Button, Box } from '@mantine/core'
import { Car } from '../../../../models/Car'
import classes from './CarSettingsModal.module.css'
import { useRef } from 'react'
import { useAppSelector } from '../../../../hooks/storeHooks'
import { StateStatus } from '../../../../models/enums/StateStatus'
import LoadingOverlay from '../../../shared/loading-overlay/LoadingOverlay'
import { CarSettings, CarSettingsRef } from './car-settings/CarSettings'

type Props = {
    car: Car
    show: boolean
    onDismiss: () => void
}

function CarSettingsModal({ car, show, onDismiss }: Props) {
    const { status } = useAppSelector(s => s.cars);
    const csRef = useRef<CarSettingsRef>(null)

    const onSave = () => {
        csRef.current?.save();
        onDismiss();
    };

    const onDelete = () => {
        csRef.current?.delete()
    };

    const onCancel = () => {
        onDismiss();
    };

    return (

        <Modal.Root
            className={classes.root}
            opened={show}
            onClose={onDismiss}
            radius='md'
            closeOnClickOutside={false}
            closeOnEscape={false}
        >
            <Modal.Overlay >
                <Modal.Content className={classes.content}>
                    <Box>
                        {status === StateStatus.loading && <LoadingOverlay />}
                        <Modal.Header className={classes.header}>
                            <Title order={2}>
                                {car.id ? `${car.name} Settings` : 'Add new car'}
                            </Title>
                            <Modal.CloseButton />
                        </Modal.Header>
                        <Modal.Body>
                            <CarSettings car={car} ref={csRef}/>
                            <Group className={classes.footer} justify='space-between'>
                                <Button color="rgba(190, 2, 2, 1)" onClick={onDelete}>Delete Car</Button>
                                <Group gap={'xs'}>
                                    <Button onClick={onSave}>Save</Button>
                                    <Button color='gray' variant="light" onClick={onCancel}>Cancel</Button>
                                </Group>
                            </Group>
                        </Modal.Body>
                    </Box>
                </Modal.Content>
            </Modal.Overlay>
        </Modal.Root>

    )
}

export default CarSettingsModal