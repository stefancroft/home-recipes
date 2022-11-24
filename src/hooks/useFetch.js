import { useState, useEffect } from "react"

// Used for fetching the recipe data from in the db database file
// the json file is being wrapped by an api endpoint from which we can fetch 
// the data from

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    // Invoke the function
    if (method === "GET") {
      fetchData()
    }

    // See if method is equal to post, if thats the case we need to make
    // sure we have a value for options
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error, postData }
}