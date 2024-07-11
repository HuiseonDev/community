import Button from '@components/Button';
import CommentNew from '@pages/community/CommentNew';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function CommentList() {
  const { _id } = useParams();
  const REPLIES_URL = `https://api.fesp.shop/posts/${_id}/replies`;

  const [replies, setReplies] = useState([]);

  const fetchData = () => {
    fetch(REPLIES_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error 200번대: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // console.log(data.item);
        setReplies(data.item);
      })
      .catch(error => console.error('Fetching error occurred', error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(replies);

  return (
    <>
      <section className="mb-8">
        <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>

        {/* 댓글 */}
        <div className="replies">
          {replies?.map(item => {
            return (
              <div key={item._id}>
                <div className="shadow-md rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <img
                      className="w-8 mr-2 rounded-full"
                      src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
                      alt="무지 프로필 이미지"
                    />
                    <Link to="" className="text-orange-400">
                      {item.user.name}
                    </Link>
                    <time
                      className="ml-auto text-gray-500"
                      dateTime="2024.07.07 12:34:56"
                    >
                      {item.createdAt}
                    </time>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <pre className="whitespace-pre-wrap text-sm">
                      {item.content}
                    </pre>
                    <Button bgColor="red" size="sm">
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 댓글 */}

        {/* 댓글 입력 */}
        <CommentNew />
      </section>
    </>
  );
}

export default CommentList;
