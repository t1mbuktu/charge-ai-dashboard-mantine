import { DefaultState } from "../../models/DefaultState"
import { Report } from "../../models/Report"

export type ReportState = {
    report?: Report
} & DefaultState