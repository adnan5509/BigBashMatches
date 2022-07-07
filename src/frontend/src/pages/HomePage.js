import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';


import "./HomePage.scss"

export const HomePage = () => {

    const [teams, setTeams] = useState([]);
    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_ROOT_API_URL}/bbl/team`);
                const data = await response.json();
                setTeams(data);
            };
            fetchAllTeams();

        }, []
    );

    return (
        <div className="HomePage">
            <div className='header-section'>
                <h1 className='app-name-section'>
                    Big Bash League Dashboard
                </h1>
            </div>
            <div className='team-grid'>
                {
                    teams.map(team => <TeamTile key={team.teamName} teamName={team.teamName} />)
                }
            </div>
        </div>
    );
}

