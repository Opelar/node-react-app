import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from '../components/nav';
import AppRouter from '../route';

export default function AppLayout() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
