import {useState} from 'react';



export const SearchBar = ({onSearch}) => {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        const value = event.target.value;
        setInput(value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(input);
        }
    }

    return (
        <div>
            <input type="text" 
            placeholder="Search games..." 
            value = {input}
            onChange = {handleChange}
            onKeyDown = {handleKeyDown}
            />
        </div>
    )
};
export default SearchBar;