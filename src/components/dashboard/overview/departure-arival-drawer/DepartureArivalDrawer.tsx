import { Drawer, Title, Text, Container, Stack, Group, Button, Box } from "@mantine/core";
import { Car } from "../../../../models/Car";
import classes from './DepartureArivalDrawer.module.css'
import { IconClock } from "@tabler/icons-react";
import { useAppSelector } from "../../../../hooks/storeHooks";
import { StateStatus } from "../../../../models/enums/StateStatus";
import LoadingOverlay from "../../../shared/loading-overlay/LoadingOverlay";
import { DepartureArival, DepartureArivalRef } from "./departure-arival/DepartureArival";
import { useRef } from "react";

type Props = {
    show: boolean
    onDismiss: () => void
    car: Car
}

function DepartureArivalDrawer({ show, onDismiss, car }: Props) {
    const { status } =  useAppSelector(s => s.sims)
    const daRef = useRef<DepartureArivalRef>(null);

    const onCancel = () => {
        onDismiss();
    };

    const onSave = () => {
        daRef.current?.save();
        onDismiss();
    }
    
    return (
        
        <Drawer.Root opened={show} onClose={onDismiss} closeOnEscape={false} position="right" size={'xl'}>
            <Drawer.Overlay />
            <Drawer.Content >
                <Box pos={'relative'}>
                {status === StateStatus.loading && <LoadingOverlay />}
                <Container className={classes.content}>
                    <Drawer.Header>
                        
                        <Drawer.Title>
                            <Group gap={'5px'}>
                                <IconClock stroke={3} />
                                <Title order={3}>
                                    {`Departure / Arrival Planning`}
                                </Title>
                            </Group>
                            <Text size="md" c="blue">
                                {car.name}
                            </Text>
                        </Drawer.Title>
                        <Drawer.CloseButton />
                    </Drawer.Header>
                    <Drawer.Body >
                        <Stack justify="space-between">
                            <DepartureArival car={car} ref={daRef}/>
                            <Group gap={'xs'} justify="flex-end">
                                <Button onClick={onSave}>Save</Button>
                                <Button color='gray' variant="light" onClick={onCancel}>Cancel</Button>
                            </Group>
                        </Stack>
                    </Drawer.Body>
                </Container>
                </Box>
            </Drawer.Content>
            
        </Drawer.Root>
        
    )
}

export default DepartureArivalDrawer