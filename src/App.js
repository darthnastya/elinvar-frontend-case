import React, { Component } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import Form from './components/Form'
import ModalForm from './components/ModalForm'
import './App.css'
import {
  Icon,
  Button,
  Segment,
  Container,
  Menu,
  Header,
  Message,
  Divider
} from 'semantic-ui-react'
import complement from './utils/complement'
import Markdown from 'react-markdown'

import * as settings from './schemas/index'

const examples = Object.entries(settings).map(([key, setting]) => ({
  path: '/' + key,
  title: setting.props.schema.title,
  setting
}))

const AppMenu = withRouter(({ location }) => (
  <Menu inverted secondary stackable>
    <Menu.Item as={Link} to="/">
      Description
    </Menu.Item>
    {examples.map(ex => (
      <Menu.Item
        key={ex.path}
        as={Link}
        to={ex.path}
        active={location.pathname === ex.path}>
        {ex.title}
      </Menu.Item>
    ))}
  </Menu>
))

const renderForm = ({ props, concept }) => (
  <React.Fragment>
    <Message
      icon="idea"
      header="Feature description"
      content={<Markdown source=
        "This page provides a simple functionality to add database one or multiple assets with descriptions. Modal window duplicates main function."/> }
    />
    <Form {...props}>
      <Button content="Cancel" icon="cancel" />
    </Form>
    <Divider content="or" horizontal />
    <ModalForm {...props} />
  </React.Fragment>
)

const AppAbout = () => (
  <article>
    <h2>Welcome to Elinvar case study</h2>
    <p>
      Thank you for your interest in Elinvar. To proceed with your interview process, we have prepared a short coding exercise for you.
      The goal of this test is to see how you work in general. 
      This project just a react web interface without a service part. 
      We ask you to provide automation tests for "New Asset" page to check tools you are comfortable with and your skills to find out the best test cases.
      A huge plus will be to config simple GitHub workflow with tests.
      As a README file provide clear documentation and run instructions. 
    </p>

    <h3>
      Technical stack: 
    </h3>
    <p>
      Cypress.io
    </p>
    <p>
      Cucumber
    </p>

    <h3>
      Hints
    </h3>
    <p>
      Don't provide too much test cases, but concentrate on cases quality. 
      Make steps/methods reusable. 
      Feel free to add test-id for web elements to source project 
      Pay attention code organisation.
      Page contains a bug, try to catch it.
    </p>

    <h3>Handing in the Results</h3>
    <p>
      Provide the link to your GitHub repository with completed task. Please check your repository privacy before.
    </p>

  </article>
)

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={AppAbout} />
    {examples.map(ex => (
      <Route
        exact
        key={ex.path}
        path={ex.path}
        render={() => renderForm(ex.setting)}
      />
    ))}
  </Switch>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Segment className="AppHeader" inverted vertical>
            <Container>
              <h1>Case study for Frontend Automation engineer</h1>
              <AppMenu />
            </Container>
          </Segment>
          <Segment vertical>
            <div className="ui container">
              <AppRoutes />
            </div>
          </Segment>
          <Segment vertical inverted>
            <Container>
              <p>Elinvar Automation Team</p>
            </Container>
          </Segment>
        </div>
      </Router>
    )
  }
}

export default App
