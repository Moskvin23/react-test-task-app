import React from "react";
import { Item } from "./Item";

import "./ClassApp.css";

export class ClassApp extends React.Component {
  // All requests I must to do in componentDidMount  or  DidUpdate
  // And now I create some State)
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
      minComments: 0,
    };
  }

  // Here I'll be do request - Fetch, because I've got only one request

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({
      isLoading: true,
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({
          items: data.children,
          isLoading: false,
        });
      });
  };

  handleClick = () => {
    if (this.state.enableAutoRefresh) {
      this.setState({ enableAutoRefresh: false });
      clearInterval(this.autoRefresh);
    } else {
      this.setState({ enableAutoRefresh: true });
      this.autoRefresh = setInterval(this.getItems, 3000);
    }
  };

  updateMinComments = (event) => {
    this.setState({
      minComments: Number(event.target.value),
    });
  };

  getItemsSortByCommenst = (items, minComments) =>
    items
      .sort((a, b) => b.data.num_comments - a.data.num_comments)
      .filter((item) => item.data.num_comments >= minComments);

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.state;
    const itemsSortByCommenst = this.getItemsSortByCommenst(items, minComments);
    return (
      <>
        <div className="container">
          <div className="upperContent">
          <h2>Top commented.</h2>
          <div>
            <div className="col">
            <p className="currentFilter">Current filter: {minComments}</p>
            <button
              type="button"
              className="btn"
              onClick={this.handleClick}
            >
              {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
            </button>
            </div>
          </div>
        
          <input
            type="range"
            value={minComments}
            onChange={this.updateMinComments}
            min={0}
            max={200}
          />
          </div>


          <div className="lowerContent"> 
          {isLoading ? (
            <p className="loading">. . . LOADING</p>
          ) : itemsSortByCommenst.length > 0 ? (
            itemsSortByCommenst.map((item) => (
              <Item key={item.data.id} data={item.data} />
            ))
          ) : (
            <p className="withoutResult">No results found matching your criteria</p>
          )}
          </div>
        </div>
      </>
    );
  }
}
