import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { DepartureArival, DepartureArivalRef } from '../../../dashboard/overview/departure-arival-drawer/departure-arival/DepartureArival'
import { Car } from '../../../../models/Car'
import { Grid, GridCol, Group, Stack, Text } from '@mantine/core'
import { useAppSelector } from '../../../../hooks/storeHooks'
import { IconCar } from '@tabler/icons-react'
import classes from './DepartureArivalSetup.module.css'



export const DepartureArivalSetup = forwardRef<DepartureArivalRef, {}>((props, ref) => {
    const daRef = useRef<DepartureArivalRef>(null);
    const { cars } = useAppSelector(s => s.cars);
    const [selectedCar, setSelectedCar] = useState<Car>(cars[0]);

    useImperativeHandle(
        ref,
        () => ({
            save() {
                daRef.current?.save();
            },
        }),
    );

    useEffect(() => {
        setSelectedCar(cars[0]);
    }, [cars])
    
    

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
                </Stack>
            </GridCol>
            <GridCol className={classes.right} span={9}>
                <DepartureArival car={selectedCar} ref={daRef}/>
            </GridCol>  
        </Grid>
    )
})