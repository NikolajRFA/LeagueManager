import SearchIcon from '@mui/icons-material/Search';
import {styled} from "@mui/material/styles";
import {alpha, InputBase, Stack} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import React from "react";
import SearchResults from "./SearchResults";

// TODO: Make Paper dropdown with search results
export default function SearchField({drawerWidth, drawerIsOpen}) {
    //const searchPhrase = useRef("");
    //const showSearchResults = useRef(false);
    const searchRef = useRef(null);

    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    let searchPhrase: string = null;
    let setSearchPhrase: React.Dispatch<React.SetStateAction<string>> = null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(e.currentTarget.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchPhrase) alert(searchPhrase + '!');
    };

    const onSearchResultMount = (dataFromSearchResult: [string, React.Dispatch<React.SetStateAction<string>>]) => {
        searchPhrase = dataFromSearchResult[0];
        setSearchPhrase = dataFromSearchResult[1];
    };

    return (
        <>
            <Search ref={searchRef}>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </Search>
            <SearchResults onMount={onSearchResultMount}
                           searchRef={searchRef}
                           drawerWidth={drawerWidth}
                           drawerIsOpen={drawerIsOpen}
            />
        </>
    )
}