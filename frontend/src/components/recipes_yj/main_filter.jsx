import React from 'react';
import MainFilterDropdown from './main_filter_dropdown';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import '../stylesheets/recipes_index/main_filter.scss';

export default class MainFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientToggle: false,
      query: "",
      ingredientQuery: "",
      tabs: 0,
      cuisines: ["American", "Chinese", "French", "German", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Thai"],
      allergies: ["Dairy", "Egg", "Gluten", "Peanut", "Seafood", "Shellfish", "Soy", "Sulfite", "Wheat"],
      cuisine: "",
      vegan: false,
      vegetarian: false,
      paleo: false,
      glutenFree: false,
      ketogenic: false,
      dairy: false,
      egg: false, 
      gluten: false, 
      peanut: false, 
      seafood: false, 
      shellfish: false, 
      soy: false, 
      sulfite: false, 
      wheat: false,
      maxCalories: 0,
      maxCarbs: 0,
      maxFat: 0,
      minProtein: 0,
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleCuisine = this.handleCuisine.bind(this);
    this.removeCuisine = this.removeCuisine.bind(this);
    this.toggleIngredients = this.toggleIngredients.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchFridge(this.props.userId)
  }
  handleInput(type) {
    return (e)=>{
      this.setState({ [type]: e.target.value });
    }
  }
  handleTab(num) {
    return (e) => {
      this.setState({tabs: num})
    }
  }
  handleCheck(type) {
    return (e) => {
      this.setState({ [type]: !this.state[type] })
    }
  }
  handleCuisine(type) {
    return (e) => {
      this.setState({ cuisine: type.cuisine })
    }
  }
  handleQuerySubmit() {
    let diet = [];
    if (this.state.vegan) diet.push("vegan");
    if (this.state.vegetarian) diet.push("vegetarian");
    if (this.state.paleo) diet.push("paleo");
    if (this.state.glutenFree) diet.push("gluten free");
    if (this.state.ketogenic ) diet.push("ketogenic");

    let intolerances = [];
    if (this.state.dairy) intolerances.push("dairy");
    if (this.state.egg) intolerances.push("egg"); 
    if (this.state.peanut) intolerances.push("peanut"); 
    if (this.state.seafood) intolerances.push("seafood"); 
    if (this.state.shellfish) intolerances.push("shellfish"); 
    if (this.state.soy) intolerances.push("soy"); 
    if (this.state.sulfite) intolerances.push("sulfite"); 
    if (this.state.wheat) intolerances.push("wheat");
    this.props.complexRecipeSearch({
      search: this.state.query, 
      cuisine: this.state.cuisine, 
      diet,  
      intolerances,
      maxCalories: this.state.maxCalories, 
      maxFat: this.state.maxFat, 
      maxCarbs: this.state.maxCarbs, 
      minProtein: this.state.minProtein
    })
  }
  handleIngredientSubmit() {
    if (this.props.fridge.ingredients) {
      let ingredientParams = Object.values(this.props.fridge.ingredients).map((item) => {
        return item.name
      });
    }
    this.props.getRecipesByIngredients()
  }
  handleSlider(type) {
    const maxc = 800;
    const maxn = 100;
    return (e) => { 
      if (type === "maxCalories") {
        if (parseInt(e.target.value) > maxc) e.target.value = maxc.toString()
      }
      else {
        if (parseInt(e.target.value) > maxn) e.target.value = maxn.toString()
      }
      this.setState({ [type]: e.target.value })
    }
  }
  toggleIngredients() {
    this.setState({ingredientToggle: !this.state.ingredientToggle});
  }
  removeCuisine(e) {
    e.stopPropagation();
    if (e.target.classList.value === "filter-bot-cuisine") {
      this.setState({cuisine: ""});
    }
  }
 
  renderTab() {
    if (this.state.tabs === 0) return null;
    else if (this.state.tabs === 1) {
      return (
        <div className="filter-bot-diet">
          <span className="filter-x" onClick={this.handleTab(0)}>&times;</span>
          <label className="filter-dd-item1" style={this.state.glutenFree ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.glutenFree} onChange={this.handleCheck("glutenFree")} />
            Gluten Free
          </label>
          <label className="filter-dd-item1" style={this.state.ketogenic ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.ketogenic} onChange={this.handleCheck("ketogenic")} />
            Ketogenic
          </label>
          <label className="filter-dd-item1" style={this.state.vegetarian? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.vegetarian} onChange={this.handleCheck("vegetarian")} />
            Vegetarian
          </label>
          <label className="filter-dd-item1" style={this.state.vegan ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.vegan} onChange={this.handleCheck("vegan")} />
            Vegan
          </label>
          <label className="filter-dd-item1" style={this.state.paleo ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.paleo} onChange={this.handleCheck("paleo")} />
            Paleo
          </label>
        </div>)
    } else if (this.state.tabs === 2) {
      return (
        <div className="filter-bot-cuisine" onClick={this.removeCuisine}>
          <span className="filter-x" onClick={this.handleTab(0)}>&times;</span>
          {this.state.cuisines.map((cuisine, idx) => {
            return (
            <div key={idx} 
              className="filter-dd-item2" 
              onClick={this.handleCuisine({cuisine})}
              style={ this.state.cuisine === cuisine ? {backgroundColor: "black" } : {}}>
              {cuisine}
            </div>)
          })}
        </div>);
    } else if (this.state.tabs === 3) {
      return( 
        <div className="filter-bot-allergies">
          <span className="filter-x" onClick={this.handleTab(0)}>&times;</span>
          <label className="filter-dd-item1" style={this.state.dairy ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.dairy} onChange={this.handleCheck("dairy")} />
            Dairy
          </label> 
          <label className="filter-dd-item1" style={this.state.egg ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.egg} onChange={this.handleCheck("egg")} />
            Egg
          </label>
          <label className="filter-dd-item1" style={this.state.peanut ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.peanut} onChange={this.handleCheck("peanut")} />
            Peanut
          </label>
          <label className="filter-dd-item1" style={this.state.seafood ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.seafood} onChange={this.handleCheck("seafood")} />
            Seafood
          </label>
          <label className="filter-dd-item1" style={this.state.shellfish ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.shellfish} onChange={this.handleCheck("shellfish")} />
            Shellfish
          </label>
          <label className="filter-dd-item1" style={this.state.soy ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.soy} onChange={this.handleCheck("soy")} />
            Soy
          </label>
          <label className="filter-dd-item1" style={this.state.sulfite ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.sulfite} onChange={this.handleCheck("sulfite")} />
            Sulfite
          </label>
          <label className="filter-dd-item1" style={this.state.wheat ? { backgroundColor: "black" } : {}}>
            <Toggle className="toggle" defaultChecked={this.state.wheat} onChange={this.handleCheck("wheat")} />
            Wheat
          </label>
        </div>)
    } else if (this.state.tabs === 4) {
      return (
        <div className="filter-bot-allergies">
          <span className="filter-x" onClick={this.handleTab(0)}>&times;</span>
          <div className="filter-slider">
            Max Calories (0-800)
            <input className="filter-nutr-slider" type="range" min="0" max="800" value={this.state.maxCalories} onInput={this.handleSlider("maxCalories")}/>
            <input type="number" min="0" max="800" maxength="3" value={this.state.maxCalories} onChange={this.handleSlider("maxCalories")} />
          </div>
          <div class="filter-slider">
            Max Fat (0-100)
            <input className="filter-nutr-slider" type="range" min="0" max="100" value={this.state.maxFat} onInput={this.handleSlider("maxFat")}/>
            <input type="number" min="0" max="100" maxLength="3" value={this.state.maxFat} onChange={this.handleSlider("maxFat")} />
          </div>
          <div class="filter-slider">
            Max Carbs (0-100)
            <input className="filter-nutr-slider" type="range" min="0" max="100" value={this.state.maxCarbs} onInput={this.handleSlider("maxCarbs")}/>
            <input type="number" min="0" max="100" maxLength="3" value={this.state.maxCarbs} onChange={this.handleSlider("maxCarbs")} />
          </div>
          <div class="filter-slider">
            Min Protein (0-100)
            <input className="filter-nutr-slider" type="range" min="0" max="100" value={this.state.minProtein} onInput={this.handleSlider("minProtein")}/>
            <input type="number" min="0" max="100" pattern="\d" maxLength="3" value={this.state.minProtein} onChange={this.handleSlider("minProtein")} />
          </div>
        </div>)
    }
  }     
  render() {
   
    return(
      <div >
        {this.state.ingredientToggle ? (
        <form className="filter-cont">
          <span className="filter-x" onClick={this.toggleIngredients}>&times;</span>
          <div className="filter-text-cont">
            <input type="text"
            className="filter-text-input"
            placeholder="Ingredients"
            onChange={this.handleInput("ingredientQuery")}
            value={this.state.ingredientQuery}/>
            <input type="submit" className="filter-query-search" value="" />
          </div>
        </form>
        ) : (
      <form className="filter-cont" onSubmit={this.handleQuerySubmit}>
        <div className="filter-top">
          <div className="filter-header">
            <h4 className="filter-h4">
              délicieux
          </h4>
            <div className="filter-text-cont">
              <input type="text"
                className="filter-text-input"
                placeholder="Find a recipe"
                onChange={this.handleInput("query")}
                value={this.state.query}/>
              <input type="submit" className="filter-query-search" value=""/>
            </div>
            <div className="filter-text-button" onClick={this.toggleIngredients}>
              Ingr
            </div>
          </div>
          <div className="filter-param-cont">
            <div onClick={this.handleTab(1)} style={this.state.tabs === 1 ? { backgroundColor: "pink" } : {}}>
              Diets
            </div>
            <div onClick={this.handleTab(2)} style={this.state.tabs === 2  ? { backgroundColor: "pink" } : {}}>
              Cuisines
            </div>
            <div onClick={this.handleTab(3)} style={this.state.tabs === 3  ? { backgroundColor: "pink" } : {}}>
              Allergies
            </div>
            <div onClick={this.handleTab(4)} style={this.state.tabs === 4 ? { backgroundColor: "pink" } : {}}>
              Nutrition
            </div>
          </div>
        </div>
        {this.renderTab()} 
      </form>
        )}
      </div>
    );
  }
}
