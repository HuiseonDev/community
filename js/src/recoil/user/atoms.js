import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// export interface IContentTypes {
//     name: string;
//     status: boolean;
//     message: string;
// }

const { persistAtom } = recoilPersist({
  key: 'local_user',
  storage: localStorage,
});

//recoil state 생성
export const UserState = atom({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
