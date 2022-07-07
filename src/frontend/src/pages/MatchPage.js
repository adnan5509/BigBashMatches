import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import MatchesYearSelector from '../components/MatchesYearSelector';

import "./MatchPage.scss"


export const MatchPage = () => {
    const [match, setMatch] = useState([]);

    const { teamName, year } = useParams();

    const [team, setTeam] = useState(teamName);
    const [date, setDate] = useState(year);

    const setDateCallback = (selectYear) => { //  a callback function which received year from child component on change
        setDate(selectYear);
    }

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`${process.env.REACT_APP_ROOT_API_URL}/bbl/team/${team}/matches?year=${date}`);
                const data = await response.json();
                setMatch(data);
            };
            fetchMatches();

        }, [team, date]
    );

    return (
        <div className="MatchPage">
            <h4>Select Year</h4>
            <div className="Matches-year-selector">
                <MatchesYearSelector teamName={teamName} setDateCallback={setDateCallback} dateYear={date} />
                <h2 className='team-matches-name'>{teamName} Matches in {date}</h2>
                {
                    match.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                }
            </div>
        </div>
    );
}

