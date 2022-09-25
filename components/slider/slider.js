import React from "react";
import Link from "next/link";

import styles from "./Slider.module.scss";

const Slider = () => {
	return (
		<div className={styles.slideHolder}>
			<img className={styles.sliderImg} src="./slider.jpg" alt="Slider" />
			<div className={styles.text}>
				<div className={styles.slideText}>Brzo na vašem stolu</div>
				<div>
					<Link href="/proizvod">
						<button className={styles.btnOrder}>
							Poruči odmah <span className="material-symbols-outlined">chevron_right</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Slider;
