import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { z } from 'zod';
import Profile from '~/user/components/Profile/Profile';
import { getUserBasicInfo } from '~/utils';

// Definisco lo schema dei parametri che mi aspetto di ricevere,
// questo è Zod, una libreria per la validazione dei dati che non ha nulla a che fare con Next.js
const paramsSchema = z.object({
  user: z.string(),
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = paramsSchema.safeParse(context.params);

  if (!params.success) {
    return {
      notFound: true,
    };
  }

  const user = await getUserBasicInfo(params.data.user);

  // Questo header serve per dire di invalidare la cache dopo 60 secondi
  context.res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

  return {
    props: {
      user,
    },
  };
}

const UserPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!user) return <div>Utente non trovato</div>;

  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta name="description" content={`${user.bio}`} />
      </Head>
      <Profile
        timestampISO={user.timestamp}
        avatar={user.avatar}
        bio={user.bio}
        followers={user.followers}
        following={user.following}
        location={user.location}
        name={user.name || user.uid.toString()}
      />
    </>
  );
};

export default UserPage;
