import React from 'react'
import { connect } from 'react-redux'


const VersionLabel = (props) => (
  <span className="version version-backend">{props.version}</span>
);

export default connect(
  (state) => ({
    version: state.stats.backendVersion,
  })
)(VersionLabel);

