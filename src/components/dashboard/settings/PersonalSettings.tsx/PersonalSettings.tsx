import { useState } from 'react'
import { Button, Fieldset, NumberInput, Stack, TextInput, Title, Box } from '@mantine/core'
import classes from './PersonalSettings.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { GeneralSettings } from '../../../../models/GeneralSettings'
import { saveSettings } from '../../../../redux/settings/SettingsSlice'
import LoadingOverlay from '../../../shared/loading-overlay/LoadingOverlay'
import { StateStatus } from '../../../../models/enums/StateStatus'

function PersonalSettings() {
    const dispatch = useAppDispatch();

    const { settings, status } = useAppSelector(s => s.settings);
    const { currentUser } = useAppSelector(s => s.common);

    const [settingsToEdit, setSettingsToEdit] = useState<GeneralSettings>(
        settings ?
        settings :
        {
            uid: currentUser?.id!
        })

    const onSave = () => {
        dispatch(saveSettings(settingsToEdit!));
    }

    
    return (
        <Box  className={classes.container} pos="relative">
        {status === StateStatus.loading && <LoadingOverlay />}
            <Stack>
            
                <Fieldset legend={
                    <Title order={4}>
                    Photovoltaic data
                    </Title>
                }> <Stack className={classes.formWrapper}>
                    <NumberInput
                        label={'Photovoltaic surface area'}
                        description={'enter the surface area of photovoltaic modules in square meter'}
                        rightSection={'m²'}
                        rightSectionWidth={36}
                        withAsterisk
                        defaultValue={settingsToEdit.pvSurfaceArea}
                        onChange={v => setSettingsToEdit({...settingsToEdit, pvSurfaceArea: Number(v)})}
                    />
                    <NumberInput
                        label={'Number of modules'}
                        description={'enter the amount of photovoltaic modules'}
                        rightSection={'pcs'}
                        rightSectionWidth={45}
                        withAsterisk
                        defaultValue={settingsToEdit.numberOfPvModules}
                        onChange={v => setSettingsToEdit({...settingsToEdit, numberOfPvModules: Number(v)})}
                    />
                    <NumberInput
                        label={'Power per module'}
                        description={'enter the peak poweroutput of one module'}
                        rightSection={'Wp'}
                        rightSectionWidth={40}
                        withAsterisk
                        defaultValue={settingsToEdit.powerPerModule}
                        onChange={v => setSettingsToEdit({...settingsToEdit, powerPerModule: Number(v)})}
                    />
                    </Stack>
                </Fieldset>
                <Fieldset legend={
                    <Title order={4}>
                        Location
                    </Title>
                }> 
                <TextInput
                        label={'Zip Code'}
                        description={'enter the Zip code where your pv system is located'}
                        withAsterisk
                        defaultValue={settingsToEdit.zip}
                        onChange={v => setSettingsToEdit({...settingsToEdit, zip: Number(v.currentTarget.value)})}
                />
                </Fieldset>
                <Button onClick={onSave}>Save</Button>
            </Stack>

        </Box>
    )
}

export default PersonalSettings