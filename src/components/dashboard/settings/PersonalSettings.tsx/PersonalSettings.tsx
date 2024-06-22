import { forwardRef, useImperativeHandle, useState } from 'react'
import { Fieldset, NumberInput, Stack, TextInput, Title, Box } from '@mantine/core'
import classes from './PersonalSettings.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks'
import { GeneralSettings } from '../../../../models/GeneralSettings'
import { saveSettings } from '../../../../redux/settings/SettingsSlice'
import LoadingOverlay from '../../../shared/loading-overlay/LoadingOverlay'
import { StateStatus } from '../../../../models/enums/StateStatus'

export type PersonalSettingsRef = {
    save: () => void
}

export const PersonalSettings = forwardRef<PersonalSettingsRef, {}>((props, ref) => {
    const dispatch = useAppDispatch();

    const { settings, status } = useAppSelector(s => s.settings);
    const { currentUser } = useAppSelector(s => s.common);

    const [settingsToEdit, setSettingsToEdit] = useState<GeneralSettings>(
        settings ?
        settings :
        {
            uid: currentUser?.id!,
            setupCompleted: false,
        });

    useImperativeHandle(
        ref,
        () => ({
                save() {
                    dispatch(saveSettings(settingsToEdit!));
            }
        }),
    )

    return (
        <Box pos="relative">
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
                        defaultValue={settingsToEdit?.surface}
                        onChange={v => setSettingsToEdit({...settingsToEdit, surface: Number(v)})}
                    />
                    <NumberInput
                        label={'Number of modules'}
                        description={'enter the amount of photovoltaic modules'}
                        rightSection={'pcs'}
                        rightSectionWidth={45}
                        withAsterisk
                        defaultValue={settingsToEdit.numberOfSolarModules}
                        onChange={v => setSettingsToEdit({...settingsToEdit, numberOfSolarModules: Number(v)})}
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
                <Fieldset legend={
                    <Title order={4}>
                        Energy Provider
                    </Title>
                }>
                    <Stack>
                        <NumberInput
                            label={'Price per kwh'}
                            description={'enter the price in € per KWh from your energy provider'}
                            rightSection={'€'}
                            rightSectionWidth={25}
                            defaultValue={settingsToEdit.electricityPrice_kwh}
                            onChange={v => setSettingsToEdit({...settingsToEdit, electricityPrice_kwh: Number(v)})}
                        />
                        <NumberInput
                            label={'Fedd-In Remuneration'}
                            description={'enter the remuneration in € per KWh feed intp the grid'}
                            rightSection={'€'}
                            rightSectionWidth={25}
                            defaultValue={settingsToEdit.feedInRemuneration_kwh}
                            onChange={v => setSettingsToEdit({...settingsToEdit, feedInRemuneration_kwh: Number(v)})}
                        />
                    </Stack>
                </Fieldset>
            </Stack>

        </Box>
    )
})