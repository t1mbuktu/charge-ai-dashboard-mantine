import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Text, RangeSlider, Stack, Accordion, Slider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from '../../../../../hooks/storeHooks';
import { Car } from '../../../../../models/Car';
import { SimulationEntry } from '../../../../../models/SimulationEntry';
import dayjs from 'dayjs';
import { saveSim } from '../../../../../redux/simulation-entries/SimulationEntriesSlice';
import { TimeSlot } from '../../../../../models/TimeSlot';
import classes from './DepartureArival.module.css';
import { getReport } from '../../../../../redux/report/ReportSlice';

dayjs.locale('de')

const timeMarks = [
    { value: 0, label: '00:00' },
    { value: 2, label: '02:00' },
    { value: 4, label: '04:00' },
    { value: 6, label: '06:00' },
    { value: 8, label: '08:00' },
    { value: 10, label: '10:00' },
    { value: 12, label: '12:00' },
    { value: 14, label: '14:00' },
    { value: 16, label: '16:00' },
    { value: 18, label: '18:00' },
    { value: 20, label: '20:00' },
    { value: 22, label: '22:00' },
    { value: 24, label: '24:00' }
];

const allTimeMarks = [
    { value: 0, label: '00:00' },
    { value: 1, label: '01:00' },
    { value: 2, label: '02:00' },
    { value: 3, label: '03:00' },
    { value: 4, label: '04:00' },
    { value: 5, label: '05:00' },
    { value: 6, label: '06:00' },
    { value: 7, label: '07:00' },
    { value: 8, label: '08:00' },
    { value: 9, label: '09:00' },
    { value: 10, label: '10:00' },
    { value: 11, label: '11:00' },
    { value: 12, label: '12:00' },
    { value: 13, label: '13:00' },
    { value: 14, label: '14:00' },
    { value: 15, label: '15:00' },
    { value: 16, label: '16:00' },
    { value: 17, label: '17:00' },
    { value: 18, label: '18:00' },
    { value: 19, label: '19:00' },
    { value: 20, label: '20:00' },
    { value: 21, label: '21:00' },
    { value: 22, label: '22:00' },
    { value: 23, label: '23:00' },
    { value: 24, label: '24:00' }
];

const batteryMarks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
]

function getNext7DaySims(carId: string, uid: string): SimulationEntry[] {
    const sims: SimulationEntry[] = [];
    let currentDate = dayjs();
    

    for (let i = 0; i < 7; i++) {
        sims.push({date: currentDate.format('YYYY-MM-DDTHH:mm'), carId: carId, uid: uid});
        currentDate = currentDate.add(1, 'day');
    }

    return sims
}

function formatHour(hour: number): string {
    if (hour === 24) {
        return '24:00';
    } else {
        const formattedHour = hour.toString().padStart(2, '0');
        return `${formattedHour}:00`;
    }
}

function combineDateAndTime(date: string, time: string): string {
    const formattedDate = dayjs(date).format('YYYY-MM-DD'); 
    const dateTime = `${formattedDate} ${time}`;

    return dayjs(dateTime).format('YYYY-MM-DDTHH:mm');
}

type Props = {
    car: Car
}

export type DepartureArivalRef = {
    save: () => void
}

export const DepartureArival = forwardRef<DepartureArivalRef, Props>((props, ref) => {
    const dispatch = useAppDispatch();

    const { car } = props;
    const { simEntries: sims } =  useAppSelector(s => s.sims);
    const { currentUser } = useAppSelector(s => s.common);
    const { cars } = useAppSelector(s => s.cars);
    const { settings } = useAppSelector(s => s.settings);

    const getSims = () => {
        const emptySims = getNext7DaySims(car.id!, currentUser?.id!);

        const allSims = emptySims.map(es => {
            const excSim = sims.find(s => dayjs(s.date).format('DD/MM/YYYY') === dayjs(es.date).format('DD/MM/YYYY') && s.carId === car.id)
            if(excSim) {
                return excSim
            }
            return es
        });

        return allSims
    }

    const [simEntries, setSimEntries] = useState<SimulationEntry[]>(getSims())

    useImperativeHandle(
        ref,
        () => ({
            save() {
                //console.log('saved', simEntries)
                simEntries.map(sim => {
                    if(sim.from && sim.to && sim.batteryLevel) {
                        dispatch(saveSim(sim));
                    }
                });
                dispatch(getReport({settings: settings!, cars: cars, sim_data: simEntries}));
                console.log('report refreshed')
            },
        }),
    );

    const onTimeSlotChange = (date: string, {from, to}: TimeSlot) => {
        setSimEntries(simEntries.map(se => se.date === date ? {...se, from: from, to: to} : se))
    };

    const onBatteryLevelChange = (date: string, batteryLevel: number) => {
        setSimEntries(simEntries.map(se => se.date === date ? {...se, batteryLevel: batteryLevel / 100} : se))
    };

    useEffect(() => {
        setSimEntries(getSims());
    }, [sims, car])

    return (
        <Accordion classNames={classes} transitionDuration={0} radius={'md'}>
            {simEntries.map(date => (
                <Accordion.Item value={date.date.toString()} key={date.date.toString()}>
                    <Accordion.Control>
                        <Text size="md" fw={600}>
                            {dayjs(date.date).format('dddd')}
                        </Text>
                    </Accordion.Control>
                    <Accordion.Panel className={classes.acccontent}>
                        <Stack gap={40}>
                        <Stack>
                        <Text size="sm">
                            Departure / Arrival
                        </Text>
                        <RangeSlider
                            min={0}
                            max={24}
                            minRange={0}
                            showLabelOnHover={false}
                            defaultValue={date.from && date.to ? [dayjs(date.from).hour(), dayjs(date.to).hour() === 0 ? 24 : dayjs(date.to).hour()] : [0, 0]}
                            marks={timeMarks}
                            label={v => allTimeMarks.filter(m => m.value === v)[0].label}
                            onChangeEnd={v => 
                                onTimeSlotChange(
                                    date.date, 
                                    {
                                        from: combineDateAndTime(date.date, formatHour(v[0])), 
                                        to: combineDateAndTime(date.date, formatHour(v[1]))
                                    }
                                )
                            }
                            
                        />
                        </Stack>
                        <Stack>
                            <Text size="sm">
                                Battery level at arrival
                            </Text>
                            <Slider
                                marks={batteryMarks}
                                label={v => `${v}%`} 
                                color={'green'}
                                defaultValue={date.batteryLevel ? date.batteryLevel * 100 : 0}
                                onChangeEnd={v => 
                                    onBatteryLevelChange(
                                        date.date, 
                                        v
                                    )
                                }
                            />
                        </Stack>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
  )
})