import React, { useState } from 'react'
import {
  TextField,
  ListItem as MaterialListItem,
  ListItemText,
  Checkbox,
  ClickAwayListener,
  ButtonBase,
  IconButton,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  leftItem: {
    flex: '1 0 auto'
  },
  root: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  text: {
    textAlign: 'left'
  }
}))

const ListItem = ({
  onEdit,
  onDelete,
  item,
  divider
}) => {
  const classes = useStyles()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const handleToggle = () => {
    onEdit({
      ...item,
      checked: !item.checked
    })
  }

  const handleEdit = () => {
    if (!editing) {
      setEditing(true)
      setDraft(item.text)
    }
  }

  const handleSave = () => {
    onEdit({
      ...item,
      text: draft
    })
    setEditing(false)
  }

  return (
    <MaterialListItem className={classes.root} divider={divider}>
      {editing ? (
        <ClickAwayListener onClickAway={handleSave}>
          <form className={classes.leftItem} onSubmit={event => { event.preventDefault(); handleSave() }}>
            <TextField
              fullWidth
              value={draft}
              onChange={({ target: { value } }) => setDraft(value)}
              autoFocus
              placeholder="Remember to hang the clothes..."
            />
          </form>
        </ClickAwayListener>
      ) : (
        <ButtonBase onClick={handleEdit} className={classes.leftItem}>
          <ListItemText
            className={classes.text}
            primary={item.text ? item.text : (<i>New item</i>)}
          />
        </ButtonBase>
      )}
      <Checkbox
        checked={item.checked}
        onChange={handleToggle}
        value="checkbox"
        color="primary"
      />
      <IconButton aria-label="Delete" className={classes.deleteBtn} onClick={onDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </MaterialListItem>
  )
}

export default ListItem
