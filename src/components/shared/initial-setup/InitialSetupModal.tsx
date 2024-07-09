import { Modal, Stack, Stepper, Title } from '@mantine/core'
import { IconCalendarTime, IconCar, IconSolarPanel } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import classes from './InitialSetupModal.module.css'
import { PersonalSettings, PersonalSettingsRef } from '../../dashboard/settings/PersonalSettings.tsx/PersonalSettings';
import NavBtn from './nav-btn/NavBtn';
import { CarSetup, CarSetupRef } from './car-setup/CarSetup';
import { DepartureArivalRef } from '../../dashboard/overview/departure-arival-drawer/departure-arival/DepartureArival';
import { DepartureArivalSetup } from './departure-arival-setup/DepartureArivalSetup';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getReport } from '../../../redux/report/ReportSlice';
import { saveSettings } from '../../../redux/settings/SettingsSlice';

type Props = {
    show: boolean;
    onDismiss: () => void;
}

function InitialSetupModal({show, onDismiss}: Props) {
    const dispatch = useAppDispatch();
    const csRef = useRef<CarSetupRef>(null);
    const psRef = useRef<PersonalSettingsRef>(null);
    const daRef = useRef<DepartureArivalRef>(null);

    const { cars } = useAppSelector(s => s.cars);
    const { settings } = useAppSelector(s => s.settings);
    const { simEntries } = useAppSelector(s => s.sims)

    const [activeTab, setActiveTab] = useState(0)

    const onNavNext = () => {
        if(activeTab < 2) {
            onSave();
            setActiveTab(activeTab + 1);
        } else {
            onSave();
            dispatch(saveSettings({...settings!, setupCompleted: true}));
            dispatch(getReport({settings: settings!, cars: cars, sim_data: simEntries}));
            onDismiss();
        }
    };

    const onNavPrev = () => {
        if(activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    }

    const onSave = () => {
        switch (activeTab) {
            case 0:
                psRef.current?.save();
                break;
            case 1:
                csRef.current?.save();
                break;
            case 2:
                daRef.current?.save();
                break;
            default:
                break;
        }
    }

    return (
        <Modal classNames={{content: classes.mContent, root: classes.root}} opened={show} onClose={onDismiss} title={<Title order={1}>Setup</Title>}>
            <Stack>
                <Stepper active={activeTab} onStepClick={setActiveTab}>
                    <Stepper.Step
                        icon={<IconSolarPanel />}
                        label='General'
                        description='General Information'
                    >
                        
                    </Stepper.Step>
                    <Stepper.Step
                        icon={<IconCar />}
                        label='Cars'
                        description='Enter your cars data'
                    >

                    </Stepper.Step>
                    <Stepper.Step
                        icon={<IconCalendarTime />}
                        label='Departures'
                        description='Plan your departures'
                    >
                        
                    </Stepper.Step>
                </Stepper>
                <Stack className={classes.content} justify='space-between'>
                    {activeTab === 0 && 
                    <PersonalSettings ref={psRef}/>
                    }
                    {activeTab === 1 && 
                    <CarSetup ref={csRef}/>
                    }
                    {activeTab === 2 && 
                    <DepartureArivalSetup ref={daRef}/>
                    }
                    <NavBtn className={classes.actions} onPrev={onNavPrev} onSaveNext={onNavNext} />
                </Stack>
            </Stack>
        </Modal>
    )
}

export default InitialSetupModal