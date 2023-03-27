import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { z } from 'zod';
import Profile from '~/user/components/Profile/Profile';
import { getUserBasicInfo } from '~/utils';

// Definisco lo schema dei parametri che mi aspetto di ricevere,
// questo è Zod, una libreria per la validazione dei dati che non ha nulla a che fare con Next.js
const paramsSchema = z.object({
  user: z.string(),
});

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [
      {
        params: {
          user: 'irsooti',
        },
      },
      {
        params: {
          user: 'ironkiller86',
        },
      },
    ],
    // paths: (await getAllUsersUid()).map((user) => ({
    //   params: {
    //     user,
    //   },
    // })),
    fallback: true, // Se non trova la pagina, genera una pagina vuota e la carica
    // fallback: "blocking", // Se non trova la pagina, aspetta che venga generata
    // fallback: false, // Se non trova la pagina, ritorna 404
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const params = paramsSchema.safeParse(context.params);

  if (!params.success) {
    return {
      notFound: true,
    };
  }

  const user = await getUserBasicInfo(params.data.user);

  return {
    revalidate: 60, // Dopo 60 secondi ricarica la pagina per aggiornare i dati ed invalidare la cache precedente
    /** // ? Come funziona il revalidate
     * 1. Richiedo la pagina, viene generata e salvata in cache per 60 secondi (se il revalidate è 60)
     * 2. Passano 60 secondi, la pagina viene richiesta. L'utente vede la pagina vecchia
     * 3. In background, Next.JS genera una nuova pagina e la salva in cache
     * 4. Se la pagina viene correttamente generata, alla prossima richiesta viene mostrata la nuova pagina, altrimenti viene mostrata la vecchia
     */
    props: {
      user,
    },
  };
}

const UserPage = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Caricamento...</div>;
  }

  if (!user) return <div>Utente non trovato</div>;

  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta name="description" content={`${user.bio}`} />
      </Head>
      <Profile
        avatar={user.avatar}
        bio={user.bio}
        followers={user.followers}
        following={user.following}
        location={user.location}
        timestampISO={user.timestamp}
        name={user.name || user.uid.toString()}
      />
    </>
  );
};

export default UserPage;
