import React, { Component } from 'react'

class DocumentTitle extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    document.title = "KMITL Evnetory - " + this.props.title
  }

  render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
} 

export default DocumentTitle