import classes from './LiveStatsCard.module.css'
import Card from '../../../shared/card/PaperCard'
import { Car } from '../../../../models/Car'
import { ActionIcon, Group, Progress, Title, Text } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconCar, IconClock } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import CarSettingsModal from '../car-settings-modal/CarSettingsModal'
import DepartureArivalDrawer from '../departure-arival-drawer/DepartureArivalDrawer'

type Props = {
    car: Car
}


function LiveStatsCard({ car }: Props) {

    const [showModal, { toggle: toggleSettings }] = useDisclosure(false);
    const [showDrawer, {toggle: toggleDepAriDrawer}] = useDisclosure(false);

    return (
        <Card>
            <Group className={classes.heading} justify='space-between'>
                <Group>
                    <IconCar />
                    <Title order={3}>{car.name}</Title>
                </Group>
                <Group gap={4}>
                    <ActionIcon variant="subtle" size="sm" onClick={toggleDepAriDrawer}>
                        <IconClock />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="sm" onClick={toggleSettings}>
                        <IconAdjustmentsHorizontal />
                    </ActionIcon>
                </Group>
            </Group>
            <Title className={classes.lbl} order={6}>
                Battery
            </Title>
            <Progress.Root size="xl">
                <Progress.Section value={car.batteryLevel * 100} striped animated color="green" >
                    <Progress.Label>{`${car.batteryLevel * 100}%`}</Progress.Label>
                </Progress.Section>
            </Progress.Root>
            <Title className={classes.lbl} order={6}>
                Charging Speed
            </Title>
            <Text 
                size='xl' 
                fw={800}
                variant="gradient"
                gradient={{ from: 'lime', to: 'green', deg: 292 }}
            >
                8 kWh
            </Text>
            <DepartureArivalDrawer show={showDrawer} onDismiss={toggleDepAriDrawer} car={car}/>
            <CarSettingsModal show={showModal} onDismiss={toggleSettings} car={car} />
        </Card>
    )
}

export default LiveStatsCard