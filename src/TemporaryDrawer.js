import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [list, setList] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [state, setState] = useState({
    right: false,
  });
  useEffect(() => {
    axios.get('/updates').then(response => {
      const mdUpdates = response.data.files['updates.md'].content;
      const newNotifications =
        Array.from(response.data.history).length -
        localStorage.getItem('viewedNotifications');
      setList(mdUpdates);
      setNotifications(newNotifications);
    });
  }, []);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    localStorage.setItem('viewedNotifications', notifications);
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <ReactMarkdown source={list} escapeHtml={false} />
      <Divider />
    </div>
  );

  return (
    <div>
      <IconButton
        aria-label={`show ${notifications} new notifications`}
        color="inherit"
      >
        <Badge badgeContent={notifications} color="secondary">
          <NotificationsIcon onClick={toggleDrawer('right', true)} />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {sideList('right')}
      </Drawer>
    </div>
  );
}
