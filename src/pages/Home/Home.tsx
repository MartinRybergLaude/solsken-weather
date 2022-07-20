import Card from "~/components/Card";
import Layout from "~/containers/Layout";
import TodayCard from "~/pages/Home/partials/TodayCard";
import Days from "./partials/Days";

function Home() {
  return (
    <Layout>
      <TodayCard />
      <Days />
    </Layout>
  );
}

export default Home;
