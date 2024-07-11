import Search from '@components/Search';
import useFetch from '@hooks/useFetch';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function List() {
  const Navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { type } = useParams();
  const { data, refetch } = useFetch(`posts?type=${type}&keyword=${keyword}`);
  // console.log(data);
  // console.log(data?.item);
  /* 리스트 항목들을 변수에 담아주는 부분 */
  const list = data?.item;
  console.log(data?.item);

  /* 검색하는 부분. Search Component에 넘겨야 하는 부분 */
  const handleSearch = e => {
    // 클릭하자마자 바로 새로고침 되기 때문에 검색이 안된다. 따라서 이벤트 초기화 필요
    e.preventDefault();
    // refetch 실행해서 검색하면 검색창 reload
    refetch();
  };
  console.log(keyword);
  // 사용자가 인풋에 값 입력
  // 입력한 값이 state로 관려됨 => state로 가져다가 쓸 수 있음
  // -> useState ('') 이 안에 검색어 keyword가 들어가야함
  // 검색 버튼 클릭
  // state로 관리되는 키워드가 url에 반영
  // 키워드가 반영된 url로 api 요청 (refetch)

  return (
    <>
      <main className="min-w-80 p-10">
        <div className="text-center py-4">
          <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
            정보 공유
          </h2>
        </div>
        <div className="flex justify-end mr-4">
          {/* 검색 */}
          {/* 검색했을 때 handleSearch가 실행되어야 하기 때문에 Search component에 전달! */}
          <Search setKeyword={setKeyword} handleSearch={handleSearch} />

          <button
            type="button"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            onClick={() => (location.href = '/info/new')}
          >
            글작성
          </button>
        </div>
        <section className="pt-10">
          <table className="border-collapse w-full table-fixed">
            <colgroup>
              <col className="w-[10%] sm:w-[10%]" />
              <col className="w-[60%] sm:w-[30%]" />
              <col className="w-[30%] sm:w-[15%]" />
              <col className="w-0 sm:w-[10%]" />
              <col className="w-0 sm:w-[10%]" />
              <col className="w-0 sm:w-[25%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-solid border-gray-600">
                <th className="p-2 whitespace-nowrap font-semibold">번호</th>
                <th className="p-2 whitespace-nowrap font-semibold">제목</th>
                <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                  조회수
                </th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                  댓글수
                </th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                  작성일
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 로딩 상태 표시 */}
              {/*
              <tr>
                <td colSpan="6" className="py-20 text-center">로딩중...</td>
              </tr>
            */}

              {/* 에러 메세지 출력 */}
              {/*
              <tr>
                <td colSpan="6" className="py-20 text-center">에러 메세지</td>
              </tr>
            */}

              {/* 본문 출력 */}
              {list?.map(item => {
                return (
                  <>
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                    >
                      <td className="p-2 text-center">{item._id}</td>
                      <td
                        className="p-2 truncate indent-4 cursor-pointer"
                        onClick={() => Navigate(`/info/${item._id}`)}
                      >
                        {item.title}
                      </td>
                      <td className="p-2 text-center truncate">
                        {item.user.name}
                      </td>
                      <td className="p-2 text-center hidden sm:table-cell">
                        29
                      </td>
                      <td className="p-2 text-center hidden sm:table-cell">
                        2
                      </td>
                      <td className="p-2 truncate text-center hidden sm:table-cell">
                        2024.07.05 13:39:23
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <hr />

          {/* 페이지네이션 */}
          <div>
            <ul className="flex justify-center gap-3 m-4">
              <li className="text-bold text-blue-700">
                <a href="/info?page=1">1</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default List;
