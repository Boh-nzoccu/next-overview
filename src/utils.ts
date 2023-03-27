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
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return null;
  }
};

export const getAllUsersUid = () => {
  return ['irsooti', 'ironkiller86'] as const;
};