import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import Image from "next/image";

export default function AboutUs() {
	return (
		<>
			<Header />
			<div id="aboutUs" className="content">
				<img id="paperAboutUs" src="/paper.png" alt="Picture of the author" />
			</div>
			<Footer />
		</>
	);
}
