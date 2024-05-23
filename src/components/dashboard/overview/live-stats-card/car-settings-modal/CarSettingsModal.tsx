import { Modal, NumberInput, TextInput, Title, Text, Slider, Stack, Group, Button, Checkbox, Box } from '@mantine/core'
import { Car } from '../../../../../models/Car'
import classes from './CarSettingsModal.module.css'
import DeleteModal from '../../../../shared/delete-modal/DeleteModal'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/storeHooks'
import { deleteCar, saveCar } from '../../../../../redux/car/CarSlice'
import { StateStatus } from '../../../../../models/enums/StateStatus'
import LoadingOverlay from '../../../../shared/loading-overlay/LoadingOverlay'

type Props = {
    car: Car
    show: boolean
    onDismiss: () => void
}

function CarSettingsModal({ car, show, onDismiss }: Props) {

    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector(s => s.common)
    const { status } = useAppSelector(s => s.cars)
    const [showDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false);
    const [carToEdit, setCarToEdit] = useState<Car>({ ...car });

    const onSave = () => {
        dispatch(saveCar({ ...carToEdit, uid: currentUser?.id! }));
        onDismiss();
    };

    const onCancel = () => {
        onDismiss();
    };

    const onDelete = () => {
        dispatch(deleteCar(car));
        toggleDeleteModal();
        onDismiss()
    };

    useEffect(() => {
        setCarToEdit(car);
    }, [show])

    return (

        <Modal.Root
            className={classes.root}
            opened={show}
            onClose={onDismiss}
            radius='md'
            closeOnClickOutside={false}
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
                            <Stack >
                                <TextInput
                                    label={'Name'}
                                    description={'enter a name to identify your car'}
                                    withAsterisk
                                    defaultValue={carToEdit.name}
                                    onChange={(evt) => setCarToEdit({ ...carToEdit, name: evt.currentTarget.value })}
                                />
                                <NumberInput
                                    label={'Battery Capacity'}
                                    description={'enter the battery capacity in kWh'}
                                    rightSection={'kWh'}
                                    rightSectionWidth={45}
                                    withAsterisk
                                    defaultValue={carToEdit.batteryCapacity}
                                    onChange={(v) => setCarToEdit({ ...carToEdit, batteryCapacity: Number(v) })}
                                />
                                <Stack className={classes.sliderWrapper}>
                                    <Text size="sm" fw={500}>Charge Limit</Text>
                                    <Slider
                                        defaultValue={80}
                                        label={(value) => `${value} %`}
                                        color='green'
                                        marks={[

                                            { value: 20, label: '20%' },
                                            { value: 40, label: '40%' },
                                            { value: 60, label: '60%' },
                                            { value: 80, label: '80%' },
                                        ]}
                                        value={carToEdit.chargeLimit * 100}
                                        onChange={(v) => setCarToEdit({ ...carToEdit, chargeLimit: v / 100 })}
                                    />
                                </Stack>
                                <NumberInput
                                    label={'Max. Charging Speed'}
                                    description={'enter the max. charging speed in kW'}
                                    rightSection={'kW'}
                                    rightSectionWidth={40}
                                    withAsterisk
                                    value={carToEdit.maxChargeSpeed}
                                    onChange={(v) => setCarToEdit({ ...carToEdit, maxChargeSpeed: Number(v) })}
                                />
                                <Checkbox
                                    label={'hybrid'}
                                    description={'select if the car is a  hybrid'}
                                    checked={carToEdit.hybrid}
                                    onChange={(evt) => setCarToEdit({ ...carToEdit, hybrid: evt.currentTarget.checked })}
                                />
                                <Group className={classes.footer} justify='space-between'>
                                    <Button color="rgba(190, 2, 2, 1)" onClick={toggleDeleteModal}>Delete Car</Button>
                                    <Group gap={'xs'}>
                                        <Button onClick={onSave}>Save</Button>
                                        <Button color='gray' variant="light" onClick={onCancel}>Cancel</Button>
                                    </Group>
                                </Group>
                            </Stack>
                        </Modal.Body>
                    </Box>
                </Modal.Content>
            </Modal.Overlay>
            <DeleteModal
                show={showDeleteModal}
                onDismiss={toggleDeleteModal}
                onDelete={onDelete}
                itemToDelete={car.name}
            />
        </Modal.Root>

    )
}

export default CarSettingsModal