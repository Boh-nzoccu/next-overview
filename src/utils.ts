import { github } from './consts';

export const getUserBasicInfo = async (username: string) => {
  try {
    const { data } = await github.request('GET /users/{username}', {
      username,
    });

    return {
      uid: data.id,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
      followers: data.followers,
      following: data.following,
    };
  } catch (err) {
    return null;
  }
};

export const getAllUsersUid = async () => {
  return ['irsooti', 'user'];
};
