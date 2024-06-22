import PaperCard from "../../../shared/card/PaperCard";
import { Badge, Group, Text } from '@mantine/core';
import classes from './SavedMoneyCard.module.css'
import { useAppSelector } from "../../../../hooks/storeHooks";

type Props = {
    period: string,
    title: string
}

function SavedMoneyCard({period, title}: Props) {
    const { settings } = useAppSelector(s => s.settings);
    const { report } = useAppSelector(s => s.report);

    const getAmount = () => {
        const solarPower = report?.solarForecast.reduce((total, obj) => total + obj.speed_kwh, 0);
        const smartGridAmount = report?.smartChargingForecast!.gridPowerUsed_kwh! * settings?.electricityPrice_kwh!; 
        const smartFeedInAmount = (solarPower! - report?.smartChargingForecast.solarPowerUsed_kwh!) * settings?.feedInRemuneration_kwh!;
        const smartExpense = smartGridAmount - smartFeedInAmount;

        const simpleGridAmount = report?.simpleChargingForecast!.gridPowerUsed_kwh! * settings?.electricityPrice_kwh!;
        const simpleFeedInAmount = (solarPower! - report?.simpleChargingForecast.solarPowerUsed_kwh!) * settings?.feedInRemuneration_kwh!; 
        const simpleExpense = simpleGridAmount - simpleFeedInAmount;

        const saved = simpleExpense - smartExpense;
        return saved;
    }

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
                <Text className={classes.value}>{Math.round(getAmount() * 100) / 100} € in 7 days</Text>
            </Group>

            <Text fz="xs" c="dimmed" mt={7}>
                Compared to charging without ChargeAI
            </Text>
        </PaperCard>
    )
}

export default SavedMoneyCard