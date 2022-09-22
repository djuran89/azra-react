import React from "react";
import Link from "next/link";

import styles from "./Slider.module.scss";
import { isMobile } from "react-device-detect";

const Slider = () => {
	const slideHeight = isMobile ? 400 : 700;
	console.log(isMobile, slideHeight);
	React.useEffect(() => {
		let vh = window.innerHeight * 0.01;
		console.log(vh);
	}, []);

	return (
		<>
			{/* <div className={styles.slideHolder} style={{ height: slideHeight }}> */}
			<div className={styles.slideHolder}>
				<img className={styles.sliderImg} src="./images/slider.png" alt="Slider" />
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
		</>
	);
};

export default Slider;
