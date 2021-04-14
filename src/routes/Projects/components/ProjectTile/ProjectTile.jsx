import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDatabase } from 'reactfire'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import styles from './ProjectTile.styles'
import { Typography } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles(styles)

function ProjectTile({ name, projectId, createdBy, auth, date, isOwner }) {
  const classes = useStyles()
  const history = useHistory()
  const { showError, showSuccess } = useNotifications()
  const database = useDatabase()

  function goToProject() {
    if(isOwner){
      return history.push(`${LIST_PATH}/${projectId}`)
    }
  }

  function deleteProject() {
    return database
      .ref(`projects/${projectId}`)
      .remove()
      .then(() => showSuccess('Project deleted successfully'))
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })
  }

  return (
    <Paper className={classes.root} onClick={goToProject}>
      <div className={classes.top}>
        <Typography className={classes.name} >
          {name || 'No Name'}
        </Typography>
        <Typography>{moment(date).format('yyyy.mm.DD')}</Typography>
      </div>
        {isOwner ? (
          <Tooltip title="delete">
            <IconButton onClick={deleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
    </Paper>
  )
}

ProjectTile.propTypes = {
  projectId: PropTypes.string.isRequired,
  showDelete: PropTypes.bool,
  name: PropTypes.string
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
