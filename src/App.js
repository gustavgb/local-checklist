import React, { useState, useEffect } from 'react'
import uuid from 'uuid/v4'
import {
  Container,
  List,
  Paper,
  CircularProgress,
  ListItem as MaterialListItem,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ListItem from './ListItem'
import Title from './Title'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 0),
    minHeight: '70vh'
  },
  content: {
    padding: theme.spacing(2)
  },
  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}))

function App() {
  const classes = useStyles()
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [initialized, setInitialized] = useState(false)

  const handleAddItem = () => {
    setItems(
      [{
        text: '',
        checked: false,
        id: uuid()
      }].concat(items)
    )
  }

  const handleEditItem = (id, content) => {
    setItems(items.map(item => item.id === id ? content : item))
  }

  const handleEditTitle = (content) => {
    setTitle(content)
    document.title = content
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved'))
      if (saved) {
        handleEditTitle(saved.title)
        setItems(saved.items)
      }
    } catch (e) {
      console.log('No save found')
    } finally {
      setInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('saved', JSON.stringify({
        title,
        items
      }))
    }
  }, [items, title, initialized])

  return (
    <>
      {!initialized && (
        <div className={classes.progress}><CircularProgress color="primary" /></div>
      )}
      {initialized && (
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <Title title={title} onEdit={handleEditTitle} onAdd={handleAddItem} />
            <List className={classes.content}>
              {items.length === 0 && (
                <MaterialListItem>
                  <Typography align="center" color="textSecondary" variant="body2"><i>No items yet</i></Typography>
                </MaterialListItem>
              )}
              {items.map((item, index) => (
                <ListItem
                  divider={index < items.length - 1}
                  item={item}
                  onEdit={(content) => handleEditItem(item.id, content)}
                  key={item.id}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </List>
          </Paper>
        </Container>
      )}
    </>
  );
}

export default App;
