/**
 * Temporary catch-all: keep visitors on the home page while
 * secondary routes are still being built for the client demo.
 */
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default function CatchAll() {
  return null;
}
