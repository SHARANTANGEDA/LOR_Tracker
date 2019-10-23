import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StudentProfilePanel from "./tabPanels/StudentProfilePanel";
import LorPanel from "./tabPanels/LorPanel";
import CoursesDisplayPanel from "./tabPanels/CoursesDisplayPanel";
import ProjectsDisplayPanel from "./tabPanels/ProjectsDisplayPanel";
import ThesisDisplayPanel from "./tabPanels/ThesisDisplayPanel";

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
	id: `scrollable-auto-tab-${index}`,
	'aria-controls': `scrollable-auto-tabpanel-${index}`,
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ModalTabContents = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {content} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="View Student Profile" {...a11yProps(0)} />
          <Tab label="View Lor" {...a11yProps(1)} />
					<Tab label="View Courses Done" {...a11yProps(2)} />
					<Tab label="View Projects Done" {...a11yProps(3)} />
					<Tab label="View Thesis Done" {...a11yProps(4)} />
					<Tab label="Other Details" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
				<StudentProfilePanel studentProfile={content.student_details_profile}
												 user={content.student_details_general}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
				<LorPanel lor={content.lor_details}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
				<CoursesDisplayPanel courses={content.application_details.courses_done}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
				<ProjectsDisplayPanel projects={content.application_details.projects_done}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
				<ThesisDisplayPanel thesis={content.application_details.thesis_done}/>
      </TabPanel>
			<TabPanel value={value} index={5}>
				{content.application_details.others.length===0 ? "NA" : content.application_details.others}
      </TabPanel>
    </div>
  );
};
ModalTabContents.propTypes = {
  content: PropTypes.object.isRequired
};
export default (ModalTabContents);
