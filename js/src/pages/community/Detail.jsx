import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import { useRecoilValue } from 'recoil';
import { UserState } from '@recoil/user/atoms';

function Detail() {
  // const dd = useParams();
  const getUser = useRecoilValue(UserState);
  const { _id } = useParams();
  // console.log(_id);
  const DETAIL_URL = `https://api.fesp.shop/posts/${_id}`;

  const [detail, setDetail] = useState('');
  const fetchData = () => {
    fetch(DETAIL_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // console.log(data.item);
        setDetail(data.item);
      })
      .catch(error => console.error('Fetching error occurred', error));
  };

  const fetchDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      fetch(DETAIL_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUser.token.accessToken}`,
        },
      }).then(response => {
        if (response.ok) {
          location.href = '/info';
          setDetail('');
        }
      });
    }
  };

  useEffect(() => {
    fetchData();
    console.log(detail);
  }, []);
  console.log(detail);
  // console.log(detail.user?._id);
  // console.log(getUser._id);

  return (
    <>
      <main className="container mx-auto mt-4 px-4">
        <section className="mb-8 p-4">
          <div className="container">
            <div className="font-semibold text-xl">{detail?.title}</div>
            <div className="text-right text-gray-400">{detail.user?.name}</div>
            <div className="mb-4">
              <div>
                <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                  {detail.content}
                </pre>
              </div>
              <hr />
            </div>
          </div>

          <div className="flex justify-end my-4">
            <button
              type="button"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => history.back()}
            >
              목록
            </button>
            {detail.user?._id === getUser._id ? (
              <>
                <button
                  type="button"
                  className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                  onClick={() => (location.href = `/info/${_id}/edit`)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                  onClick={() => {
                    fetchDelete();
                  }}
                >
                  삭제
                </button>
              </>
            ) : null}
          </div>
        </section>

        {/* 댓글 목록 */}
        <CommentList />
      </main>
    </>
  );
}

export default Detail;
