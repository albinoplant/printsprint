import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectData from '../ProjectData'
import styles from './ProjectPage.styles'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          <ProjectData />
        </SuspenseWithPerf>
    </div>
  )
}

export default ProjectPage
