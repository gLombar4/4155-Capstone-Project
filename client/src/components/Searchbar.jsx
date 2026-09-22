import React from "react";

export default class searchbar extends React.Component {
    state={
        searchTerm: ""
    }  
    doingASearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitSearch = (event) =>{
        event.preventDefault();
        this.props.filterBySearchTerm(this.state.searchTerm);
        this.setState({
            searchTerm: ""
        })
    }
    render(){
        return(
            <form onSubmit = {this.submitSearch}>
                <label htmlFor="searchTerm">
                    <input type="text" name="searchTerm"
                    value={this.state.searchTerm}
                    onChange={this.doingAsearch}/>
                    <input type="submit" value="submit"/>
                </label>
            </form>
        )
    }
}

// const [searchTerm, setSearchTerm] = useState("");
  
//   const searchGames = (searchTerm) => {
//     fetch("/api/games", {
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//       },
//       body: `${searchTerm}; limit ${PAGE_SIZE}; offset 0;`
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setGames(data);
//         setOffset(data.length);
//         setHasMore(data.length === PAGE_SIZE);
//       })
//       .catch((error) => {
//         console.error('Failed to search games:', error);
//       });
//   };