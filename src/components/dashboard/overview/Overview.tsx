import {Grid, Stack } from "@mantine/core"
import ChargePreviewChartCard from "./charge-preview-chart-card/ChargePreviewChartCard"
import classes from './Overview.module.css'
import LiveStatsCard from "./live-stats-card/LiveStatsCard"
import { useAppSelector } from "../../../hooks/storeHooks"
import EnergySavedCard from "./energy-saved-card/EnergySavedCard"
import SavedMoneyCard from "./saved-money-card/SavedMoneyCard"

function Overview() {

  const { cars } = useAppSelector(s => s.cars)
  const { report } = useAppSelector(s => s.report)

  return (

    <Grid className={classes.grid}>
      <Grid.Col span={7}>
        <Stack>
          <ChargePreviewChartCard />
          {report && <SavedMoneyCard period={"weekly"} title={"Saved Money"} />}
        </Stack>
      </Grid.Col>
      <Grid.Col span={5}>
        <Stack>
        {cars.map(car => (
          <LiveStatsCard key={car.id} car={car}/>
        ))}
        {report &&
        <>
        <EnergySavedCard 
          diffEnergyUsed_kwh={report.smartChargingForecast.solarPowerUsed_kwh} 
          diffEnergyUsed_per={report.smartChargingForecast.solarPowerUsed_kwh / report.simpleChargingForecast.solarPowerUsed_kwh - 1} 
          period={"Weekly"} 
          title={"Solar Energy Used"} />
        <EnergySavedCard 
          diffEnergyUsed_kwh={report.smartChargingForecast.gridPowerUsed_kwh} 
          diffEnergyUsed_per={report.smartChargingForecast.gridPowerUsed_kwh / report.simpleChargingForecast.gridPowerUsed_kwh - 1} 
          period={"Weekly"} 
          title={"Grid Energy Used"} />
        </>
        }
        </Stack>
      </Grid.Col>
    </Grid>
      
  )
}

export default Overview