import { NumberInput, TextInput, Text, Slider, Stack, Checkbox } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/storeHooks'
import classes from './CarSettings.module.css'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Car } from '../../../../../models/Car'
import { useDisclosure } from '@mantine/hooks'
import DeleteModal from '../../../../shared/delete-modal/DeleteModal'
import { deleteCar, saveCar } from '../../../../../redux/car/CarSlice'

type Props = {
    car: Car
}

export type CarSettingsRef = {
    save: () => void
    delete: () => void
}

export const CarSettings = forwardRef<CarSettingsRef, Props>((props, ref) => {
    const dispatch = useAppDispatch();
    const {car} = props;
    
    const { currentUser } = useAppSelector(s => s.common)
    const [carToEdit, setCarToEdit] = useState<Car>({ ...car });
    const [showDeleteModal, { toggle: toggleDeleteModal }] = useDisclosure(false);

    const onDelete = () => {
        dispatch(deleteCar(car));
        toggleDeleteModal();
    };

    useImperativeHandle(
        ref,
        () => ({
                save() {
                    dispatch(saveCar({ ...carToEdit, uid: currentUser?.id! }));
                },
                delete() {
                    toggleDeleteModal();
                },
        }),
    );

    useEffect(() => {
        setCarToEdit(car);
    }, [car]);

    return (
        
                <Stack >
                    <TextInput
                        label={'Name'}
                        description={'enter a name to identify your car'}
                        withAsterisk
                        value={carToEdit.name}
                        onChange={(evt) => setCarToEdit({ ...carToEdit, name: evt.currentTarget.value })}
                    />
                    <NumberInput
                        label={'Battery Capacity'}
                        description={'enter the battery capacity in kWh'}
                        rightSection={'kWh'}
                        rightSectionWidth={45}
                        withAsterisk
                        value={carToEdit.batteryCapacity}
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
                    <DeleteModal
                        show={showDeleteModal}
                        onDismiss={toggleDeleteModal}
                        onDelete={onDelete}
                        itemToDelete={car.name}
                    />
                </Stack>
    )
})