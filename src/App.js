import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
    this.state = {
      analyticsEventSent: false,
      resultHtml: "",
      eventsSent: 0
    };
  }

  handleAnalyticsClick() {
    const { aws_project_region, aws_mobile_analytics_app_id } = awsconfig;

      Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = `https://${aws_project_region}.console.aws.amazon.com/pinpoint/home/?region=${aws_project_region}#/apps/${aws_mobile_analytics_app_id}/analytics/events`;
            let result = (<div>
              <p>Event Submitted.</p>
              <p>Events sent: {this.state.eventsSent + 1}</p>
              <a href={url} target="_blank" rel="noopener noreferrer">View Events on the Amazon Pinpoint Console</a>
            </div>);

            this.setState({
                analyticsEventSent: true,
                resultHtml: result,
                eventsSent: this.state.eventsSent + 1
            });
        });
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Prod</h1>
        </header>
        <div className="App-intro">
          <button className="App-button" onClick={this.handleAnalyticsClick}>Generate Analytics Event</button>
          {this.state.analyticsEventSent}
          <div>{this.state.resultHtml}</div>
        </div>
      </div>
    );
  }
}

export default App;
