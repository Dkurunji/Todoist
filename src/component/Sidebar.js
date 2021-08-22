import React from 'react';
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';

export default function Sidebar({ selectedTab, setselectedTab }) {   
    return (
        <div className="sidebar"> 
            <div className={selectedTab==='INBOX'? 'active' : ''} onClick={ () => setselectedTab('INBOX')}>
                <FaInbox className="icon"/>
                Inbox
            </div>
            <div className={selectedTab==='TODAY'? 'active' : ''} onClick={ () => setselectedTab('TODAY')}>
                <FaRegCalendarAlt className="icon" />
                Today
            </div>
            <div className={selectedTab==='NEXT_7'? 'active' : ''} onClick={ () => setselectedTab('NEXT_7')}>
                <FaRegCalendar className="icon" />
                Next 7 days
            </div>
        </div>
    )
}
