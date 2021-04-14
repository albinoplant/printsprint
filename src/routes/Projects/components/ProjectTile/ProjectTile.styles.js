export default (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '200px',
    width: '300px',
    margin: theme.spacing(0.5),
    padding: theme.spacing(1.3),
    cursor: 'pointer',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%'
  },
  name: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: ''
    },
    '&:visited': {
      textDecoration: 'none'
    }
  }
})
