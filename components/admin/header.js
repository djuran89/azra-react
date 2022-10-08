import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
	const router = useRouter();
	const pathname = router.pathname.replace("/", "");
	
	const onPrint = () => window.print();
	const onLogout = () => {
		axios
			.post(`/api/user/logout`)
			.then(() => Router.push("/admin/login"))
			.catch((err) => enqueueSnackbar(err.message, { variant: "error" }));
	};
	return (
		<header className="admin-header">
			<div className="admin-left">
				{pathname === "admin" ? (
					<button className="btn btn-print" onClick={onPrint}>
						Print
					</button>
				) : (
					<Link href="/admin">
						<a>
							<button className="btn btn-print">Home</button>
						</a>
					</Link>
				)}
				<Link href="/admin/proizvodi">
					<a>
						<button className="btn btn-print">Proizvodi</button>
					</a>
				</Link>
			</div>
			<div className="admin-right">
				<button className="btn  btn-logout" onClick={onLogout}>
					Logout
				</button>
			</div>
		</header>
	);
}
