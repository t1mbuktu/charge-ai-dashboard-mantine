import PaperCard from "../../../shared/card/PaperCard";
import { Badge, Group, Text } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import classes from './EnergySavedCard.module.css'

type Props = {
    diffEnergyUsed_kwh: number,
    diffEnergyUsed_per: number,
    period: string,
    title: string
}

function EnergySavedCard({diffEnergyUsed_kwh, diffEnergyUsed_per, period, title}: Props) {

    const DiffIcon = diffEnergyUsed_per > 1 ? IconArrowUpRight : IconArrowDownRight;

    return (
        <PaperCard>
            <Group justify="space-between">
                <Text size="xs" c="dimmed" className={classes.title}>
                    {title}
                </Text>
                {period && (
                    <Badge variant="filled" radius="sm">
                        {period}
                    </Badge>
                )}
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
                <Text className={classes.value}>{Math.round(diffEnergyUsed_kwh)+' kWh'}</Text>
                <Text
                    c={diffEnergyUsed_per > 1 ? 'teal' : 'red'}
                    fz="sm"
                    fw={500}
                    className={classes.diff}
                >
                    <span>{Math.round(diffEnergyUsed_per * 100)}%</span>
                    <DiffIcon size="1rem" stroke={1.5} />
                </Text>
            </Group>

            <Text fz="xs" c="dimmed" mt={7}>
                Compared to charging without ChargeAI
            </Text>
        </PaperCard>
    )
}

export default EnergySavedCard