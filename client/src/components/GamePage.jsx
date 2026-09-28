import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import fallbackCover from '../assets/ncf.png'
import BasicRating from './Rating';

export const GamePage = () => {
    const {game_id} = useParams();
    const [game, setGame] = useState(null);
    const [cover, setCover] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            const [gameResponse, coverResponse] = await Promise.all([
                fetch("/api/games", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: `fields *; where id = ${game_id};`,
                }),
                fetch("/api/covers", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: `fields game,url,height,width; where game = ${game_id};`,
                }),
            ]);

            const [gameData, coverData] = await Promise.all([
                gameResponse.json(),
                coverResponse.json(),
            ]);
            console.log(gameData)

            setGame(gameData[0]);
            setCover(coverData[0]);
        };

        fetchGameDetails();
    }, [game_id]);

    if (!game) {
        return <p>Loading game...</p>;
    }

    return(
        <main>
        <Link to="/Browser">Back to games </Link>
        <h1>{game.name}</h1>
        <img
            src={cover?.url?.replace(/^\/\//, "https://").replace(/t_thumb/, "t_cover_big") || fallbackCover}
            onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackCover;
            }}
            alt={`${game.name} Cover`}
            height="250"
            width="200"
        />
        <h2>{game.summary || "No summary available."}</h2>
        <BasicRating></BasicRating>
        </main>
    )

}