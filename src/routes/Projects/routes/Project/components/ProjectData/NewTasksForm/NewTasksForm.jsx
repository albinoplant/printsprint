import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, Fab, Grid } from "@material-ui/core";

function NewTasksForm({ onSubmit, add, remove }) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    nativeValidation: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name && "Name is required"}
            name="name"
            label="Name"
            inputRef={register({
              required: true,
            })}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            error={!!errors.description}
            helperText={errors.description && "Description is required"}
            name="description"
            label="Description"
            inputRef={register({
              required: true,
            })}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isSubmitting || !isValid}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

NewTasksForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewTasksForm;
