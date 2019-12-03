import React, { Component } from "react";

export default class Recipe extends Component {
  render() {
    // console.log(this.props.recipe);

    const {
      title,
      id,
      imageUrls,
      readyInMinutes,
      sourceUrl
    } = this.props.recipe;

    const { handleDetails } = this.props;
    return (
      <React.Fragment>
        <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
          <div className="card">
            <img
              src={"https://spoonacular.com/recipeImages/" + imageUrls[0]}
              className="img-card-top"
              style={{ height: "14rem", width: "18rem" }}
              alt="recipe"
            />
            <div className="card-body text-capitalize">
              <h6>{title}</h6>
              <h6 className="text-warning text-slanted">
                Ready in Minutes: {readyInMinutes}
              </h6>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary text-capitalize"
                onClick={() => handleDetails(0, id)}
              >
                details
              </button>
              <a
                href={sourceUrl}
                className="btn btn-success mx-2 text-capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                recipe url
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
