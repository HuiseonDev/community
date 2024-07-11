import Button from '@components/Button';
import { UserState } from '@recoil/user/atoms';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function CommentNew() {
  const getUser = useRecoilValue(UserState);
  const [content, setContent] = useState('');
  const { _id } = useParams(); // post id
  const COMMENT_NEW_URL = `https://api.fesp.shop/posts/${_id}/replies`;

  const handleComment = async e => {
    e.preventDefault();
    try {
      const response = await fetch(COMMENT_NEW_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUser.token.accessToken}`,
        },
        body: JSON.stringify({
          content,
        }),
      });
      const data = await response.json();
      setContent('');
      // refetch(); // commentList에서 fetchData() 호출
      if (data.ok) {
        alert('댓글 등록 성공');
        location.href = `/info/${_id}`;
      } else {
        alert('댓글 등록 실패' + data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('댓글 등록 실패');
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleComment}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            onChange={e => setContent(e.target.value)}
            value={content}
          ></textarea>

          {/* 에러 메세지 출력 */}
          {/*
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p>
          */}
        </div>
        <Button size="sm">댓글 등록</Button>
      </form>
    </div>
  );
}

export default CommentNew;
