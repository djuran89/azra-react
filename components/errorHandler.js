import { useSnackbar } from "notistack";

export default function ErrorHandler(props) {
	const { msg } = props;
	const { enqueueSnackbar } = useSnackbar();

	enqueueSnackbar(msg, { variant: "error" });
}
