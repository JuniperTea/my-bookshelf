import React, { useEffect, useState } from "react";
import LocalBookItem from "./LocalBookItem.jsx";
import { commonGetJson } from "../../shared/utils/api-helper.js";
import Spinner from "../../shared/components/Spinner";

export default function LocalBookList() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  //get book data from the library for current user
  function getData() {
    setLoading(true);
    commonGetJson("/books")
      .then(x => {
        setBookList(x);
      })
      .catch(e => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {bookList && bookList.length > 0 ? (
            <div style={{ overflow: "auto" }}>
              {bookList.map(x => (
                <div key={x.id}>
                  <LocalBookItem data={x} />
                </div>
              ))}
            </div>
          ) : (
            <span>Go Google a Book!</span>
          )}
        </div>
      )}
    </div>
  );
}
