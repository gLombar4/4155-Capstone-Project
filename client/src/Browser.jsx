import { useState } from 'react'
import {useEffect} from 'react'
import "./Browser.css"
import fallbackCover from './assets/ncf.png'
// import Searchbar from './components/Searchbar.jsx'
// import env from "react-dotenv"

const PAGE_SIZE = 20;

function Browser() {
    const [games, setGames] = useState([]);
    const [covers, setCovers] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

  const fetchGames = (pageOffset) => {
    fetch("/api/games", {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; limit ${PAGE_SIZE}; offset ${pageOffset};`
    })
      .then((response) => response.json())
      .then((data) => {
        setGames((currentGames) => pageOffset === 0 ? data : [...currentGames, ...data]);
        setOffset(pageOffset + data.length);
        setHasMore(data.length === PAGE_SIZE);

        const gameIds = data.map((game) => game.id);
        if (gameIds.length === 0) return;

        return fetch("/api/covers", {
          method: "POST",
          headers: {
            "Accept": "application/json",
          },
          body: `fields game,url,height,width; where game = (${gameIds.join(",")});`,
        });
      })
      .then((response) => response?.json())
      .then((data) => {
        if (data) {
          setCovers((currentCovers) => pageOffset === 0 ? data : [...currentCovers, ...data]);
        }
      })
      .catch((error) => {
        console.error('Failed to load games:', error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchGames(0);
  }, []);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      fetchGames(offset);
    }
  };



    return (
        <div className="browser">
            <div className="browser-header">

                <h1>Game Browser</h1>
                <section id="search-bar"></section>
            </div>
            <section id="game-list">
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>{game.name}
                      <img
                        src={covers.find((cover) => cover.game === game.id)?.url?.replace(/^\/\//, "https://").replace(/t_thumb/, "t_cover_big") || fallbackCover}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = fallbackCover;
                        }}
                        alt={`${game.name} Cover`}
                        height = "250"
                        width = "200"
                      />
                      {/* Add a link to a seperate page, detailing the game & getting its details */}
                        <a href = {game.url}>
                          View Details
                        </a>
                      </li>
                    ))}
                </ul>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoading || !hasMore}
                >
                  {isLoading ? 'Loading...' : hasMore ? 'Load more' : 'No more games'}
                </button>
            </section>
        </div>
    )
}

export default Browser