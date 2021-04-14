import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SuspenseWithPerf, useDatabase, useDatabaseListData, useDatabaseObjectData, useUser } from 'reactfire'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectData from '../ProjectData'
import styles from './ProjectPage.styles'
import { useParams } from 'react-router'
import { PROJECTS_COLLECTION, USERS_COLLECTION } from 'constants/firebasePaths'

const includes = (a,v, active) => {
  if(a.hasOwnProperty('NO_ID_FIELD')) return false
  let isIn = false;
  if (a.some(e => e.uid === v && e.active === active)) {
    isIn = true;
  }
  return isIn;
}

const useStyles = makeStyles(styles)

function ProjectPage() {
  const classes = useStyles()
  const { projectId } = useParams()
  const database = useDatabase()
  const participantsRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}/participants`)
  const createdByRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}/createdBy`)
  const { data: createdBy } = useDatabaseObjectData(createdByRef)
  const { data: participants } = useDatabaseListData(participantsRef)
  const {data: auth} = useUser()
  
  const sendRequest = () => {
    const userRef = database.ref(`${USERS_COLLECTION}/${auth.uid}`)
    const { data: user } = useDatabaseObjectData(userRef)
    participantsRef.push({active: false, name: user.displayName, uid: auth.uid}).then(() => {
      showSuccess('Request sent')
    })
    .catch((err) => {
      console.error('Error:', err) // eslint-disable-line no-console
      showError(err.message || 'Error while sending request')
      return Promise.reject(err)
    })
  }

  // useEffect(()=>{
  //   if() todo sendrequest if not on list of participants
  // })

  return (
    <div className={classes.root}>
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="load-project">
          {(auth.uid === createdBy || includes(participants,auth.uid, true) )&& <ProjectData user={auth} participants={participants} />}
        </SuspenseWithPerf>
    </div>
  )
}

export default ProjectPage
