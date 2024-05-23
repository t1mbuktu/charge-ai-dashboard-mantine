import { Paper, Title } from '@mantine/core'
import { ReactNode } from 'react'
import classes from './PaperCard.module.css'

type Props = {
    children?: ReactNode
    heading?: string
    className?: string
}

function PaperCard({children, heading, className}: Props) {
  return (
    <Paper className={[classes.paper, className].join(' ')} withBorder shadow="md" radius="md">
        {heading && <Title className={classes.heading} order={3}>{heading}</Title>}
        {children}
    </Paper>
  )
}

export default PaperCard