import Container from "~/components/Container";
import Layout from "~/containers/Layout";
import TodayCard from "~/pages/Home/partials/TodayCard";

import Days from "./partials/Days";

function Home() {
  return (
    <Layout flex>
      <Container>
        <TodayCard />
      </Container>
      <Days />
    </Layout>
  );
}

export default Home;
