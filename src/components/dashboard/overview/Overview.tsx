import {Grid, Stack } from "@mantine/core"
import ChargePreviewChartCard from "./charge-preview-chart-card/ChargePreviewChartCard"
import classes from './Overview.module.css'
import LiveStatsCard from "./live-stats-card/LiveStatsCard"
import { useAppSelector } from "../../../hooks/storeHooks"

function Overview() {

  const {cars} = useAppSelector(s => s.cars)

  return (

    <Grid className={classes.grid}>
      <Grid.Col span={7}>
          <ChargePreviewChartCard />
      </Grid.Col>
      <Grid.Col span={5}>
        <Stack>
        {cars.map(car => (
          <LiveStatsCard key={car.id} car={car}/>
        ))}
        </Stack>
      </Grid.Col>
    </Grid>
      
  )
}

export default Overview