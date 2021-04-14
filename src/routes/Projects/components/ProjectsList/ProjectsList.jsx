import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDatabase, useUser, useDatabaseList } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { PROJECTS_COLLECTION } from 'constants/firebasePaths'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import styles from './ProjectsList.styles'


const useStyles = makeStyles(styles)

function useProjectsList() {
  const { showSuccess, showError } = useNotifications()
  // Get current user (loading handled by Suspense in ProjectsList)
  const { data: auth } = useUser()
  // Create a ref for projects owned by the current user
  const database = useDatabase()
  const { ServerValue } = useDatabase
  const projectsRef = database
    .ref(PROJECTS_COLLECTION)
    .orderByChild('createdBy')
    .equalTo(auth?.uid)

  // Query for projects (loading handled by Suspense in ProjectsList)
  const { data: projects } = useDatabaseList(projectsRef)

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function addProject(newInstance) {
    return database
      .ref(PROJECTS_COLLECTION)
      .push({
        ...newInstance,
        createdBy: auth.uid,
        createdAt: ServerValue.TIMESTAMP,
        status: 'draft'
      })
      .then(() => {
        toggleDialog()
        showSuccess('Project added successfully')
      })
      .catch((err) => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
        return Promise.reject(err)
      })
  }

  return { projects, addProject, newDialogOpen, toggleDialog, auth }
}

function ProjectsList() {
  const classes = useStyles()
  const {
    projects,
    addProject,
    newDialogOpen,
    toggleDialog,
    auth
  } = useProjectsList()

  return (
    <div className={classes.root}>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {projects &&
          projects.map(({ snapshot }, ind) => {
            console.log(snapshot)
            const project = snapshot.val()
            return (
              <ProjectTile
                key={`Project-${snapshot.key}-${ind}`}
                name={project && project.name}
                date={project && project.createdAt}
                createdBy={project && project.createdBy}
                auth={auth}
                projectId={snapshot.key}
                isOwner={auth.uid===project.createdBy}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ProjectsList
