import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import { useDatabaseObjectData, useDatabase } from 'reactfire'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import Draft from './Draft'
import { Box, Button, Card, Grid } from '@material-ui/core'
import moment from 'moment'
import { useNotifications } from 'modules/notification'
import Ready from './Ready'

function ProjectData() {
  const { projectId } = useParams()
  const database = useDatabase()
  const projectRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}`)
  const { data: project } = useDatabaseObjectData(projectRef)
  const { showError, showSuccess } = useNotifications()
  console.log(project)
  function toggleState(){
    const mod = project.status==="draft"?"open":"draft"
    return database
    .ref(`${PROJECTS_COLLECTION}/${projectId}/status`)
    .set(mod)
    .then(() => {
      showSuccess('Task state updated')
    })
    .catch((err) => {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Could not update')
      return Promise.reject(err)
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
    <Card >
    <CardContent>
      <Box  m={2}>
        <Box mb={4}>
      <Typography noWrap variant="h4" component="h2">
        {(project && project.name) || 'Project'}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {moment(project.createdAt).format('yyyy.mm.DD')}
      </Typography>
      </Box>
      {project.status==="draft" && <Draft project={project} projectId={projectId}/>}
      {project.status==="open" &&<Ready project={project} projectId={projectId}/>}
      </Box>
    </CardContent>
    <Button onClick={toggleState}>{project.status==="draft"?'Done':'Edit'}</Button>
    </Card>
    </Grid>
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography>Participants</Typography>
        </CardContent>
      </Card>
    </Grid>
    </Grid>
  )
}

export default ProjectData
