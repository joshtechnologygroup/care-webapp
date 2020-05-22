import React from 'react';
import { Search } from '../../components/Inputs';
import './styles.scss';

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-container__search-container">
                <Search />
            </div>
        </div>
    )
}
