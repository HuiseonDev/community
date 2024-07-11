import Submit from '@components/Submit';

function Search({ setKeyword, handleSearch }) {
  // const SEARCH_URL = `https://api.fesp.shop/posts?type=${type}&keyword=${keyword}`;

  // const handleSearch = e => {
  //   e.preventDefault();
  //   console.log('dd');
  //   console.log(e);
  //   console.log(e.target.firstChild.value);
  //   // fetch(SEARCH_URL)
  //   //   .then(response => {
  //   //     if (!response.ok) {
  //   //       throw new Error(`HTTP error! status: ${response.status}`);
  //   //     }
  //   //     return response.json();
  //   //   })
  //   //   .then(data => {
  //   //     console.log(data);
  //   //     setKeyword(data.item);
  //   //     console.log(setKeyword);
  //   //   })
  //   //   .catch(error => console.error('Fetching error: ', error));
  // };

  return (
    <form onSubmit={e => handleSearch(e)}>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        autoComplete="off"
        // 검색창에 작성한 키워드를 넘겨받은 state setKeyword에 담아 이벤트를 사용하여 value에 저장
        onChange={e => setKeyword(e.target.value)}
        // value={keyword}
      />
      <Submit onCli>검색</Submit>
    </form>
  );
}

export default Search;
