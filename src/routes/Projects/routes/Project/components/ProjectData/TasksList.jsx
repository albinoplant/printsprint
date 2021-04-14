import { IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {Delete} from "@material-ui/icons";

const TasksList = ({ tasks, remove}) => {
  console.log( tasks)
  return (
    <List>
      {tasks.map(({snapshot},idx) => {
        const task = snapshot.val()
        return(
        <ListItem divider key={task.name+idx+task.description}>
          <ListItemText primary={task.name} secondary={task.description} />
          <ListItemIcon><IconButton onClick={()=>remove(snapshot.key)}><Delete/></IconButton></ListItemIcon>
        </ListItem>
      )})}
    </List>
  );
};

export default TasksList;
