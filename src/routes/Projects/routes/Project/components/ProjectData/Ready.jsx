import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  Typography,
  TableHead,
} from "@material-ui/core";

const Buttons = ({ value }) => {
  const map = [
    { label: "S", variant: value === "S" ? "contained" : "outlined" },
    { label: "M", variant: value === "M" ? "contained" : "outlined" },
    { label: "L", variant: value === "L" ? "contained" : "outlined" },
    { label: "XL", variant: value === "XL" ? "contained" : "outlined" },
    { label: "☕", variant: value === "☕" ? "contained" : "outlined" },
  ];
  return (
    <Grid container spacing={2} justify="center">
      {map.map((button) => (
        <Grid item key={button.label}>
          <Button size="large" color="default"  variant={button.variant}>
            {button.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme)=>({
  active: {
    backgroundColor: theme.palette.grey[200]
  }
}))

const Ready = ({ project, projectId }) => {
  const classes = useStyles();
  const tasks = Object.entries(project.tasks).map(([key, value]) => ({
    ...value,
    key,
  }));
  const active = 1;

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item>
        <Buttons value="M" />
      </Grid>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>
              Task Name
            </TableCell>
            <TableCell>
              Task Description
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, idx) => (
              <TableRow
                className={active === idx ? classes.active : null}
                display="flex"
                key={task.createdAt}
              >
                <TableCell>
                  <b>{task.name}</b>
                </TableCell>
                <TableCell>{task.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Ready;
