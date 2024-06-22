import { Button, Grid, GridCol, Group, Stack, Text } from '@mantine/core'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Car } from '../../../../models/Car'
import { IconCar } from '@tabler/icons-react';
import { useAppSelector } from '../../../../hooks/storeHooks';

import classes from './CarSetup.module.css'
import { CarSettings, CarSettingsRef } from '../../../dashboard/overview/car-settings-modal/car-settings/CarSettings';

export type CarSetupRef = {
    save: () => void
}

export const CarSetup = forwardRef<CarSetupRef, {}>((props, ref) => {
    const csRef = useRef<CarSettingsRef>(null);
    const {cars: savedCars} = useAppSelector(s => s.cars);

    const [cars, setCars] = useState<Car[]>(savedCars);
    const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);

    const onAddNew = () => {
        setSelectedCar({
            id: undefined,
            uid: '',
            name: '',
            hybrid: false,
            batteryLevel: 0,
            batteryCapacity: 0,
            chargeLimit: 0,
            maxChargeSpeed: 0
        })
    };

    const onSaveNew = () => {
        csRef.current?.save();
    }

    useImperativeHandle(
        ref,
        () => ({
                save() {
                    csRef.current?.save();
                }
        }),
    );

    useEffect(() => {
        setCars(savedCars);
        setSelectedCar(savedCars[0]);
    }, [savedCars])
    

    return (
        <Grid classNames={{inner: classes.root}}>
            <GridCol className={classes.left} span={3}>
                <Stack>
                    {cars.length > 0 && cars?.map(car => 
                        <Group 
                            className={[classes.carItem, selectedCar === car && classes.selected].join(' ')} 
                            onClick={() => setSelectedCar(car)}>
                            <IconCar />
                            <Text>{car.name}</Text>
                        </Group>
                    )}
                    <Button className={classes.addBtn} onClick={onAddNew} variant="outline">Add New</Button>
                </Stack>
            </GridCol>
            <GridCol className={classes.right} span={9}>
                {selectedCar && <CarSettings car={selectedCar} ref={csRef}/>}
                {selectedCar && !selectedCar?.id && <Button onClick={onSaveNew}>Add</Button>}
            </GridCol>
            
        </Grid>
    )
})