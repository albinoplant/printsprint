import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  ACCOUNT_PATH,
  LIST_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
} from "constants/paths";
import styles from "./HomePage.styles";
import { HowToVote, ThumbsUpDown } from "@material-ui/icons";
import { Box, Button, ButtonBase } from "@material-ui/core";
import Hero from "./Hero";
import Logo from "components/Logo";

const useStyles = makeStyles(styles);

const SectionCard = ({ to, icon, label }) => {
  const classes = useStyles();
  const Icon = icon;
  const inside = (
    <Paper className={classes.paper}>
      <div className={classes.circle}>
        <Icon fontSize="large" className={classes.icon} />
      </div>
      <Typography variant="button" className={classes.sign}>
        {label}
      </Typography>
    </Paper>
  );
  if (to) {
    return (
      <ButtonBase component={RouterLink} to={to}>
        {inside}
      </ButtonBase>
    );
  } else {
    return <ButtonBase>{inside}</ButtonBase>;
  }
};

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={5} justify="center">
        <Grid item>
          <SectionCard
            to={LIST_PATH}
            component={RouterLink}
            icon={HowToVote}
            label="Poker"
          />
        </Grid>
        <Grid item>
          <SectionCard icon={ThumbsUpDown} label="Retro" />
        </Grid>
      </Grid>
      <Box display="flex" alignItems="flex-start" mt={-10}>
        <Hero />
        <Box ml={-20}>
          <Logo style={{ width: 400, marginTop: 100, transform: "" }} />
          <Box width={400} mt={-2} ml={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Grid container justify="center">
        <Grid item xs className={classes.section}>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to={LIST_PATH}
          >
            <h2>Sprint Poker</h2>
            <h2 style={{ fontSize: "500%", margin: "auto" }}>🎰</h2>
          </Button>
        </Grid>
        {/* <Grid item xs className={classes.section}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              Forms
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Input validation and context management
            </Typography>
            <div>
              <span>
                <a
                  href="https://react-hook-form.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  react-hook-form
                </a>
              </span>
            </div>
            <span>The following routes use react-hook-form:</span>
            <ul>
              <li>
                <Link to={LOGIN_PATH}>Login</Link>
              </li>
              <li>
                <Link to={SIGNUP_PATH}>Signup</Link>
              </li>
              <li>
                <Link to={ACCOUNT_PATH}>Account</Link>
              </li>
            </ul>
            </Paper>
          </Grid> 
      </Grid> */}
    </div>
  );
};

export default Home;
