import React, { Component } from "react";
import { recipes } from "./tempList";
import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
export default class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://api.spoonacular.com/recipes/search?apiKey=2d570415f0894e6b9bad817e61e293fc&query=top&number=9",
    base_url:
      "https://api.spoonacular.com/recipes/search?apiKey=2d570415f0894e6b9bad817e61e293fc",
    details_id: 60749,
    pageIndex: 1,
    search: "",
    query: "&query=",
    error: ""
  };
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData.results);
      if (jsonData.results.length === 0) {
        this.setState(() => {
          return {
            error: "sorry, but your search did not return any results!"
          };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.results };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }
  displayPage = index => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
        );
      case 0:
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  handleChange = e => {
    this.setState(
      {
        search: e.target.value
      },
      () => {}
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: "" };
      },
      () => {
        this.getRecipes();
      }
    );
  };
  render() {
    // console.log(this.state.recipes);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}
