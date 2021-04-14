export default (theme) => ({
  voted: {
    transition: 'all 0.6s',
    opacity:1,
  },
  notVoted: {
    transition: 'all 0.6s',
    opacity:0.5,
    transform: 'rotate(90deg)'
  }
})
