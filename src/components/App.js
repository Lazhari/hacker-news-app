import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import Login from "./Login";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Notifications from "react-notify-toast";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Notifications />
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
