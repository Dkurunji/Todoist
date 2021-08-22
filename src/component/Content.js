import React,{useState} from 'react';
import Sidebar from './Sidebar';
import Tasks from './Tasks';

export default function Content() {
    const [selectedTab, setselectedTab] = useState('INBOX');

    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab}/>
            <Tasks selectedTab={selectedTab}/>
        </section>
    )
}
