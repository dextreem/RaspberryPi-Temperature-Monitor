import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Layout, Menu} from 'antd';
import Icon from '@ant-design/icons'

import About from './about/About'
import Home from './home/Home'
import Statistics from './statistics/Statistics'

import './App.css';

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <>
      <Router>
        <Layout>
          <LayoutSider />
          <Layout>
            <Routings />
            <LayoutFooter />
          </Layout>
        </Layout>
      </Router>
    </>
  );
}

function LayoutFooter() {
  return <Footer style={{ textAlign: 'center' }}>RpiHeating ©2020 Created by <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">KDB</a></Footer>
}


function LayoutSider() {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <NavLink to="/">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/about">
            <Icon type="gold" />
            <span className="nav-text">About</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/statistics">
            <Icon type="gold" />
            <span className="nav-text">Statistics</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

function Routings() {
  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <Route path='/' exact component={Home} />
      <Route path='/about' component={About} />
      <Route path='/statistics' component={Statistics} />
    </Content>
  )
}

export default App;
