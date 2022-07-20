import Card from "~/components/Card";
import styles from "./GraphSwitcher.module.css";
import cx from "classnames";
import Container from "~/components/Container";
import Slider from "react-slick";

interface GraphSwitcherProps {
  className?: string;
}
function GraphSwitcher({ className }: GraphSwitcherProps) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={cx(styles.root, className)}>
      <Slider {...settings}>
        <Card color="day" className={styles.card}>
          <Container>
            <h3>Temperature</h3>
          </Container>
        </Card>
        <Card color="day" className={styles.card}>
          <Container>
            <h3>Dddd</h3>
          </Container>
        </Card>
        <Card color="day" className={styles.card}>
          <Container>
            <h3>SSS</h3>
          </Container>
        </Card>
      </Slider>
    </div>
  );
}

export default GraphSwitcher;
