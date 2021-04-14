export default (theme) => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.background.default
        : theme.palette.primary1Color
  },
  accountButton: {
    color: theme.palette.secondary.dark
  },
  themeModeButton: {
    color: theme.palette.secondary.dark
  },
  signIn: {
    color: theme.palette.secondary.dark,
    textDecoration: 'none',
    alignSelf: 'center'
  }
})
