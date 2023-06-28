export async function getPopular(){
  const popular = await fetch(
    `https://www.reddit.com/r/popular.json?&limit=100&t=day`
  )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    // to get error
    .catch((err) => console.log(err))
  return {popular}
}

export async function handleHeaderSearch(searchTerm, searchLimit){
  const communities = await fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&type=sr&limit=${searchLimit}`
  )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err))

  const people = await fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&type=user&limit=${searchLimit}`
  )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err))

  return {communities, people};
}

export function searchFetch (searchTerm, searchLimit, sortBy) {
    // fetch api of reddit
    return (
      fetch(
        `http://www.reddit.com/search.json?q=${searchTerm}&sort=relevance&limit=${searchLimit}`
      )
        .then((res) => res.json())
        .then((data) => data.data.children.map((data) => data.data))
        // to get error
        .catch((err) => console.log(err))
    );
}