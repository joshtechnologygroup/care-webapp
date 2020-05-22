import React from 'react';
import { Search } from '../../components/Inputs';
import './Header.scss';

export default function Header({ searchPlaceholder }) {
    return (
        <div className="header-container">
            <div className="header-container__search-container">
                <Search searchPlaceholder={searchPlaceholder} />
            </div>
        </div>
    )
}
