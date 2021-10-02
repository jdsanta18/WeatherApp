import React from 'react';

const apiKey = ''; //Replace this with apikey 

class App extends React.Component{
    constructor(props){
        super(props);

        this.handleCityNameSubmit = this.handleCityNameSubmit.bind(this);
        this.state = {weatherForecast: null};
    }

    handleCityNameSubmit(weatherForecast){
        this.setState({weatherForecast});    
    }

    render(){
        

        return(
            <div>
                <CityForm  onCityNameSubmit={this.handleCityNameSubmit}/>
                <ForecastsContainer weatherJSON = {this.state.weatherForecast}/>
            </div>
        );
    }
}


class CityForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {input: '', weather : []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({input : event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const apiUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.input + '&appid=' + apiKey;
        fetch(apiUrl, {headers: {'Content-Type' : 'application/json'}})
        .then(response => response.json())
        .then(jsonData => this.props.onCityNameSubmit(jsonData))
        .catch(error => console.log(error));   
        

    }

    render() {
        return(
            <form className="city-form" onChange={this.handleChange}>
                <label>
                    City:
                    <input type="text" name="cityInput" />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
        );
    }
}

class ForecastsContainer extends React.Component{
    
    

    render(){

        if(this.props.weatherJSON !=null){
            return(
                <div className="forecasts-container">
                    <div className="todayweather-container">
                        <h1>{this.props.weatherJSON.city.name}, {this.props.weatherJSON.city.country}</h1>
                        <h2>{this.props.weatherJSON.list[0].weather[0].description.replace(/^\w/, c => c.toUpperCase())}</h2>
                        <h2>{Math.round(this.props.weatherJSON.list[0].main.temp - 273.15)}&#8451;</h2> 
                    </div>
                </div>
            )
        }else{
            return (null);
        }
    }
}

export default App;