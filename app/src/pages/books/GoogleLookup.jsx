import React, { useState, useEffect, useRef } from "react";
import GoogleBookItem from "./GoogleBookItem";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared/components/Spinner";

export default function GoogleLookup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let url =
      process.env.REACT_APP_GOOGLEBOOKS +
      searchTerm +
      "&key=" +
      process.env.REACT_APP_API_KEY;
    if (searchTerm !== "" && searchTerm !== null) {
      searchBook(url)
        .then(res => setBookList(res))
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
        });
      setSearchTerm("");
    }
  }, [searchTerm]);

  function handleClick() {
    setSearchTerm(inputRef.current.value);
  }

  const searchBook = async url => {
    setLoading(true);
    const response = await fetch(url).then(res => res.json());
    return response.items;
  };
  return (
    <div>
      <div className="google-page-overview">
        <div className="google-page-search">
          <button onClick={() => navigate("/dashboard")}>Back</button>
          <div className="googe-page-title">
            <h2>Search Google Books</h2>
          </div>
          <div className="search">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Your Book Name"
            />
            <button onClick={handleClick}>Search</button>
          </div>
          <div>
            {loading ? (
              <Spinner />
            ) : (
              <div>
                {bookList !== null && bookList.length > 0 ? (
                  bookList.map((item, key) => (
                    <GoogleBookItem key={item.id} data={item} />
                  ))
                ) : (
                  <div>There is no return</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
