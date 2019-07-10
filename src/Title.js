import React, { useState } from 'react'
import {
  TextField,
  Typography,
  ClickAwayListener,
  ButtonBase,
  Button,
  Paper
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2)
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  leftItem: {
    flex: '1 0 auto'
  },
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    padding: theme.spacing(2),
    zIndex: 100
  },
  addBtn: {
    margin: theme.spacing(1, 0)
  }
}))

const Title = ({
  onEdit,
  title,
  onAdd
}) => {
  const classes = useStyles()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const handleEdit = () => {
    if (!editing) {
      setEditing(true)
      setDraft(title)
    }
  }

  const handleSave = () => {
    onEdit(draft)
    setEditing(false)
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.leftItem}>
        {editing ? (
          <ClickAwayListener onClickAway={handleSave}>
            <form onSubmit={event => { event.preventDefault(); handleSave() }}>
              <TextField
                value={draft}
                onChange={({ target: { value } }) => setDraft(value)}
                autoFocus
                className={classes.title}
                placeholder="Title"
              />
            </form>
          </ClickAwayListener>
        ) : (
          <ButtonBase onClick={handleEdit}>
            <Typography variant="h4" gutterBottom className={classes.title}>
              {title ? title : (<i>Title</i>)}
            </Typography>
          </ButtonBase>
        )}
      </div>
      <Button onClick={onAdd} className={classes.addBtn} variant="contained" color="primary">
        Add item
        <AddIcon className={classes.extendedIcon} />
      </Button>
    </Paper>
  )
}

export default Title
