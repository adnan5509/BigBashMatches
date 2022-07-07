import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart';


import "./TeamPage.scss"

export const TeamPage = () => {

    const [team, setTeam] = useState({ teamMatches: [] });
    const { teamName } = useParams();
    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`http://localhost:8081/bbl/team/${teamName}`);
                const data = await response.json();
                console.log(data);
                setTeam(data);
            };
            fetchTeams();

        }, [teamName]
    );
    if (!team.teamName || !team) {
        return <h1>Team Not Found</h1>
    }
    return (
        <div className="TeamPage">
            <div className='team-name-section'>
                <h1 className='team-name'>
                    {team.teamName}
                </h1>
            </div>
            <div className='win-loss-section'>
                Wins/losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                        { title: 'Wins', value: team.totalWins, color: '#4da375' },
                    ]}
                />
            </div>
            <div className='match-detail-section'>
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.teamMatches[0]} />
            </div>
            {
                team.teamMatches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} match={match} />)
            }
            <div className='more-link'>
                <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More {'>'}</Link>
            </div>
        </div>
    );
}

