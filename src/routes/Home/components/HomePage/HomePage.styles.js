export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(8)
  },
  section: {
    ...theme.flexColumnCenter,
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  paper: {
    padding:theme.spacing(2),
    '&:hover' : { 
      boxShadow: theme.shadows[8]
    }
  },
  icon: {
    fill: theme.palette.secondary.dark,
  },
  circle: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    borderRadius: '50%'
  },
  sign: {
    marginTop: theme.spacing(1),
    display: 'table',
    margin: 'auto',
    color: theme.palette.secondary.dark
  }
})
