import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
import { IMG_URL } from '../Constants'
import { Card } from "react-bootstrap";
import ShimmerEffect from '../Shimmer';

function FetchData() {
  const [mongoNews, setMongoNews] = useState("")
  const [data, setData] = useState("")


  const fetchData = async () => {
    await axios.get("https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=31c0bbca715841f18f18d08e77eb802d"
    ).then((res) => {
      setData(res?.data?.articles)

    }).catch((err) => console.log(err))
  }

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:3001/newsfetch/addednews")
      // console.log(response.data)
      setMongoNews(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
    fetchNews()
  }, [])

  return (
    <>
        <div className='posters'>
          {/* Use the map function to create small cards */}
          {mongoNews ? mongoNews.map((newsItem) => (
            <div key={newsItem._id} className="p-3">
              <Card className='p-3' style={{ boxShadow: "2px 2px 10px silver", borderRadius: "10px", width: "22rem", flex: '0 0 calc(33.33% - 20px)', }}>
                {/* If there is a picturePath, display the image */}
                Published On: {new Date(newsItem?.createdAt).toLocaleString()}
                <Card.Title>{newsItem.heading}</Card.Title>

                {newsItem.picturePath && (
                  <Card.Img variant="top" className='img-fluid' src={IMG_URL + newsItem.picturePath} />
                )}
                <Card.Body>
                  <Card.Text>{newsItem.content}</Card.Text>
                  <Card.Text>
                    {/* Display the userName if available */}
                    {newsItem.userName ? (
                      <span className='text-bold'>Published by: {newsItem.userName}</span>
                    ) : (
                      ""
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )) :  <ShimmerEffect/>}
        </div>


      
      <div className='conatiner m-5'>



        <h3><u>LATEST NEWS</u></h3>
        <div className="container d-flex justify-content-center align-items-center flex-column my-3">
          {data ? (
            data.map((items) => (
              <React.Fragment key={items?.publishedAt}>
                <div className='container my-3 p-3 ' style={{ boxShadow: "2px 2px 10px silver", borderRadius: "10px" }} >
                  <span>Published On: {new Date(items?.publishedAt).toLocaleString()}</span>
                  <h5>{items?.title}</h5>
                  <img src={items?.urlToImage} alt={items?.altText || "Image"} className='img-fluid' style={{ width: "auto", height: "300px", objectFit: "cover" }} />

                  <p>{items?.content}</p>
                  <a href={items?.url} target='blank' className='text-danger'>View More</a>
                  <span> Author : {items?.author}</span>
                </div>
              </React.Fragment>
            ))
          ) : (
           <ShimmerEffect/>
          )}
        </div>
      </div>
    </>
  )
}

export default FetchData