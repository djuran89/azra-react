import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";

export default function AboutUs(props) {
	props.getPorducts();
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
