import React from 'react'

import './featuredMovie.css'

export default ({item}) => {

    let firstData = new Date(item.first_air_date)

    let genres = []
    for(let i in item.genres) {
        genres.push(item.genres[i].name)
    }

    let description = item.overview
    if(description.length > 200) {
        description = description.substring(0 ,100) + '...'
    }

    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>

                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos </div>
                        <div className="featured--year">{firstData.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons}   {item.number_of_seasons !== 1 ? <spa>Temporadas</spa> : <span>temporada</span> }</div> 
                    </div>

                    <div className="featured-description">{description}</div>

                    <div className="featured--buttons">
                        <a className="featured--watchbutton" href={`/watch/${item.id}`}>► Assistir</a>
                        <a className="featured--mylistbutton" href={`/list/add/${item.id}`}>+ Minha Lista</a>
                    </div>

                    <div className="featured-genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    )
}