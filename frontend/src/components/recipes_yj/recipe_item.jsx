import React from 'react';

export default class RecipeItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // action for recipeFetch(recipeId passed down from props;)
    // const foodItem = axios.get("https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=7b45ae7dd73747a98a9ae6b4abd8a345")
  }
  render() {
    return(
      <div>

      </div>
    );
  }
}