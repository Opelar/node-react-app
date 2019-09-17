import React from "react";
import { Route } from "react-router-dom";
import Home from '../views/home';
import User from '../views/user';
import About from '../views/about';

export default function AppRouter() {
  return (
    <>
      <Route path="/" exact component={ Home } />
      <Route path="/about/" component={ About } />
      <Route path="/user/" component={ User } />
    </>
  );
}
