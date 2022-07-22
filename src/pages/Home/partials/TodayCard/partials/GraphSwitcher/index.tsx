import Slider from "react-slick";
import cx from "classnames";

import Card from "~/components/Card";
import Container from "~/components/Container";

import styles from "./GraphSwitcher.module.css";

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
    arrows: false,
  };
  return (
    <div className={cx(styles.root, className)}>
      <Slider {...settings}>
        <Card className={styles.card}>
          <Container>
            <h3>Temperature</h3>
          </Container>
        </Card>
        <Card className={styles.card}>
          <Container>
            <h3>Dddd</h3>
          </Container>
        </Card>
        <Card className={styles.card}>
          <Container>
            <h3>SSS</h3>
          </Container>
        </Card>
      </Slider>
    </div>
  );
}

export default GraphSwitcher;
