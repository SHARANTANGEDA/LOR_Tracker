import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0',
    transform: 'translate(-50%, -50%)'
  }
};

class ProjectsDisplayPanel extends Component {

  render () {
    const {projects} = this.props;
		const allFoldersContent = (projects.map(course => (
					<tr key={projects.indexOf(course)}>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{course.projectTitle}</span></td>
						<td><span style={{fontFamily: 'Arial', fontSize: '16px'}}>{course.year}</span></td>
					</tr>
				)));
    return (
     <div id="mainbar" className='row d-flex justify-content-center'>
          <div className="grid text-center col-md-10">
            <h3 className="grid--cell fl1 fs-headline1 text-center" style={{
              color: 'black'
            }}>Details</h3>
          </div>
          <table className="table table-bordered table-striped mb-0 col-md-12">
							<thead>
							<tr>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Project Title</th>
								<th scope="col" style={{fontSize: '10pt', background: '#c1c1c1'}}>Year</th>
							</tr>
							</thead>
							<tbody>
							{allFoldersContent}
							</tbody>
						</table>
        </div>
    )
  }
}

ProjectsDisplayPanel.propTypes = {
  projects: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ProjectsDisplayPanel);