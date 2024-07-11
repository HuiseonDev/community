import { UserState } from '@recoil/user/atoms';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function New() {
  const navigate = useNavigate();
  const goToList = () => navigate(`/${type}`);
  const getUser = useRecoilValue(UserState);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const { type } = useParams();
  const POSTING_NEW_URL = `https://api.fesp.shop/posts?type=${type}`;
  console.log(text);
  console.log(title);

  const handlePosting = async e => {
    e.preventDefault();
    try {
      const response = await fetch(POSTING_NEW_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUser.token.accessToken}`,
        },
        body: JSON.stringify({
          type,
          title,
          content: text,
        }),
      });
      const data = await response.json();
      if (data.ok) {
        alert('게시글 등록 성공');
        goToList();
      } else {
        alert('게시글 등록 실패' + data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('게시글 등록 실패');
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handlePosting}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              onChange={e => setTitle(e.target.value)}
              // value={title}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              onChange={e => setText(e.target.value)}
              value={text}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handlePosting}
            >
              등록
            </button>
            <button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => history.back()}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;
