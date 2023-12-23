// ==> External Imports
import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, Typography } from "antd";
import "antd/dist/antd.css";

// ==> Internal Imports
import SideMenu from "./Components/SideMenu";
import routes from "./Routes/routes";
import "./App.css";
import AuthContext from "./context/AuthContext";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Layout>
        <SideMenu />
        <Layout style={{ height: "100vh" }}>
          <Header
            className="site-layout-sub-header-background"
            style={{ background: "#1890ff" }}
          >
            <Title
              style={{ color: "#fff", textAlign: "center", margin: "5px" }}
            >
              Welcome {user ? user.fName : "User"}
            </Title>
          </Header>
          <Content>
            <Switch>
              {routes.map((route, index) => {
                return (
                  <Route
                    exact={true}
                    path={route.path}
                    key={route.title}
                    component={route.component}
                  />
                );
              })}
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2021 Created by team: The Broken Coders
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
