import { useState } from 'react';
import { Container, Group, Image, Avatar, Menu, rem, Center, Box, useMantineColorScheme, ActionIcon } from '@mantine/core';
import classes from './NavigationBar.module.css'
import { Pages } from '../../../models/enums/Pages';
import { IconLogout, IconMoon, IconPlus, IconSettings, IconSun } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { signOutUser } from '../../../redux/common/CommonSlice';
import CarSettingsModal from '../overview/live-stats-card/car-settings-modal/CarSettingsModal';
import { useDisclosure } from '@mantine/hooks';
import SettingsModal from '../settings/SettingsModal';

//const pages = [Pages.Overview, Pages.DepartureTimes, Pages.Savings];
const pages: Pages[] = [];


type props = {
    onNavigate: (page: Pages) => void
}

function NavigationBar({onNavigate}: props) {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(Pages.Overview);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [showAddCarModal, { toggle: toggleAddCarModal }] = useDisclosure(false);
    const [showSettingsModal, { toggle: toggleShowSettingsModal }] = useDisclosure(false);

    const { currentUser } = useAppSelector(s => s.common)

    const items = pages.map((page) => (
        <a
            key={page}
            className={classes.link}
            data-active={active === page || undefined}
            onClick={() => {
                onNavigate(page);
                setActive(page);
            }
            }
        >
            {page}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container size='100%' className={classes.inner}>
                <Group>
                    <Image
                        className={colorScheme === 'light' ? classes.pnt : classes.imgdrk}
                        h={50}
                        src='/src/assets/logo.png'
                        onClick={() => onNavigate(Pages.Overview)}
                    />

                    <Group gap={5} visibleFrom="xs">
                        {items}
                    </Group>
                </Group>
                <Group>
                <ActionIcon variant='light' onClick={toggleColorScheme}>
                    {colorScheme === 'light' ? <IconMoon /> : <IconSun/>}                   
                </ActionIcon>
                <Menu>
                    <Menu.Target>
                        <Avatar className={classes.pnt} src={currentUser?.photoUrl} size={'md'}/>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Box className={classes.menu}>
                            <Menu.Item>
                                <Center>
                                    <Avatar src={currentUser?.photoUrl} size={'xl'} radius={'lg'}/>
                                </Center>
                            </Menu.Item>
                            <Menu.Item onClick={() => dispatch(signOutUser())} leftSection={<IconLogout color='red' style={{ width: rem(14), height: rem(14), }}/>}>
                                Logout
                            </Menu.Item>
                            <Menu.Label >
                                Actions
                            </Menu.Label>

                            <Menu.Item onClick={toggleShowSettingsModal} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }}/>}>
                                Settings
                            </Menu.Item>
                            <Menu.Item onClick={toggleAddCarModal} leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }}/>}>
                                Add car
                            </Menu.Item>
                        </Box>
                    </Menu.Dropdown>
                </Menu>
                </Group>

            </Container>
            <CarSettingsModal 
            car={{
                id: undefined,
                uid: '',
                name: '',
                hybrid: false,
                batteryLevel: 0,
                batteryCapacity: 0,
                chargeLimit: 0,
                maxChargeSpeed: 0
            }} show={showAddCarModal} onDismiss={toggleAddCarModal} 
            />
            <SettingsModal show={showSettingsModal} onDismiss={toggleShowSettingsModal}            
            />

        </header>
    );
}

export default NavigationBar