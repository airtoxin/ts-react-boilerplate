import React from "react";
import { Link } from "react-router-dom";

export interface Props {}

export class AppPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>app</h1>
        <Link to="/counter">counter page</Link>
      </div>
    );
  }
}
