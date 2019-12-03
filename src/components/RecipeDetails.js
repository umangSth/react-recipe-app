import React, { Component } from "react";
import { recipe } from "../tempDetails";

export default class RecipeDetails extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipe: recipe,
  //     url: `https://api.spoonacular.com/recipes/${this.props.id}/information?includeNutrition=false&apiKey=2d570415f0894e6b9bad817e61e293fc`
  //   };
  // }

  // async componentDidMount() {
  //   try {
  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     this.setState({
  //       recipe: jsonData
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  state = {
    recipe: recipe
  };
  async componentDidMount() {
    const id = this.props.id;
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=2d570415f0894e6b9bad817e61e293fc`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      this.setState(
        (state, props) => {
          return { recipe: jsonData };
        },
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      image,
      spoonacularSourceUrl,
      sourceUrl,
      title,
      sourceName,
      extendedIngredients
    } = this.state.recipe;
    const { handleIndex } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(1)}
              >
                back to recipe list
              </button>
              <img src={image} className="d-block w-100" alt="" />
            </div>
            {/* details */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                provided by {sourceName}
              </h6>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2 text-capitalize"
              >
                publisher webpage
              </a>
              <a
                href={spoonacularSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 mx-3 text-capitalize"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mt-4">Ingredients</h2>
                {extendedIngredients.map((item, index) => {
                  return (
                    <li key={item.id} className="list-group-item text-slanted">
                      {item.original}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
