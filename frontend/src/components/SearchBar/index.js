
import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spot"
import "./Searchbar.css"

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [match, setMatch] = useState()
    const allSpot = useSelector((state) => {
        let allSpot = Object.values(state?.spot?.allSpot)
        // console.log("allSpot", allSpot)
        return allSpot;
    })

    useEffect(() => {
        dispatch(spotActions.getAllSpot())

        return () => {
            dispatch(spotActions.cleanUpSpot())
        }
    }, [dispatch])

    useEffect(() => {
        if (search.length > 0) {
            let matches = [];
            setSearchOpen(true);
            function handleSearch(search) {
                for (let i = 0; i < allSpot.length; i++) {
                    if (allSpot[i].name.toLowerCase().includes(search.toLowerCase()) || allSpot[i].city.toLowerCase().includes(search.toLowerCase()) || allSpot[i].state.toLowerCase().includes(search.toLowerCase()) || allSpot[i].country.toLowerCase().includes(search.toLowerCase())) {
                        matches.push([allSpot[i].name, allSpot[i].id]);
                        // console.log(matches)
                    }
                }
                setSearchResults(matches.sort());
            }
            handleSearch(search);
            document.addEventListener("click", () => {
                setSearchOpen(false)
            })
            setMatch(matches)
        } else {
            setSearchOpen(false);
        }
    }, [search]);

    function handleSearchInputShadow() {
        const searchInput = document.getElementById('type-search');
        const searchDiv = document.getElementsByClassName(
            'search-bar-type'
        );
        searchDiv[0].classList.add('search-bar-div-focus');
        searchInput.addEventListener('focusout', () => {
            searchDiv[0].classList.remove('search-bar-div-focus');
        });
    }

    return (
        <div className="search-bar-div">
            <div className='search-bar-div-top'>
                <input
                    id="type-search"
                    placeholder="condo, new york"
                    className='search-bar-input'
                    onClick={(e) => {
                        e.stopPropagation()
                        handleSearchInputShadow()
                        setSearchOpen(true)
                        // { console.log("Galio", search, match) }
                    }}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    autoComplete="off"
                />
            </div>
            {
                searchOpen &&
                searchResults.length > 0 &&
                searchResults.map((result) => (
                    <div
                        className="search-results"
                        key={result}
                        onClick={() => {
                            history.push(`/spots/${result[1]}`);
                            history.go(0);
                        }}
                    >
                        <span id="search-result-ticker">{result[0]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchBar
