import React from 'react';
import logo from '../assets/images/icons8-todo-list-100.png'

export default function Header() {
    return (
        <div>
            <header className="header">                
                <nav>
                    <span style={{fontWeight:700, fontSize:18}}>Let's ToDo</span>
                    <div className="logo">
                        <img alt="logo" src={logo}/>
                    </div>
                </nav>
            </header>
        </div>
    )
}
