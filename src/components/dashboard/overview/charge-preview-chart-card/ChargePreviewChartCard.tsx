import { ChartTooltipProps, LineChart } from "@mantine/charts"
import { Paper, Title, Text, SegmentedControl, Group } from "@mantine/core";

import classes from './ChargePreviewChartCard.module.css'
import PaperCard from "../../../shared/card/PaperCard";
import { useAppSelector } from "../../../../hooks/storeHooks";

const data = [
  {
    time: '09:00',
    Solar: 4,
    Grid: 3
  },
  {
    time: '09:10',
    Solar: 2.3,
    Grid: 2
  },
  {
    time: '09:20',
    Solar: 2.2,
    Grid: 3
  },
  {
    time: '09:30',
    Solar: 2.0,
    Grid: 3.5
  },
  {
    time: '09:40',
    Solar: 1.8,
    Grid: 3.6
  },
  {
    time: '09:50',
    Solar: 1.4,
    Grid: 3.9
  }
];

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {`${label} Uhr`}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {`${item.value} kWh`}
        </Text>
      ))}
    </Paper>
  );
}

function ChargePreviewChartCard() {

  const { cars } = useAppSelector(s => s.cars)
  

  return (
    <PaperCard>
      <Group justify="space-between">
        <Title className={classes.heading} order={3}>Charging Preview</Title>
        {cars &&
        <SegmentedControl
          className={classes.sgmtcrtl}
          data={cars.map(car => ({label: car.name, value: car.id!}))}
          size="xs"
        />}
      </Group>
      <LineChart
        h={300}
        data={data}
        dataKey="time"
        withLegend
        legendProps={{ verticalAlign: 'bottom', height: 50 }}
        unit="kWh"
        tooltipAnimationDuration={200}
        tooltipProps={{
          content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
        }}
        series={[
          { name: 'Solar', color: 'green.7' },
          { name: 'Grid', color: 'yellow.7' },
        ]}
        curveType="monotone"
      />
    </PaperCard>
  )
}

export default ChargePreviewChartCard