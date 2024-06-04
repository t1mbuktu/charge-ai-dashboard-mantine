import { BarChart, ChartTooltipProps, LineChart } from "@mantine/charts"
import { Paper, Title, Text, SegmentedControl, Group, ActionIcon, Stack } from "@mantine/core";

import classes from './ChargePreviewChartCard.module.css'
import PaperCard from "../../../shared/card/PaperCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHooks";
import { IconChevronLeft, IconChevronRight, IconRefresh } from "@tabler/icons-react";
import { getReport } from "../../../../redux/report/ReportSlice";
import { ChargeForecast, ChargeForecastEntry } from "../../../../models/Report";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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

const getNextSevenDays = (): string[] => {
  const dates: string[] = [];
  const today = dayjs();

  for (let i = 0; i < 7; i++) {
    const nextDay = today.add(i, 'day').format('YYYY-MM-DD');
    dates.push(nextDay);
  }

  return dates;
}

function ChargePreviewChartCard() {
  const dispatch = useAppDispatch();

  const { cars } = useAppSelector(s => s.cars)
  const { simEntries } = useAppSelector(s => s.sims)
  const { settings } = useAppSelector(s => s.settings)
  const { report } = useAppSelector(s => s.report)

  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(cars.length > 0 ? cars[0].id : undefined)
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0)
  const [nextSevenDays, setNextSevenDays] = useState(getNextSevenDays())

  const onCreateReport = () => {
    dispatch(getReport({ settings: settings!, sim_data: simEntries, cars: cars }));
    console.log(report?.smartChargingForecast.chargeForecast[0].data)
  }

  const getCumulativeData = (data: ChargeForecastEntry[]): ChargeForecastEntry[] => {
    let groupedData: { [date: string]: Omit<ChargeForecastEntry, "date"> } = {};

    data.forEach(entry => {
      let date = entry.date.split('T')[0];
      if (!groupedData[date]) {
        groupedData[date] = {
          "chargingSpeedSolar": 0.0,
          "chargingSpeedGrid": 0.0,
          "batteryLevel_kwh": 0.0,
        };
      }
      groupedData[date].chargingSpeedSolar! += entry.chargingSpeedSolar ? entry.chargingSpeedSolar : 0;
      groupedData[date].chargingSpeedGrid! += entry.chargingSpeedGrid ? entry.chargingSpeedGrid : 0;
      groupedData[date].batteryLevel_kwh! += entry.batteryLevel_kwh ? entry.batteryLevel_kwh : 0;
    });

    let cumulativeData: ChargeForecastEntry[] = Object.keys(groupedData).map(date => {
      return {
        date: date,
        ...groupedData[date]
      };
    });

    return cumulativeData;
  }

  const getGroupedDataByDate = (chargeForecasts: ChargeForecast[]): { [carId: string]: { [date: string]: ChargeForecastEntry[] } } => {
    let groupedData: { [carId: string]: { [date: string]: ChargeForecastEntry[] } } = {};

    chargeForecasts.forEach(forecast => {
      if (!groupedData[forecast.carId]) {
        groupedData[forecast.carId] = {};
      }

      forecast.data.forEach(entry => {
        const date = entry.date.split('T')[0];;

        if (!groupedData[forecast.carId][date]) {
          groupedData[forecast.carId][date] = [];
        }

        groupedData[forecast.carId][date].push(entry);
      });
    });
    console.log(groupedData)
    return groupedData;
  }

  useEffect(() => {
    if (cars.length > 0) {
      setSelectedCarId(cars[0].id!)
    }
  }, [cars])


  return (
    <PaperCard>
      <Group className={classes.heading} justify="space-between">
        <Title order={3}>Charging Preview</Title>
        {cars.length !== 0 &&
          <Group>
            <SegmentedControl
              className={classes.sgmtcrtl}
              defaultValue={cars[0].id}
              data={cars.map(car => ({ label: car.name, value: car.id! }))}
              size="xs"
              onChange={v => setSelectedCarId(v)}
            />
            <ActionIcon
              variant="light"
              onClick={onCreateReport}
            >
              <IconRefresh />
            </ActionIcon>
          </Group>
        }
      </Group>
      <Stack gap={"50px"}>
        {report && cars.length > 0 &&
          <BarChart
            h={300}
            data={
              getCumulativeData(report!.smartChargingForecast.chargeForecast
                .filter(f => f.carId === selectedCarId)[0].data)
                .map(v => ({
                  Date: dayjs(v.date).format('DD.MM'),
                  Solar: v.chargingSpeedSolar,
                  Grid: v.chargingSpeedGrid
                }))
            }
            unit="kWh"
            dataKey="Date"
            type="stacked"
            series={[
              { name: 'Solar', color: 'green.7' },
              { name: 'Grid', color: 'yellow.7' },
            ]}
          />
        }

        {report && cars.length > 0 &&
          <Stack>
            <Group justify="space-between">
              {nextSevenDays[selectedDateIndex]}
              <ActionIcon.Group>
                <ActionIcon
                  variant="light"
                  onClick={() => setSelectedDateIndex(selectedDateIndex - 1 < 0 ? nextSevenDays.length - 1 : selectedDateIndex - 1)}
                >
                  <IconChevronLeft />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  onClick={() => setSelectedDateIndex(selectedDateIndex + 1 === nextSevenDays.length
                    ?
                    0
                    :
                    selectedDateIndex + 1
                  )}
                >
                  <IconChevronRight />
                </ActionIcon>
              </ActionIcon.Group>
            </Group>
            <LineChart
              h={300}
              data={
                getGroupedDataByDate(report!.smartChargingForecast.chargeForecast)
                [selectedCarId!][getNextSevenDays()[selectedDateIndex]]
                  .map(v => (
                    {
                      date: dayjs(v.date).format('HH:mm'),
                      speedGrid: v.chargingSpeedGrid,
                      speedSolar: v.chargingSpeedSolar,
                      solarForecast: v.solarForecast
                    })).slice(0, 24)
              }
              dataKey="date"
              withLegend
              legendProps={{ verticalAlign: 'bottom', height: 50 }}
              unit="kWh"
              tooltipAnimationDuration={200}
              tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              series={[
                { name: 'solarForecast', color: 'gray.6' },
                { name: 'speedSolar', color: 'green.7' },
                { name: 'speedGrid', color: 'yellow.7' },
              ]}
              curveType="monotone"
              withDots={false}
              connectNulls={false}
            />
          </Stack>
        }
      </Stack>
    </PaperCard>
  )
}

export default ChargePreviewChartCard