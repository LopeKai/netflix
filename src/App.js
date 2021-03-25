import React, { useEffect, useState } from 'react'

import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header/index'

import './App.css'

export default  () => {

  const[moveList,setMovieList] = useState([])
  const[featuredDate, setFeaturedData] = useState(null)
  const[blackHeader, setBlackHeader] = useState(false)

  useEffect( () => {

    const loadAll = async () =>{
      // pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //pegando a Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeaturedData(chosenInfo)
    }
    loadAll()
  },[])

  useEffect( () => {
    const scrollListener = () => {
      if(window.scrollY > 20) {
        setBlackHeader(true)
      }else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll',scrollListener)
    }
  },[])

  return(
    <div className="page">

        <Header black={blackHeader} />

        {featuredDate && 
          <FeaturedMovie item={featuredDate} />
        }

        <section className="lists">
          {moveList.map((item, key) => ( 
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        
        <footer>
          <p>Developer Kaique Araújo Lopes.</p>
        </footer>

        {/* LOADING */}
        {moveList.length <= 0 && 
          <div className="loading"> 
              <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading" />
          </div>
        }

    </div>

  )
}