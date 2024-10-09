import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const categories =[
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
]

const News = () => {
    const [articles, setArticles] = useState([]);
    const[totalArticles ,setTotalArticles] = useState(0)
    const [currentPage ,setCurrentPage] = useState(undefined);
    const[selectedCategory,setSelectedCategory] =useState("general")

    const loadNews = (pageNo =1) => {
        axios({
            //  url:"https://newsdata.io/api/1/latest",
            //  url:"https://saurav.tech/NewsAPI/top-headlines/category/business/us.json",
            url:"https://newsapi.org/v2/top-headlines",
            params: {
                // q: "Carona",
                // apiKey:"pub_556473db60afd1facddbbe63af39cffd476b4",
            apiKey:"2fe95fcde45746dcb281c234d6068bd0",

                country:"us",
                page :pageNo,
                category:selectedCategory
            }
        }).then((res) => {
            // console.log(res, "res")
            if (res.status === 200) {
                setArticles([...articles , ...res.data.articles])
                setTotalArticles(res.data.totalResults)
                setCurrentPage(pageNo)
            }
        }).catch((err) => {
            // console.log(err, "err")

        })
    }
    // useEffect(() => {
    //     loadNews()

    // })
    useEffect(()=>{
        loadNews()
    },[selectedCategory])


    return (
        <>
            <h1>News</h1>
            <div>
                {
                    categories.map((category)=>{
                        return(
                         <button className='btn btn-primary' style={{margin:10}} onClick={()=>{
                            setArticles([])
                            setSelectedCategory(category)
                         }}>{category}</button>   
                        )
                    })
                }
            </div>
            {/* <button className="btn btn-primary">Click</button> */}
                <InfiniteScroll
             style={{display:'flex',flexWrap:'wrap'}}
                dataLength={articles.length}
                next={()=>{
                    // console.log("Next Called")
                    loadNews(currentPage +1)

                }}
                hasMore={totalArticles !== articles}
                >
                {
                    articles.map((article, index) => {
                        return (
                                <div className="card" style={{width: 200 , margin:10}}>
                                    <img className="card-img-top" src={article.urlToImage} alt="image" style={{width:'100%' ,height:150}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{article.title}</h5>
                                            <p className="card-text">{article.description}</p>
                                        </div>
                                </div>


                        )
                    })
                }
                </InfiniteScroll>
        </>
    )
}
export default News;




/////

// import React, { useState, useEffect } from 'react';
// import NewsItem from './NewsItem';

// const NewsBoard = ({category}) => {
//     // const [articles, setArticles] = useState([]);
// const [state, setState] = useState([]);
// const [hasError, setHasError] = useState(false);
//     // useEffect(() => {
//     //     // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
//     //     fetch('https://jsonplaceholder.typicode.com/users')
//     //         .then(response => response.json())
//     //         .then(data => setArticles(data))
//     //         .catch(error => console.error(error));

//     // }, [])

// const fetchData = () =>{
//     // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
//     fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2fe95fcde45746dcb281c234d6068bd0`)
//     .then(response =>response.json())
//     .then(res => {


//         setState(res.articles)
//         console.log(res);
//     }
        
//         )
//     .catch(err => setHasError(true))

// }


// useEffect(()=>{
// fetchData();
// },[category])

//     // console.log(articles); 

//     return (
//         <>
// <h2 className="d-flex justify-content-center p-4">Latest <span className="badge text-bg-success">  news</span> </h2>
 
//            {state && state.map((news, index) => (
//               <NewsItem
//                     key={index}
//                     title={news.title}
//                     description={news.description}
//                     src={news.urlToImage}
//                     url={news.url}
//                 /> 
//              ))}   
//         </>
//     )
// };

// export default NewsBoard;